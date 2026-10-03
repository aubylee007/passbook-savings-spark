CREATE TABLE public.shg_messages (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), shg_id text NOT NULL CHECK (shg_id IN ('shg1','shg2','shg3')), sender_name text NOT NULL CHECK (char_length(sender_name) BETWEEN 1 AND 80), kind text NOT NULL CHECK (kind IN ('Recommendation','Comment')), body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 1000), created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT ON public.shg_messages TO anon, authenticated;
GRANT ALL ON public.shg_messages TO service_role;
ALTER TABLE public.shg_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Demo messages readable" ON public.shg_messages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Demo messages writable" ON public.shg_messages FOR INSERT TO anon, authenticated WITH CHECK (shg_id IN ('shg1','shg2','shg3') AND sender_name = 'Aubrey' AND kind IN ('Recommendation','Comment') AND char_length(body) BETWEEN 1 AND 1000);
ALTER PUBLICATION supabase_realtime ADD TABLE public.shg_messages;