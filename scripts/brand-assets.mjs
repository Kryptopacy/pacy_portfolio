// Brand asset pipeline — run with: node scripts/brand-assets.mjs
// Source files live in /brand-source (not served). Outputs go to /public/brand, /public/icons and /src/app.
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const SRC_LOGO = path.join(root, "brand-source", "pacylabs_logo.png");
const SRC_OG = path.join(root, "brand-source", "pacylabs_og_image.jpg");
const BURGUNDY = "#3f0e21"; // Authentic background sampled from the original logo

await fs.mkdir(path.join(root, "public", "brand"), { recursive: true });
await fs.mkdir(path.join(root, "public", "icons"), { recursive: true });

// ---------------------------------------------------------------------------
// 1. Transparent logo — colour-difference key against the burgundy field.
//    alpha is derived from how far the red channel rises above the background
//    (gold/bronze are red-dominant, the field is dark), then colour is
//    un-premultiplied so anti-aliased edges don't keep a burgundy fringe.
// ---------------------------------------------------------------------------
const { data, info } = await sharp(SRC_LOGO).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// sample background from the four corners (40x40 patches)
const samples = [];
for (const [cx, cy] of [[0, 0], [width - 40, 0], [0, height - 40], [width - 40, height - 40]]) {
  for (let y = cy; y < cy + 40; y++) for (let x = cx; x < cx + 40; x++) {
    const i = (y * width + x) * channels;
    samples.push([data[i], data[i + 1], data[i + 2]]);
  }
}
const bg = [0, 1, 2].map((c) => samples.reduce((s, p) => s + p[c], 0) / samples.length);
const LOW = bg[0] + 14; // noise floor above field
const HIGH = 150; // bronze is fully opaque by here

const out = Buffer.alloc(width * height * 4);
for (let p = 0; p < width * height; p++) {
  const i = p * channels;
  const r = data[i], g = data[i + 1], b = data[i + 2];
  let a = (r - LOW) / (HIGH - LOW);
  a = Math.max(0, Math.min(1, a));
  const o = p * 4;
  if (a <= 0.004) { out[o + 3] = 0; continue; }
  const un = (v, bv) => Math.max(0, Math.min(255, (v - (1 - a) * bv) / a));
  out[o] = un(r, bg[0]);
  out[o + 1] = un(g, bg[1]);
  out[o + 2] = un(b, bg[2]);
  out[o + 3] = Math.round(a * 255);
}

const keyed = sharp(out, { raw: { width, height, channels: 4 } });
const trimmed = await keyed.png().toBuffer().then((b) => sharp(b).trim({ threshold: 1 }).toBuffer());
const pad = (buf, size, padPct) =>
  sharp(buf)
    .resize(Math.round(size * (1 - padPct * 2)), Math.round(size * (1 - padPct * 2)), { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.round(size * padPct), bottom: Math.round(size * padPct),
      left: Math.round(size * padPct), right: Math.round(size * padPct),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });

// Primary transparent brand assets
await (await pad(trimmed, 1024, 0.02)).png({ compressionLevel: 9, palette: false }).toFile(path.join(root, "public", "brand", "pacylabs-logo.png"));
await (await pad(trimmed, 1024, 0.02)).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(root, "public", "brand", "pacylabs-logo.webp"));
await (await pad(trimmed, 256, 0.02)).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(root, "public", "brand", "pacylabs-logo-256.webp"));

// ---------------------------------------------------------------------------
// 2. Real Logo Favicon & Icon Generation
//    Directly using the user's authentic Pacy Labs circuit spade & typography!
// ---------------------------------------------------------------------------
const renderRealFavicon = async (size) => {
  const rx = Math.max(3, Math.round(size * 0.19));
  const innerSize = Math.max(12, Math.round(size * 0.90));
  const bgSvg = `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${rx}" fill="${BURGUNDY}"/></svg>`;
  const bgBuf = await sharp(Buffer.from(bgSvg)).png().toBuffer();
  
  const logoInner = await sharp(trimmed)
    .resize(innerSize, innerSize, { fit: "contain" })
    .sharpen({ sigma: size <= 32 ? 0.9 : 0.6, m1: 1.5 })
    .png()
    .toBuffer();

  return sharp(bgBuf)
    .composite([{ input: logoInner, gravity: "centre" }])
    .png()
    .toBuffer();
};

// Generate multi-resolution ICO file (16, 32, 48)
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map((s) => renderRealFavicon(s)));
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0); 
header.writeUInt16LE(1, 2); 
header.writeUInt16LE(pngs.length, 4);

let offset = header.length;
pngs.forEach((png, idx) => {
  const e = 6 + idx * 16, s = icoSizes[idx];
  header.writeUInt8(s, e); 
  header.writeUInt8(s, e + 1); 
  header.writeUInt8(0, e + 2); 
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4); 
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(png.length, e + 8); 
  header.writeUInt32LE(offset, e + 12);
  offset += png.length;
});

const icoBuffer = Buffer.concat([header, ...pngs]);
await fs.writeFile(path.join(root, "src", "app", "favicon.ico"), icoBuffer);
await fs.writeFile(path.join(root, "public", "favicon.ico"), icoBuffer);

// Generate canonical Next.js icon.png (96x96 and 32x32)
const icon96 = await renderRealFavicon(96);
const icon32 = await renderRealFavicon(32);
await fs.writeFile(path.join(root, "src", "app", "icon.png"), icon96);
await fs.writeFile(path.join(root, "public", "icon.png"), icon96);
await fs.writeFile(path.join(root, "public", "favicon-32x32.png"), icon32);

// Generate crisp SVG favicon embedding high-resolution real logo
const logo512Buf = await (await pad(trimmed, 440, 0.01)).png().toBuffer();
const logoBase64 = logo512Buf.toString("base64");
const realSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="${BURGUNDY}"/>
  <image href="data:image/png;base64,${logoBase64}" width="440" height="440" x="36" y="36"/>
</svg>
`;
await fs.writeFile(path.join(root, "src", "app", "icon.svg"), realSvg);

const realSvgTransparent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <image href="data:image/png;base64,${logoBase64}" width="512" height="512" x="0" y="0"/>
</svg>
`;
await fs.writeFile(path.join(root, "public", "brand", "pacylabs-mark.svg"), realSvgTransparent);

// ---------------------------------------------------------------------------
// 3. App icons — Apple touch icon & PWA icons with the real logo
// ---------------------------------------------------------------------------
const onBurgundy = async (size, padPct) =>
  sharp({ create: { width: size, height: size, channels: 4, background: BURGUNDY } })
    .composite([{ input: await (await pad(trimmed, size, padPct)).png().toBuffer() }])
    .png({ compressionLevel: 9 });

await (await onBurgundy(180, 0.08)).toFile(path.join(root, "src", "app", "apple-icon.png"));
await (await onBurgundy(180, 0.08)).toFile(path.join(root, "public", "apple-touch-icon.png"));
await (await onBurgundy(192, 0.08)).toFile(path.join(root, "public", "icons", "icon-192.png"));
await (await onBurgundy(512, 0.08)).toFile(path.join(root, "public", "icons", "icon-512.png"));
await (await onBurgundy(512, 0.18)).toFile(path.join(root, "public", "icons", "maskable-512.png"));

// ---------------------------------------------------------------------------
// 4. Open Graph / Twitter — 1200x630, < 300KB
// ---------------------------------------------------------------------------
for (const name of ["opengraph-image.jpg", "twitter-image.jpg"]) {
  await sharp(SRC_OG).resize(1200, 630, { fit: "cover", position: "centre" }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(root, "src", "app", name));
}
const alt = "Pacy Labs — Olamilekan David Adegoke, Full-Stack Systems Architect & Doctor of Optometry";
await fs.writeFile(path.join(root, "src", "app", "opengraph-image.alt.txt"), alt);
await fs.writeFile(path.join(root, "src", "app", "twitter-image.alt.txt"), alt);

console.log("Real logo pipeline complete! All favicons, SVGs, ICOs, and app icons generated from actual Pacy Labs logo.");
