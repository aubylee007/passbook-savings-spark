import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { Button } from '@/components/ui/button';
import { ngos, entrepreneurs, experts } from '@/data/demo';
import { recommendPartners, type PartnerSuggestion } from '@/lib/partner-match.functions';

const lookup = (id: string) => {
  const n = ngos.find(x => x.id === id); if (n) return { type: 'NGO', name: n.name, place: `${n.place}, ${n.state}`, link: true };
  const e = entrepreneurs.find(x => x.id === id); if (e) return { type: 'Social entrepreneur', name: `${e.name} · ${e.venture}`, place: `${e.place}, ${e.state}`, link: true };
  const x = experts.find(y => y.id === id); if (x) return { type: 'Expert', name: x.name, place: `${x.region}, ${x.state}`, link: false };
  return undefined;
};

export function PartnerFinder({ groupId, go }: { groupId: string; go: (id: string) => void }) {
  const ask = useServerFn(recommendPartners);
  const [need, setNeed] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState<PartnerSuggestion[] | null>(null);
  const submit = async () => {
    if (need.trim().length < 5 || loading) return;
    setLoading(true); setError(''); setItems(null);
    try { const r = await ask({ data: { groupId, need } }); if (r.error) setError(r.error); else setItems(r.suggestions); }
    catch { setError('Recommendations could not be made right now. Please try again.'); }
    setLoading(false);
  };
  return <div>
    <div className="field"><label htmlFor="need">What support does your group need?</label>
      <textarea id="need" rows={3} maxLength={1000} value={need} onChange={e => setNeed(e.target.value)} placeholder="e.g. We need buyers for our compost and advice on the rains this season." /></div>
    <Button className="action" disabled={loading || need.trim().length < 5} onClick={submit}>{loading ? 'Finding partners…' : 'Find partners'}</Button>
    {error && <p role="alert" className="small mt-3">{error}</p>}
    {items && (items.length === 0 ? <p className="small mt-3">No matching partner found yet. Try describing the need differently.</p> :
      <div className="mt-4 grid gap-3">{items.map(s => { const p = lookup(s.id); if (!p) return null; return <div key={s.id} className="goldbox"><p className="kicker">{p.type} · {p.place}</p><strong>{p.name}</strong><p className="small">{s.reason}</p>{p.link ? <Button variant="link" className="textlink" onClick={() => go(s.id)}>View profile →</Button> : <Button variant="link" className="textlink" onClick={() => go('experts')}>View experts →</Button>}</div>; })}</div>)}
    <p className="small mt-3">Suggestions are made by AI from our partners directory — please confirm with the partner before acting.</p>
  </div>;
}
