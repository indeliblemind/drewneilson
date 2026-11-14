import {timelineLabels} from '../lib/timeline-layout';
const chronology=document.querySelector<HTMLElement>('#chronology');
const timeline=document.querySelector<HTMLElement>('#timeline');
if(chronology&&timeline){
 const buttons=[...chronology.querySelectorAll<HTMLButtonElement>('[data-job-id]')];
 const bars=[...timeline.querySelectorAll<HTMLButtonElement>('.role')];
 const info=chronology.querySelector<HTMLElement>('.chronology-info')!;
 let selected:string|null=null,hovered:string|null=null,focused:string|null=null;
 function showDetails(){
  const id=hovered??focused??selected;
  info.classList.toggle('has-job',!!id);
  info.querySelectorAll<HTMLElement>('[data-chronology-info]').forEach(item=>{
   const active=item.dataset.chronologyInfo===id;
   item.classList.toggle('active',active);item.setAttribute('aria-hidden',String(!active));
  });
 }
 function labels(){
  const canvas=document.createElement('canvas'),context=canvas.getContext('2d');
  if(!context)return;
  const sizes=bars.map(bar=>{
   const name=bar.querySelector('strong')!,role=bar.querySelector('small')!;
   context.font=getComputedStyle(name).font;const nameWidth=Math.ceil(context.measureText(name.textContent!).width);
   context.font=getComputedStyle(role).font;const roleWidth=Math.ceil(context.measureText(role.textContent!).width);
   return {id:bar.dataset.jobId!,left:bar.offsetLeft,width:bar.offsetWidth,lane:Number(bar.dataset.lane),nameWidth,roleWidth};
  });
  for(const label of timelineLabels(sizes,timeline!.clientWidth)){
   const bar=bars.find(bar=>bar.dataset.jobId===label.id)!;
   bar.dataset.label=label.placement;bar.dataset.showRole=String(label.showRole);
   bar.style.setProperty('--label-offset',`${label.offset}px`);
  }
 }
 for(const button of buttons){
  button.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch'){hovered=button.dataset.jobId!;showDetails();}});
  button.addEventListener('focus',()=>{hovered=null;focused=button.dataset.jobId!;showDetails();});
  button.addEventListener('blur',event=>{if(!info.contains(event.relatedTarget as Node|null)){focused=null;showDetails();}});
  // Keep touch details available even when the network toggles a selection off.
  button.addEventListener('click',()=>{focused=button.dataset.jobId!;showDetails();});
 }
 chronology.addEventListener('pointerleave',()=>{hovered=null;showDetails();});
 info.addEventListener('focusout',event=>{if(!info.contains(event.relatedTarget as Node|null)){focused=null;showDetails();}});
 document.addEventListener('network:selection',event=>{
  selected=(event as CustomEvent<{id:string|null}>).detail.id;
  if(!buttons.some(button=>button.dataset.jobId===selected))selected=null;
  hovered=null;focused=null;showDetails();
 });
 // Preserve normal article navigation; returning from a résumé employer link
 // restores its matching timeline/network selection without changing résumé layout.
 const pendingKey='chronology-resume-selection';
 document.querySelectorAll<HTMLAnchorElement>('#resume a[href^="/pieces/"]').forEach(link=>{
  const id=link.getAttribute('href')!.split('/')[2];
  if(buttons.some(button=>button.dataset.jobId===id))link.addEventListener('click',()=>{
   try{sessionStorage.setItem(pendingKey,id);}catch{/* Navigation still works when storage is unavailable. */}
   document.dispatchEvent(new CustomEvent('chronology:select',{detail:{id}}));
  });
 });
 const restoreResumeSelection=()=>{
  try{
   const id=sessionStorage.getItem(pendingKey);
   if(id&&buttons.some(button=>button.dataset.jobId===id)){
    sessionStorage.removeItem(pendingKey);document.dispatchEvent(new CustomEvent('chronology:select',{detail:{id}}));
   }
  }catch{/* Keep the default selection when storage is unavailable. */}
 };
 if(document.querySelector('#network .node'))restoreResumeSelection();
 else document.addEventListener('network:ready',restoreResumeSelection,{once:true});
 const observer=new ResizeObserver(labels);observer.observe(timeline);
 document.fonts.ready.then(labels);labels();
 const initial=buttons.find(button=>button.getAttribute('aria-pressed')==='true');selected=initial?.dataset.jobId??null;showDetails();
}
