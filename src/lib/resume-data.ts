import type {CollectionEntry} from 'astro:content';
import type {Edge} from './relations';
import type {Evidence,EvidenceContext} from './resume-model';
import {chronology} from './chronology';
export function resumeData(pieces:CollectionEntry<'pieces'>[],edges:Edge[]){
 const jobs=pieces.filter(p=>p.data.kind==='job').sort((a,b)=>{
  const x=chronology(a.data.startDate,a.data.endDate,a.data.period),y=chronology(b.data.startDate,b.data.endDate,b.data.period);
  return (y?.end??-Infinity)-(x?.end??-Infinity)||(y?.start??-Infinity)-(x?.start??-Infinity)||a.id.localeCompare(b.id);
 });
 const contexts=new Map<string,EvidenceContext>(jobs.map(job=>[job.id,{id:job.id,employer:job.data.employer?.trim()||job.data.title,role:job.data.role??'Role not provided',period:chronology(job.data.startDate,job.data.endDate,job.data.period)?.label??job.data.period??'Dates not provided',url:`/pieces/${job.id}/`}]));
 const ranks=new Map(jobs.map((job,i)=>[job.id,i]));
 const visible=new Set(pieces.map(p=>p.id));
 const evidence:Evidence[]=[];
 for(const piece of pieces){
  if(piece.data.kind==='idea')continue;
  const ids=piece.data.kind==='job'?[piece.id]:edges.filter(e=>e.type==='part-of'&&e.source===piece.id&&contexts.has(e.target)).map(e=>e.target);
  const linked=[...new Set(ids)].map(id=>contexts.get(id)!).sort((a,b)=>ranks.get(a.id)!-ranks.get(b.id)!);
  for(const item of piece.data.accomplishments??[]){
   const support=item.supporting&&visible.has(item.supporting)?item.supporting:piece.id;
   evidence.push({id:`${piece.id}:${item.id}`,parentId:piece.id,parentTitle:piece.data.title,parentKind:piece.data.kind,text:item.text,competencies:item.competencies??[],default:item.default??false,priority:item.priority??0,supportingUrl:`/pieces/${support}/`,contexts:linked,groupId:linked[0]?.id??piece.id,groupRank:linked[0]?ranks.get(linked[0].id)!:jobs.length+pieces.indexOf(piece)});
  }
 }
 return {jobs,contexts,evidence};
}
