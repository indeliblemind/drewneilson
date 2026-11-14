import test from 'node:test';
import assert from 'node:assert/strict';
import {timelineLabels,timelineGeometry} from '../src/lib/timeline-layout.ts';
const bar=(id,left,width,nameWidth,lane=0,roleWidth=100)=>({id,left,width,nameWidth,lane,roleWidth});
test('long bars show complete names and roles only when both fit',()=>{
 const labels=timelineLabels([bar('long',0,300,150),bar('medium',350,130,100,0,180)],700);
 assert.equal(labels[0].placement,'inside');assert(labels[0].showRole);
 assert.equal(labels[1].placement,'inside');assert(!labels[1].showRole);
});
test('one-month bars keep their widths and use a free right-hand label',()=>{
 const input=[bar('short',100,6,180)];const snapshot=JSON.stringify(input);
 const label=timelineLabels(input,700)[0];assert.equal(label.placement,'after');assert.equal(label.offset,14);assert.equal(JSON.stringify(input),snapshot);
});
test('labels near the right edge use a free left-hand gap',()=>assert.equal(timelineLabels([bar('edge',680,20,160)],700)[0].placement,'before'));
test('crowded bars remain discoverable without labels colliding',()=>{
 const bars=[bar('a',0,70,150),bar('b',80,70,150),bar('c',160,530,150)];
 const labels=timelineLabels(bars,700);assert.equal(labels.find(label=>label.id==='a').placement,'none');assert.equal(labels.find(label=>label.id==='b').placement,'none');
});
test('external labels do not overlap another external label or unrelated bar',()=>{
 for(const width of [700,900,1716]){
  const bars=[bar('a',50,5,180),bar('b',80,6,200),bar('c',400,6,280),bar('d',300,15,220,1)];
  const labels=timelineLabels(bars,width);const boxes=bars.map(b=>({id:b.id,lane:b.lane,start:b.left,end:b.left+b.width}));
  for(const label of labels)if(label.placement==='after'||label.placement==='before'){
   const b=bars.find(b=>b.id===label.id),start=b.left+label.offset,end=start+b.nameWidth;
   assert(start>=0&&end<=width);
   assert(!boxes.some(box=>box.lane===b.lane&&start<box.end&&end>box.start));boxes.push({id:label.id,lane:b.lane,start,end});
  }
 }
});
test('row geometry is shallow and ends immediately after the last occupied row',()=>{
 for(const rows of [1,3,5]){const g=timelineGeometry(rows);assert.equal(g.height-(g.top+(rows-1)*g.rowStep+g.barHeight),4);}
 assert.equal(timelineGeometry(3).height,160);
});
