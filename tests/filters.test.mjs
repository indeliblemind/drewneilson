import test from 'node:test';
import assert from 'node:assert/strict';
import {applyFilters,portfolioView} from '../src/lib/filters.ts';
const nodes=[
 {id:'job',kind:'job',topics:['Operations'],search:'Studio designer'},
 {id:'project',kind:'project',topics:['Participation'],search:'Café night walk prototype'},
 {id:'idea',kind:'idea',topics:['Participation'],search:'A useful invitation'},
 {id:'solo',kind:'project',topics:[],search:'Weather object'},
];
const context=[{child:'project',parent:'job'}];
const lens=(filters={})=>applyFilters(nodes,context,{query:'',kind:'all',topic:'all',...filters});
test('all subjects appear without filters',()=>assert.deepEqual([...lens().visible],nodes.map(n=>n.id)));
test('combined filters retain only direct matches and job context',()=>{
 const result=lens({query:'cafe night',kind:'project',topic:'Participation'});
 assert.deepEqual([...result.matches],['project']);
 assert.deepEqual([...result.visible],['project','job']);
 assert.deepEqual([...result.contextOnly],['job']);
});
test('topic matches do not expand to unrelated neighbors',()=>assert.deepEqual([...lens({topic:'Participation'}).visible],['project','idea','job']));
test('ideas lens does not show jobs without matching child context',()=>assert.deepEqual([...lens({kind:'idea'}).visible],['idea']));
test('standalone and untagged content can still be found',()=>assert.deepEqual([...lens({query:'weather'}).visible],['solo']));
test('no results does not leave contextual jobs behind',()=>assert.equal(lens({query:'nothingmatches'}).visible.size,0));
test('unknown context endpoints never become visible',()=>assert.deepEqual([...applyFilters(nodes,[{child:'project',parent:'missing'}],{query:'night',kind:'all',topic:'all'}).visible],['project']));

const edges=[{source:'project',target:'idea'},{source:'project',target:'job'}];
const focus=(id,filters={})=>portfolioView(nodes,context,edges,{query:'',kind:'all',topic:'all',...filters},id);
test('map selection focuses the résumé on the selected node and its neighbors',()=>assert.deepEqual([...focus('idea').focus].sort(),['idea','job','project']));
test('selecting another node replaces focus while keeping other nodes available',()=>{
 const result=focus('solo');assert.deepEqual([...result.focus],['solo']);assert.equal(result.visible.size,4);
});
test('clearing focus restores all subjects in the current lens',()=>assert.equal(focus(null).focus.size,4));
test('a kind lens that excludes selection clears focus',()=>{const result=focus('idea',{kind:'job'});assert.equal(result.selected,null);assert.deepEqual([...result.focus],['job']);});
test('focus does not pull hidden neighbors back through a topic lens',()=>assert.deepEqual([...focus('job',{topic:'Operations'}).focus],['job']));
