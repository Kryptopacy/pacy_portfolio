-- Supabase Schema for Pacy Labs Intercom
-- Enables real-time AI conversation + Founder live takeover with Supabase Realtime

CREATE TABLE IF NOT EXISTS public.intercom_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id TEXT NOT NULL,
    visitor_name TEXT DEFAULT 'Anonymous Visitor',
    visitor_contact TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'ai_active', -- 'ai_active' | 'waiting_founder' | 'founder_active' | 'resolved'
    intent TEXT DEFAULT 'General Inquiry',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.intercom_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.intercom_conversations(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL, -- 'visitor' | 'ai' | 'founder'
    sender_name TEXT NOT NULL,
    text TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_intercom_messages_conv_id ON public.intercom_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_intercom_conversations_visitor ON public.intercom_conversations(visitor_id);
CREATE INDEX IF NOT EXISTS idx_intercom_conversations_updated ON public.intercom_conversations(updated_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.intercom_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intercom_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read & insert for active conversation matching
CREATE POLICY "Allow anon read conversations" ON public.intercom_conversations
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow anon insert conversations" ON public.intercom_conversations
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow anon update conversations" ON public.intercom_conversations
    FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "Allow anon read messages" ON public.intercom_messages
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow anon insert messages" ON public.intercom_messages
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Enable Realtime on both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.intercom_conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.intercom_messages;
