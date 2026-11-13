export interface FilterNode {id:string;kind:string;topics:string[];search:string}
export interface ContextLink {child:string;parent:string}
export interface Filters {query:string;kind:string;topic:string}
const normalize=(text:string)=>text.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().trim();
export function applyFilters(nodes:FilterNode[],contexts:ContextLink[],filters:Filters){
 const words=normalize(filters.query).split(/\s+/).filter(Boolean);
 const matches=new Set(nodes.filter(node=>(filters.kind==='all'||node.kind===filters.kind)&&(filters.topic==='all'||node.topics.some(t=>normalize(t)===normalize(filters.topic)))&&words.every(word=>normalize(node.search).includes(word))).map(n=>n.id));
 const visible=new Set(matches);const ids=new Set(nodes.map(n=>n.id));
 for(const link of contexts)if(matches.has(link.child)&&ids.has(link.parent))visible.add(link.parent);
 const contextOnly=new Set([...visible].filter(id=>!matches.has(id)));
 return {matches,visible,contextOnly};
}

export interface FocusEdge {source:string;target:string}
export function portfolioView(nodes:FilterNode[],contexts:ContextLink[],edges:FocusEdge[],filters:Filters,selected:string|null){
 const base=applyFilters(nodes,contexts,filters);
 const active=selected&&base.visible.has(selected)?selected:null;
 const focus=new Set<string>();
 if(active){
  focus.add(active);
  for(const edge of edges)if(base.visible.has(edge.source)&&base.visible.has(edge.target)){
   if(edge.source===active)focus.add(edge.target);
   if(edge.target===active)focus.add(edge.source);
  }
  // Preserve professional context for focused children, in both views.
  for(const link of contexts)if(focus.has(link.child)&&base.visible.has(link.parent))focus.add(link.parent);
 }else for(const id of base.visible)focus.add(id);
 return {...base,selected:active,focus};
}
