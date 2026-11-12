import { getCollection } from 'astro:content';
import relationships from '../data/relationships.json';
export async function getPortfolio() {
  const all = await getCollection('pieces');
  const ids = new Set(all.map(piece => piece.id));
  const seen = new Set<string>();
  for (const edge of relationships) {
    if (!ids.has(edge.source) || !ids.has(edge.target)) throw new Error(`Unknown relationship: ${edge.source} → ${edge.target}`);
    if (edge.type !== 'context' && edge.type !== 'related') throw new Error(`Unknown relationship type: ${edge.type}`);
    if (edge.type === 'context') {
      const kinds = [all.find(p => p.id === edge.source)!.data.kind, all.find(p => p.id === edge.target)!.data.kind];
      if (!kinds.includes('job') || !kinds.includes('story')) throw new Error(`Context must connect a job and a story: ${edge.source} → ${edge.target}`);
    }
    if (edge.source === edge.target) throw new Error(`Self relationship: ${edge.source}`);
    const key = [edge.source, edge.target].sort().join(':');
    if (seen.has(key)) throw new Error(`Duplicate relationship: ${key}`);
    seen.add(key);
  }
  const pieces = all.filter(piece => !piece.data.draft).sort((a, b) => a.data.order - b.data.order);
  const visible = new Set(pieces.map(piece => piece.id));
  const edges = relationships.filter(edge => visible.has(edge.source) && visible.has(edge.target));
  return { pieces, edges };
}
