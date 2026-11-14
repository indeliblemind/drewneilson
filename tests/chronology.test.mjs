import test from 'node:test';
import assert from 'node:assert/strict';
import {chronology,assignLanes} from '../src/lib/chronology.ts';
test('year-only example ranges retain their precision and include their end year',()=>{const date=chronology(undefined,undefined,'2022–2025 (example)');assert.equal(date.end-date.start,48);assert.equal(date.precision,'year');});
test('missing dates remain undated, not invented',()=>assert.equal(chronology(undefined,undefined,'Your role'),null));
test('month ranges use inclusive ending months',()=>assert.equal(chronology('2019-03','2019-09').end-chronology('2019-03','2019-09').start,7));
test('present uses the explicitly supplied as-of month',()=>assert.equal(chronology('2026-06',undefined,undefined,'2026-11').end-chronology('2026-06',undefined,undefined,'2026-11').start,6));
test('overlapping jobs use separate lanes, contiguous jobs reuse lanes',()=>{const roles=assignLanes([{id:'a',start:0,end:5},{id:'b',start:4,end:7},{id:'c',start:5,end:8}]);assert.deepEqual(roles.map(r=>r.lane),[0,1,0]);assert.equal(roles[1].start,4);});
test('invalid chronology is rejected',()=>{assert.throws(()=>chronology('2020-13','2021-01'));assert.throws(()=>chronology('2021-01','2020-01'));});

// Anonymous synthetic stress fixture, deliberately not published as content.
const dense=[
 {id:'long-a',from:'2015-01',to:'2019-12'},
 {id:'long-b',from:'2015-03',to:'2019-06'},
 {id:'contained',from:'2016-02',to:'2017-10'},
 {id:'one-month',from:'2017-04',to:'2017-04'},
 {id:'same-start',from:'2017-04',to:'2018-01'},
 {id:'adjacent',from:'2018-02',to:'2018-03'},
 {id:'same-end',from:'2017-09',to:'2018-03'},
 {id:'reuse',from:'2018-04',to:'2018-04'},
 {id:'handover',from:'2020-01',to:'2020-01'},
];
test('dense 2015–2019 overlaps use exactly the maximum concurrent row count',()=>{
 const jobs=dense.map(job=>({id:job.id,...chronology(job.from,job.to)}));
 const packed=assignLanes(jobs);
 const peak=Math.max(...jobs.map(job=>jobs.filter(other=>other.start<=job.start&&other.end>job.start).length));
 assert.equal(Math.max(...packed.map(job=>job.lane))+1,peak);
 for(const a of packed)for(const b of packed)if(a.id!==b.id&&a.lane===b.lane)assert(a.end<=b.start||b.end<=a.start);
 for(const job of packed){const original=jobs.find(other=>other.id===job.id);assert.equal(job.start,original.start);assert.equal(job.end,original.end);}
 assert.equal(packed.find(job=>job.id==='handover').lane,0);
});
test('inclusive same-month tenures overlap; next-month starts reuse a row',()=>{
 const jobs=[['a','2018-01','2018-04'],['b','2018-04','2018-04'],['c','2018-05','2018-05']].map(([id,start,end])=>({id,...chronology(start,end)}));
 const packed=assignLanes(jobs);assert.deepEqual(packed.map(job=>job.lane),[0,1,0]);
});
