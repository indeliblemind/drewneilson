import {relations,type Edge} from '../lib/relations';
interface Subject {id:string;name:string;title:string;type:'job'|'project'|'idea';desc:string;role:string;stage:string;attribution:string;url:string;chronology:null|{start:number;end:number;label:string;precision:string}}
interface Moving extends Subject {x:number;y:number;vx:number;vy:number;tx:number;ty:number;anchorX:number;anchorY:number}
const payload=document.querySelector('#network-data');
const svg=document.querySelector<SVGSVGElement>('#network');
if(payload&&svg){
 const data=JSON.parse(payload.textContent!) as {nodes:Subject[];links:Edge[]};
 const nodes:Moving[]=data.nodes.map((n,i)=>{const a=i*2.39996,r=80+Math.sqrt(i/data.nodes.length)*145;return {...n,x:410+Math.cos(a)*r,y:255+Math.sin(a)*r*.7,vx:0,vy:0,tx:410,ty:260,anchorX:410,anchorY:260};});
 const byId=new Map(nodes.map(n=>[n.id,n]));
 const links=data.links;
 const adjacent=(id:string)=>new Set(links.flatMap(l=>l.source===id?[l.target]:l.target===id?[l.source]:[]));
 const colors={job:'#466c70',project:'#ad5b43',idea:'#a3823e'};
 const ns='http://www.w3.org/2000/svg';
 function shape<K extends keyof SVGElementTagNameMap>(tag:K,attrs:Record<string,string|number>={}){const e=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,String(v));return e;}
 function html<K extends keyof HTMLElementTagNameMap>(tag:K,text='',className=''){const e=document.createElement(tag);e.textContent=text;if(className)e.className=className;return e;}
 let selected:string|null=null,category='all',onlyRelated=false,active=false,frameCount=0,handle=0;
 let competencyActive=false;let competencyMatches=new Set(nodes.map(n=>n.id));
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const near=()=>selected?adjacent(selected):new Set<string>();
 const visible=(n:Moving)=>n.id===selected||(category==='all'||category===n.type)&&(!onlyRelated||!selected||near().has(n.id));
 const edgeGroup=document.querySelector('#edges')!,nodeGroup=document.querySelector('#nodes')!;
 const edgeShapes=links.map(link=>{const e=shape('line',{class:'edge'});edgeGroup.append(e);return {link,e};});
 const shapes=nodes.map(n=>{
  const g=shape('g',{class:'node',tabindex:0,role:'button','aria-label':`${n.type}: ${n.name}`,'aria-pressed':'false','data-node-id':n.id});
  const r=n.type==='job'?20:n.type==='project'?12:9;
  g.append(shape('circle',{class:'hit-area',r:27,fill:'transparent'}),shape('circle',{class:'halo',r:r+7,style:`fill:${colors[n.type]}`}),shape('circle',{class:'dot',r,fill:colors[n.type]}));
  const text=shape('text',{'text-anchor':'middle',y:r+17});
  const words=n.name.split(/\s+/),lines:string[]=[''];
  for(const word of words){const i=lines.length-1;if((lines[i]+' '+word).trim().length>22&&lines[i])lines.push(word);else lines[i]=(lines[i]+' '+word).trim();}
  for(const [i,line]of lines.entries()){const span=shape('tspan',{x:0,dy:i?14:0});span.textContent=line;text.append(span);}
  g.append(text);g.addEventListener('click',()=>choose(n.id));
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(n.id);}});
  nodeGroup.append(g);return {n,g};
 });
 // Topology-based initial targets: Jobs anchor their direct work; shared Ideas
 // sit between connected work. Isolated subjects remain independent.
 const jobs=nodes.filter(n=>n.type==='job');
 for(const [i,n]of jobs.entries()){const a=-Math.PI/2+i/Math.max(jobs.length,1)*Math.PI*2;n.anchorX=410+Math.cos(a)*200;n.anchorY=250+Math.sin(a)*145;}
 const assigned=new Set(jobs.map(n=>n.id));
 for(const job of jobs){const children=nodes.filter(n=>!assigned.has(n.id)&&adjacent(job.id).has(n.id));children.forEach((n,i)=>{const a=i/Math.max(1,children.length)*Math.PI*2;n.anchorX=job.anchorX+Math.cos(a)*105;n.anchorY=job.anchorY+Math.sin(a)*85;assigned.add(n.id);});}
 for(let pass=0;pass<3;pass++)for(const n of nodes.filter(n=>!assigned.has(n.id))){const neighbors=[...adjacent(n.id)].map(id=>byId.get(id)!).filter(m=>assigned.has(m.id));if(neighbors.length){n.anchorX=neighbors.reduce((v,m)=>v+m.anchorX,0)/neighbors.length+35;n.anchorY=neighbors.reduce((v,m)=>v+m.anchorY,0)/neighbors.length+55;assigned.add(n.id);}}
 const isolated=nodes.filter(n=>!assigned.has(n.id));isolated.forEach((n,i)=>{n.anchorX=110+i*125;n.anchorY=420;});
 for(const n of nodes){n.anchorX=Math.max(90,Math.min(725,n.anchorX));n.anchorY=Math.max(65,Math.min(415,n.anchorY));}
 function updateUI(){
  const neighbors=near(),relatedJobs=new Set<string>();
  if(selected)for(const id of neighbors){const n=byId.get(id)!;if(n.type==='job')relatedJobs.add(id);if(n.type==='project')for(const other of adjacent(id))if(byId.get(other)?.type==='job')relatedJobs.add(other);}
  document.querySelectorAll<HTMLButtonElement>('[data-job-id]').forEach(button=>{const id=button.dataset.jobId!;button.classList.toggle('selected',id===selected);button.classList.toggle('related',!!selected&&id!==selected&&relatedJobs.has(id));button.classList.toggle('dim',!!selected&&id!==selected&&!relatedJobs.has(id));button.setAttribute('aria-pressed',String(id===selected));});
  for(const {n,g}of shapes){const show=visible(n);g.classList.toggle('selected',n.id===selected);g.classList.toggle('related',!!selected&&neighbors.has(n.id));g.classList.toggle('dim',!!selected&&n.id!==selected&&!neighbors.has(n.id));g.style.display=show?'':'none';g.setAttribute('tabindex',show?'0':'-1');g.setAttribute('aria-pressed',String(n.id===selected));}
  for(const {link,e}of edgeShapes){e.classList.toggle('active',!!selected&&(link.source===selected||link.target===selected));e.classList.toggle('dim',!!selected&&link.source!==selected&&link.target!==selected);e.style.display=visible(byId.get(link.source)!)&&visible(byId.get(link.target)!)?'':'none';}
  document.querySelectorAll<HTMLButtonElement>('[data-category]').forEach(b=>{b.classList.toggle('active',b.dataset.category===category);b.setAttribute('aria-pressed',String(b.dataset.category===category));});
  document.dispatchEvent(new CustomEvent('network:selection',{detail:{id:selected}}));
  updateCompetencyPresentation();renderDetail();document.querySelector('#network-status')!.textContent=selected?`${byId.get(selected)!.name} selected. ${neighbors.size} direct connections. Related chronology roles highlighted.`:'Overview restored.';
 }
 function updateCompetencyPresentation(){
  document.querySelectorAll<HTMLButtonElement>('[data-browse-id]').forEach(button=>{
   const id=button.dataset.browseId!;
   button.hidden=competencyActive&&!competencyMatches.has(id);
   button.setAttribute('aria-pressed',String(id===selected));
  });
  document.querySelectorAll<HTMLElement>('.subject-group').forEach(group=>{group.hidden=[...group.querySelectorAll<HTMLButtonElement>('[data-browse-id]')].every(button=>button.hidden);});
  for(const {n,g}of shapes)g.classList.toggle('competency-dim',competencyActive&&!competencyMatches.has(n.id)&&n.id!==selected);
  for(const {link,e}of edgeShapes)e.classList.toggle('competency-dim',competencyActive&&(!competencyMatches.has(link.source)||!competencyMatches.has(link.target))&&link.source!==selected&&link.target!==selected);
 }
 document.addEventListener('competencies:change',event=>{
  const detail=(event as CustomEvent<{selected:string[];matchingIds:string[]}>).detail;
  competencyActive=detail.selected.length>0;competencyMatches=new Set(detail.matchingIds);updateCompetencyPresentation();
 });
 function renderDetail(){
  const panel=document.querySelector('#detail')!;panel.replaceChildren();
  if(!selected){panel.append(html('div','Overview','kicker'),html('h2','Follow a connection.'),html('p','Choose a role in the chronology or any node in the map. The network reorganizes around the selection while the timeline stays put.'),html('p','Turn on Only related to hide unrelated subjects, or continue exploring the faded nodes.'),html('p','This is the existing fictional and test collection, not the career content from the V2 reference.','meta'));return;}
  const n=byId.get(selected)!,neighbors=near();
  panel.append(html('div',`Selected ${n.type}`,'kicker'),html('h2',n.title),html('div',[n.role,n.chronology?.label,n.stage].filter(Boolean).join(' · '),'meta'),html('p',n.desc));
  if(n.attribution)panel.append(html('p',n.attribution,'meta'));
  const page=html('a','Read the full page ↗','read-page');page.href=n.url;panel.append(page,html('h3',`Direct connections · ${neighbors.size}`));
  for(const id of neighbors){const other=byId.get(id)!;const ties=links.filter(l=>(l.source===n.id&&l.target===id)||(l.target===n.id&&l.source===id));const b=html('button','','related-button');b.type='button';b.append(html('strong',other.name));for(const tie of ties){const label=tie.source===n.id?relations[tie.type].forward:relations[tie.type].reverse;b.append(html('small',`${label}${tie.label?' · '+tie.label:''}`));}b.addEventListener('click',()=>{choose(id,false);shapes.find(s=>s.n.id===id)?.g.focus();});panel.append(b);}
  if(!neighbors.size)panel.append(html('p','This subject stands independently. No connection is required.','meta'));
  const clear=html('button','Clear selection','chip clear-selection');clear.type='button';clear.addEventListener('click',()=>choose(null));panel.append(clear);
 }
 function targets(){
  const vis=nodes.filter(visible),neighbors=near();
  // Preserve the reference's selected/neighbor/outer-ring reorganization.
  for(const [i,n]of vis.entries()){
   if(!selected){n.tx=n.anchorX;n.ty=n.anchorY;continue;}
   const a=i*2.399963,r=n.id===selected?0:neighbors.has(n.id)?145:265;
   n.tx=400+Math.cos(a)*r;n.ty=220+Math.sin(a)*r*.73;
   if(n.id===selected){n.tx=400;n.ty=220;}
   n.tx=Math.max(80,Math.min(740,n.tx));n.ty=Math.max(55,Math.min(425,n.ty));
  }
  // Relax label boxes before animating toward them; motion itself still uses
  // the reference spring/damping loop rather than a continuously running force graph.
  const labelBox=(n:Moving)=>({half:Math.min(155,Math.max(n.type==='job'?28:20,Math.min(n.name.length,22)*(n.id===selected?3.7:3.1)))+6,top:n.type==='job'?24:16,bottom:(n.type==='job'?20:12)+20+Math.ceil(n.name.length/22)*14});
  for(let pass=0;pass<90;pass++)for(let i=0;i<vis.length;i++)for(let j=i+1;j<vis.length;j++){
   const a=vis[i],b=vis[j],aa=labelBox(a),bb=labelBox(b);
   const overlapX=aa.half+bb.half-Math.abs(a.tx-b.tx);
   const overlapY=Math.min(a.ty+aa.bottom,b.ty+bb.bottom)-Math.max(a.ty-aa.top,b.ty-bb.top);
   if(overlapX<=0||overlapY<=0)continue;
   const aw=a.id===selected?0:b.id===selected?1:.5,bw=1-aw;
   if(overlapX<overlapY*1.5){const push=(overlapX+2)*.2*(a.tx<=b.tx?-1:1);a.tx+=push*aw;b.tx-=push*bw;}
   else{const push=(overlapY+2)*.2*(a.ty<=b.ty?-1:1);a.ty+=push*aw;b.ty-=push*bw;}
   for(const n of [a,b]){n.tx=Math.max(82,Math.min(738,n.tx));n.ty=Math.max(50,Math.min(425,n.ty));}
  }
 }
 function draw(){for(const {n,g}of shapes)g.setAttribute('transform',`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`);for(const {link,e}of edgeShapes){const a=byId.get(link.source)!,b=byId.get(link.target)!;e.setAttribute('x1',String(a.x));e.setAttribute('y1',String(a.y));e.setAttribute('x2',String(b.x));e.setAttribute('y2',String(b.y));}}
 function frame(){
  const vis=nodes.filter(visible);let energy=0;
  for(const n of vis){let fx=(n.tx-n.x)*.024,fy=(n.ty-n.y)*.024;
   for(const m of vis){if(m===n)continue;const dx=n.x-m.x,dy=n.y-m.y,dist=Math.hypot(dx,dy)||1;let min=n.type==='job'||m.type==='job'?82:61;
    if(Math.abs(dy)<38)min=Math.max(min,Math.min(150,(Math.min(n.name.length,22)+Math.min(m.name.length,22))*2.7));
    if(dist<min){const f=(min-dist)*.009;fx+=dx/dist*f;fy+=dy/dist*f;}
   }
   n.vx=(n.vx+fx)*.78;n.vy=(n.vy+fy)*.78;n.x=Math.max(60,Math.min(760,n.x+n.vx));n.y=Math.max(40,Math.min(440,n.y+n.vy));energy+=Math.abs(n.vx)+Math.abs(n.vy);
  }
  draw();if(energy>.13&&frameCount<260){frameCount++;handle=requestAnimationFrame(frame);}else{active=false;frameCount=0;svg!.dataset.animating='false';}
 }
 function reflow(){
  targets();updateUI();
  if(motion.matches){cancelAnimationFrame(handle);active=false;for(const n of nodes){n.x=n.tx;n.y=n.ty;n.vx=n.vy=0;}draw();svg!.dataset.animating='false';return;}
  frameCount=0;svg!.dataset.animating='true';if(!active){active=true;handle=requestAnimationFrame(frame);}
 }
 function choose(id:string|null,restoreFocus=true){selected=selected===id?null:id;reflow();if(restoreFocus&&id===null)shapes[0]?.g.focus();}
 document.querySelectorAll<HTMLButtonElement>('[data-job-id]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.jobId!)));
 document.addEventListener('chronology:select',event=>{const id=(event as CustomEvent<{id:string}>).detail.id;if(byId.get(id)?.type==='job'){selected=id;reflow();}});
 document.querySelectorAll<HTMLButtonElement>('[data-browse-id]').forEach(b=>b.addEventListener('click',()=>{choose(b.dataset.browseId!,false);document.querySelector('#detail')!.scrollIntoView({block:'nearest',behavior:motion.matches?'instant':'smooth'});}));
 document.querySelectorAll<HTMLButtonElement>('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category!;reflow();}));
 const filter=document.querySelector<HTMLInputElement>('#only-related')!;filter.addEventListener('change',()=>{onlyRelated=filter.checked;reflow();});
 document.querySelector('[data-reset]')!.addEventListener('click',()=>{selected=null;category='all';onlyRelated=false;filter.checked=false;reflow();document.dispatchEvent(new Event('portfolio:reset'));});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){selected=null;reflow();}});
 svg.addEventListener('click',e=>{if(!(e.target as Element).closest('.node')){selected=null;reflow();}});
 motion.addEventListener('change',reflow);
 reflow();
 document.dispatchEvent(new Event('network:ready'));
}
