import {presentEvidence,matchingNodeIds,type Evidence,type ResumeMode} from '../lib/resume-model';
import {competencies} from '../data/competencies';
const root=document.querySelector<HTMLElement>('#resume');
const payload=document.querySelector('#resume-data');
if(root&&payload){
 const data=JSON.parse(payload.textContent!) as {evidence:Evidence[];nodes:{id:string;competencies:string[];accomplishments:{competencies:string[]}[]}[]};
 const selected=new Set<string>();let mode:ResumeMode='chronological';
 const modeButtons=[...root.querySelectorAll<HTMLButtonElement>('[data-resume-mode]')];
 const competencyButtons=[...document.querySelectorAll<HTMLButtonElement>('[data-competency]')];
 function update(){
  const tags=[...selected];const ranked=presentEvidence(data.evidence,tags,mode);const rows=new Map(ranked.map(item=>[item.id,item]));
  root!.querySelectorAll<HTMLElement>('[data-evidence-id]').forEach(row=>{
   const item=rows.get(row.dataset.evidenceId!);row.hidden=!item;row.classList.toggle('evidence-muted',!!item?.dim);row.dataset.score=String(item?.score??0);
   row.querySelector<HTMLElement>('.additional-evidence')!.hidden=!item?.additional;
  });
  // Reorder only evidence within each Job, never the employment history itself.
  root!.querySelectorAll<HTMLElement>('[data-evidence-group]').forEach(group=>{
   for(const item of ranked.filter(e=>e.groupId===group.dataset.evidenceGroup)){
    const row=[...group.querySelectorAll<HTMLElement>('[data-evidence-id]')].find(r=>r.dataset.evidenceId===item.id);if(row)group.append(row);
   }
  });
  const relevance=root!.querySelector('[data-relevance-evidence]')!;
  for(const item of ranked){const row=[...relevance.querySelectorAll<HTMLElement>('[data-evidence-id]')].find(r=>r.dataset.evidenceId===item.id);if(row)relevance.append(row);}
  root!.querySelectorAll<HTMLElement>('[data-resume-view]').forEach(view=>view.hidden=view.dataset.resumeView!==mode);
  modeButtons.forEach(button=>{button.classList.toggle('active',button.dataset.resumeMode===mode);button.setAttribute('aria-pressed',String(button.dataset.resumeMode===mode));});
  competencyButtons.forEach(button=>button.setAttribute('aria-pressed',String(selected.has(button.dataset.competency!))));
  const names=competencies.filter(c=>selected.has(c.id)).map(c=>c.label);
  const extra=ranked.filter(e=>e.additional).length;
  root!.querySelector('[data-resume-status]')!.textContent=names.length?`${names.join(' / ')} · ${extra} additional ${extra===1?'accomplishment':'accomplishments'} revealed`:'Curated default evidence';
  document.querySelector<HTMLElement>('[data-reset-competencies]')!.hidden=!selected.size;
  document.querySelector('[data-competency-status]')!.textContent=names.length?`${names.join(', ')} selected. Matching any selected competency.`:'No competency filter selected.';
  const matches=matchingNodeIds(data.nodes,tags);
  document.dispatchEvent(new CustomEvent('competencies:change',{detail:{selected:tags,matchingIds:[...matches]}}));
 }
 competencyButtons.forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.competency!;if(selected.has(id))selected.delete(id);else selected.add(id);update();}));
 modeButtons.forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.resumeMode as ResumeMode;update();}));
 document.querySelector('[data-reset-competencies]')!.addEventListener('click',()=>{selected.clear();update();});
 document.addEventListener('portfolio:reset',()=>{selected.clear();mode='chronological';update();});
 document.addEventListener('network:ready',update);
 root.querySelector<HTMLElement>('.resume-modes')!.hidden=false;
 document.querySelector<HTMLElement>('.competency-bar')!.hidden=false;
 update();
}
