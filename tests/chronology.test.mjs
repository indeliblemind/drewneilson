import test from 'node:test';
import assert from 'node:assert/strict';
import {chronology,assignLanes} from '../src/lib/chronology.ts';
test('year-only example ranges retain their precision and include their end year',()=>{const date=chronology(undefined,undefined,'2022–2025 (example)');assert.equal(date.end-date.start,48);assert.equal(date.precision,'year');});
test('missing dates remain undated, not invented',()=>assert.equal(chronology(undefined,undefined,'Your role'),null));
test('month ranges use inclusive ending months',()=>assert.equal(chronology('2019-03','2019-09').end-chronology('2019-03','2019-09').start,7));
test('present uses the explicitly supplied as-of month',()=>assert.equal(chronology('2026-06',undefined,undefined,'2026-11').end-chronology('2026-06',undefined,undefined,'2026-11').start,6));
test('overlapping jobs use separate lanes, contiguous jobs reuse lanes',()=>{const roles=assignLanes([{id:'a',start:0,end:5},{id:'b',start:4,end:7},{id:'c',start:5,end:8}]);assert.deepEqual(roles.map(r=>r.lane),[0,1,0]);assert.equal(roles[1].start,4);});
test('invalid chronology is rejected',()=>{assert.throws(()=>chronology('2020-13','2021-01'));assert.throws(()=>chronology('2021-01','2020-01'));});
