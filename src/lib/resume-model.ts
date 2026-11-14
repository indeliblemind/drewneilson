export interface Accomplishment {id:string;text:string;competencies:string[];default:boolean;priority:number;supporting?:string}
export interface EvidenceContext {id:string;employer:string;role:string;period:string;url:string}
export interface Evidence {id:string;parentId:string;parentTitle:string;parentKind:string;text:string;competencies:string[];default:boolean;priority:number;supportingUrl:string;contexts:EvidenceContext[];groupId:string;groupRank:number}
export type ResumeMode='chronological'|'relevance';
export const relevanceScore=(competencies:readonly string[],selected:readonly string[])=>new Set(selected.filter(id=>competencies.includes(id))).size;
export function presentEvidence(evidence:Evidence[],selected:string[],mode:ResumeMode){
 const active=selected.length>0;
 return evidence.map(item=>({...item,score:relevanceScore(item.competencies,selected)}))
  .filter(item=>item.default||(active&&item.score>0))
  .map(item=>({...item,dim:active&&item.score===0,additional:!item.default}))
  .sort((a,b)=>{
   if(mode==='chronological'&&a.groupRank!==b.groupRank)return a.groupRank-b.groupRank;
   return b.score-a.score||b.priority-a.priority||a.groupRank-b.groupRank||a.id.localeCompare(b.id);
  });
}
// Node matching uses its own tags plus the tags of accomplishments attached to it.
// It does not traverse graph relationships or change timeline selection.
export function matchingNodeIds(nodes:{id:string;competencies:string[];accomplishments?:{competencies:string[]}[]}[],selected:string[]){
 return new Set(nodes.filter(node=>!selected.length||relevanceScore([...node.competencies,...(node.accomplishments??[]).flatMap(a=>a.competencies)],selected)>0).map(n=>n.id));
}
