export interface LabelBar {id:string;left:number;width:number;lane:number;nameWidth:number;roleWidth:number}
export interface TimelineLabel {id:string;placement:'inside'|'after'|'before'|'none';offset:number;showRole:boolean}
// Bars never move. Labels may use a free gap in the same lane, right then left.
// If neither gap fits the complete employer, interaction supplies the full label.
export function timelineLabels(bars:LabelBar[],width:number):TimelineLabel[]{
 const occupied=bars.map(bar=>({lane:bar.lane,start:bar.left,end:bar.left+bar.width}));
 return [...bars].sort((a,b)=>a.left-b.left||a.id.localeCompare(b.id)).map(bar=>{
  if(bar.width>=bar.nameWidth+16)return {id:bar.id,placement:'inside',offset:7,showRole:bar.roleWidth>0&&bar.width>=bar.roleWidth+16};
  const fits=(start:number,end:number)=>start>=0&&end<=width&&!occupied.some(box=>box.lane===bar.lane&&start<box.end+4&&end>box.start-4);
  const after=bar.left+bar.width+8,before=bar.left-8-bar.nameWidth;
  for(const [placement,start] of [['after',after],['before',before]] as const){
   if(fits(start,start+bar.nameWidth)){
    occupied.push({lane:bar.lane,start,end:start+bar.nameWidth});
    return {id:bar.id,placement,offset:start-bar.left,showRole:false};
   }
  }
  return {id:bar.id,placement:'none',offset:0,showRole:false};
 });
}
export const timelineGeometry=(rows:number)=>({barHeight:34,rowStep:42,top:38,height:rows?38+rows*42-8+4:34});
