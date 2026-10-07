import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { ngos, entrepreneurs, experts, groups } from '@/data/demo';

export type PartnerSuggestion = { id: string; reason: string };

export const recommendPartners = createServerFn({ method: 'POST' })
  .inputValidator((d: unknown) => z.object({ groupId: z.string().max(20), need: z.string().trim().min(5).max(1000) }).parse(d))
  .handler(async ({ data }): Promise<{ suggestions: PartnerSuggestion[]; error?: string }> => {
    const apiKey = process.env['LOVABLE_API_KEY'];
    if (!apiKey) return { suggestions: [], error: 'AI matching is not configured yet.' };
    const group = groups.find(g => g.id === data.groupId);
    const directory = [
      ...ngos.map(n => ({ id: n.id, type: 'NGO', name: n.name, state: n.state, work: n.work, offers: n.activities, schemes: n.schemes })),
      ...entrepreneurs.map(e => ({ id: e.id, type: 'Social entrepreneur', name: `${e.name} (${e.venture})`, state: e.state, work: e.work, products: e.products, looking: e.looking })),
      ...experts.map(x => ({ id: x.id, type: 'Expert', name: x.name, state: x.state, expertise: x.expertise, work: x.work, shops: x.shops })),
    ];
    const { createOpenAI } = await import('@ai-sdk/openai');
    const { streamText } = await import('ai');
    const provider = createOpenAI({
      baseURL: 'https://ai.gateway.lovable.dev/v1',
      apiKey,
      headers: { 'Lovable-API-Key': apiKey, 'X-Lovable-AIG-SDK': 'vercel-ai-sdk' },
    });
    try {
      const result = streamText({
        model: provider.responses('openai/gpt-6-astra'),
        instructions: 'You match rural Indian women\'s Self-Help Groups with partners from a fixed directory. Only recommend ids that exist in the directory. Prefer partners in the same state, but include others if clearly relevant. Return 1 to 3 recommendations. Each reason is one plain, simple sentence (under 30 words) a village woman can understand. Respond with JSON only, shaped {"recommendations":[{"id":"...","reason":"..."}]}.',
        prompt: `SHG: ${group ? `${group.name}, ${group.village}, ${group.state}; products: ${group.products.join(', ')}; problems: ${group.problems.join(' ')}` : 'unknown'}\nSupport needed: ${data.need}\nDirectory (json): ${JSON.stringify(directory)}`,
        providerOptions: { openai: { forceReasoning: true, reasoningEffort: 'low', reasoningSummary: 'auto', store: false, include: ['reasoning.encrypted_content'] } },
      });
      const text = await result.text;
      const match = text.match(/\{[\s\S]*\}/);
      const parsed = match ? JSON.parse(match[0]) : { recommendations: [] };
      const ids = new Set(directory.map(d => d.id));
      const suggestions = (Array.isArray(parsed.recommendations) ? parsed.recommendations : [])
        .filter((r: PartnerSuggestion) => r && ids.has(r.id) && typeof r.reason === 'string')
        .slice(0, 3)
        .map((r: PartnerSuggestion) => ({ id: r.id, reason: r.reason.slice(0, 240) }));
      return { suggestions };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      console.error('partner match failed', status, e);
      if (status === 402) return { suggestions: [], error: 'AI credits have run out. Please add credits to continue.' };
      if (status === 429) return { suggestions: [], error: 'Too many requests right now. Please try again in a minute.' };
      return { suggestions: [], error: 'Recommendations could not be made right now. Please try again.' };
    }
  });
