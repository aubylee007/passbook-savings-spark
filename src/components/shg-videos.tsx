import { useEffect, useState } from 'react';
import { ExternalLink, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import videoThumb from '@/assets/video-mock.jpg';

export function youtubeIdFromUrl(value: string): string | undefined {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password) return;
    let id: string | null | undefined;
    if (url.hostname === 'youtu.be') id = url.pathname.split('/')[1];
    else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) {
      id = url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(shorts|embed|live)\//.test(url.pathname) ? url.pathname.split('/')[2] : undefined;
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : undefined;
  } catch { return; }
}

type Clip = { id: string; youtube_id: string; title: string };

export function ShgVideos({ groupId, editable = false }: { groupId: string; editable?: boolean }) {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    let active = true;
    setClips([]); setLoading(true); setError(''); setNotice(''); setTitle(''); setUrl('');
    const load = async () => {
      const result = await supabase.from('shg_videos').select('id,youtube_id,title').eq('shg_id', groupId).order('created_at', { ascending: false });
      if (!active) return;
      setLoading(false);
      if (result.error) setError('Videos could not be loaded. Please try again.');
      else { setClips(result.data ?? []); setError(''); }
    };
    void load();
    const channel = supabase.channel(`shg-videos-${groupId}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'shg_videos', filter: `shg_id=eq.${groupId}` }, () => void load()).subscribe();
    return () => { active = false; void supabase.removeChannel(channel); };
  }, [groupId]);

  const addClip = async (event: React.FormEvent) => {
    event.preventDefault();
    if (saving) return;
    const youtubeId = youtubeIdFromUrl(url);
    const cleanTitle = title.trim();
    setNotice('');
    if (!youtubeId || !cleanTitle || cleanTitle.length > 120) { setError('Enter a video title and a valid HTTPS YouTube video link.'); return; }
    setSaving(true); setError('');
    try {
      const result = await supabase.from('shg_videos').insert({ shg_id: groupId, youtube_id: youtubeId, title: cleanTitle }).select('id,youtube_id,title').single();
      if (result.error) { setError(result.error.code === '23505' ? 'This video is already shared with your group.' : 'The video could not be shared. Please try again.'); return; }
      if (result.data) setClips(previous => [result.data, ...previous.filter(clip => clip.id !== result.data.id)]);
      setTitle(''); setUrl(''); setNotice('Video shared on your SHG profile and both login views.');
    } catch { setError('The video could not be shared. Please try again.'); }
    finally { setSaving(false); }
  };

  return <div>
    {loading ? <p className="small" role="status">Loading videos…</p> : clips.length ? <div className="grid gap-5 sm:grid-cols-2">{clips.map(clip => <article key={clip.id}>
      <div className="video-mock"><img src={videoThumb} alt="Illustrative thumbnail; not a still from this YouTube video" width={1088} height={608} loading="lazy"/><span className="play" aria-hidden="true">▶</span><span className="vid-note">ILLUSTRATIVE THUMBNAIL</span></div>
      <h3 className="mt-3 break-words">{clip.title}</h3>
      <Button asChild variant="link" className="textlink"><a href={`https://www.youtube.com/watch?v=${clip.youtube_id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube <ExternalLink/></a></Button>
    </article>)}</div> : <div className="video-mock"><img src={videoThumb} alt="Mock video thumbnail of a savings meeting" width={1088} height={608} loading="lazy"/><span className="play" aria-hidden="true">▶</span><span className="vid-note">MOCK THUMBNAIL · NO YOUTUBE CLIPS SHARED YET</span></div>}
    {editable && <form className="mt-6" onSubmit={addClip}>
      <Button asChild variant="outline" className="outline-action"><a href="https://www.youtube.com/upload" target="_blank" rel="noopener noreferrer"><Upload/> Upload on YouTube <ExternalLink/></a></Button>
      <p className="small mt-3">Upload using your YouTube account, then share the video link below. Shared links are public; obtain everyone’s consent before sharing.</p>
      <div className="field"><label htmlFor={`clip-title-${groupId}`}>Video title</label><input id={`clip-title-${groupId}`} maxLength={120} value={title} onChange={event => setTitle(event.target.value)} required/></div>
      <div className="field"><label htmlFor={`clip-url-${groupId}`}>YouTube video link</label><input id={`clip-url-${groupId}`} type="url" maxLength={2048} value={url} onChange={event => setUrl(event.target.value)} required/></div>
      <Button type="submit" className="action" disabled={saving || !title.trim() || !url.trim()}><Plus/>{saving ? 'Sharing…' : 'Share video'}</Button>
      <p className="small mt-3">Demo sharing only; secure SHG-only access is required before launch.</p>
    </form>}
    {error && <p className="small mt-3" role="alert">{error}</p>}
    {notice && <p className="small mt-3" role="status">{notice}</p>}
  </div>;
}