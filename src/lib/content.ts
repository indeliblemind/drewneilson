import { getCollection, type CollectionEntry } from 'astro:content';
export const kinds = [{id:'job', label:'Jobs', singular:'Job'}, {id:'project', label:'Projects', singular:'Project'}, {id:'idea', label:'Ideas', singular:'Idea'}] as const;
export const relations = {
 'part-of': {forward:'Part of', reverse:'Includes', directed:true},
 'led-to': {forward:'Led to', reverse:'Emerged from', directed:true},
 'informed': {forward:'Informed', reverse:'Informed by', directed:true},
 'related': {forward:'Related to', reverse:'Related to', directed:false},
} as const;
export type Edge = {source:string;target:string;type:keyof typeof relations;label:string;directed:boolean};
export const nodeLabel = (piece:CollectionEntry<'pieces'>) => piece.data.label ?? piece.data.title;
export const kindLabel = (kind:string) => kinds.find(k => k.id === kind)!.singular;
export function edgeLabel(edge:Edge, from:string) { return from === edge.source ? relations[edge.type].forward : relations[edge.type].reverse; }
export async function getPortfolio() {
 const all = await getCollection('pieces');
 const ids = new Set(all.map(p => p.id)); const seen = new Set<string>(); const edges:Edge[] = [];
 for (const piece of all) for (const link of piece.data.connections ?? []) {
  if (!ids.has(link.to)) throw new Error(`${piece.id}: connection target "${link.to}" does not exist.`);
  if (link.to === piece.id) throw new Error(`${piece.id}: a connection cannot point to itself.`);
  const relation = relations[link.relation];
  const ends = relation.directed ? [piece.id,link.to] : [piece.id,link.to].sort();
  const key = JSON.stringify([...ends,link.relation]);
  if (seen.has(key)) throw new Error(`${piece.id}: duplicate ${link.relation} connection to ${link.to}. Record a connection once.`);
  seen.add(key); edges.push({source:piece.id,target:link.to,type:link.relation,label:link.note ?? '',directed:relation.directed});
 }
 const pieces = all.filter(p => !p.data.draft).sort((a,b) => a.data.title.localeCompare(b.data.title));
 const visible = new Set(pieces.map(p => p.id));
 return {pieces,edges:edges.filter(e => visible.has(e.source) && visible.has(e.target))};
}
