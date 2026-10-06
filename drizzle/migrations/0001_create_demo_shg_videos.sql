CREATE TABLE public.shg_videos (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 shg_id text NOT NULL CHECK (shg_id IN ('shg1','shg2','shg3')),
 youtube_id text NOT NULL CHECK (youtube_id ~ '^[A-Za-z0-9_-]{11}$'),
 title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 120),
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE (shg_id, youtube_id)
);
GRANT SELECT, INSERT ON public.shg_videos TO anon, authenticated;
GRANT ALL ON public.shg_videos TO service_role;
ALTER TABLE public.shg_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public demo clips readable" ON public.shg_videos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Demo clip links insertable" ON public.shg_videos FOR INSERT TO anon, authenticated WITH CHECK (shg_id IN ('shg1','shg2','shg3') AND youtube_id ~ '^[A-Za-z0-9_-]{11}$' AND char_length(btrim(title)) BETWEEN 1 AND 120);
COMMENT ON TABLE public.shg_videos IS 'Public demo YouTube references only. Mock login is not production authorization; replace insert policy with verified SHG ownership before launch.';
ALTER PUBLICATION supabase_realtime ADD TABLE public.shg_videos;