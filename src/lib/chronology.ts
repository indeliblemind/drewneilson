export interface Chronology {start:number;end:number;label:string;precision:'month'|'year'}
function monthIndex(value:string,end=false){
 const match=/^(\d{4})(?:-(0[1-9]|1[0-2]))?$/.exec(value);
 if(!match)throw new Error(`Use YYYY or YYYY-MM for chronology: ${value}`);
 return Number(match[1])*12+(match[2]?Number(match[2])-1:end?11:0)+(end?1:0);
}
export function chronology(from?:string,to?:string,period?:string,asOf=new Date().toISOString().slice(0,7)):Chronology|null{
 if(from){const start=monthIndex(from);const end=monthIndex(to??asOf,true);if(end<=start)throw new Error(`End precedes start: ${from} – ${to}`);return {start,end,label:`${from} – ${to??'present'}`,precision:from.length===4&&(!to||to.length===4)?'year':'month'};}
 // Preserve existing year-only example ranges, without claiming month precision.
 const sample=period?.match(/^(\d{4})[–—-](\d{4})\s*\(example\)$/);
 if(sample){const start=monthIndex(sample[1]);const end=monthIndex(sample[2],true);if(end<=start)throw new Error('Invalid example date range');return {start,end,label:period!,precision:'year'};}
 return null;
}
export function assignLanes<T extends {id:string;start:number;end:number}>(jobs:T[]){
 const lanes:number[]=[];
 return [...jobs].sort((a,b)=>a.start-b.start||a.end-b.end||a.id.localeCompare(b.id)).map(job=>{
  let lane=lanes.findIndex(end=>end<=job.start);if(lane<0)lane=lanes.length;lanes[lane]=job.end;
  return {...job,lane};
 });
}
