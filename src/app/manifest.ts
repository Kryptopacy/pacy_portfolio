import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pacy Labs | Olamilekan David Adegoke",
    short_name: "Pacy Labs",
    description:
      "Full-Stack Systems Architect & Doctor of Optometry. Engineering deterministic operating systems, W3C WebMCP standards, and autonomous agent protocols.",
    start_url: "/",
    display: "standalone",
    background_color: "#120207",
    theme_color: "#3f0e21",
    icons: [
      {
        src: "/icon.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
