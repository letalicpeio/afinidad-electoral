import {strict as assert} from 'node:assert';
import {score,sharedIds} from './scoring.mjs';
import fs from 'node:fs';
const p=v=>({value:v,source:'https://example.org',locator:'1'});
assert.equal(score({'1':5},{'1':3},{'1':p(5)}).affinity,100);
assert.equal(score({'1':1},{'1':3},{'1':p(5)}).affinity,0);
assert.equal(score({'1':1,'2':5},{'1':1,'2':3},{'1':p(5),'2':p(5)}).affinity,75);
assert.equal(score({'1':null},{},{'1':p(3)}).affinity,null);
assert.equal(score({'1':3,'2':2},{'1':1,'2':3},{'1':p(3)}).coverage,25);
assert.equal(score({'1':3},{'1':1},{}).affinity,null);
assert.deepEqual(sharedIds({'1':1,'2':null},[{positions:{'1':p(3)}},{positions:{'1':p(1)}}]),['1']);
const d=JSON.parse(fs.readFileSync(new URL('./data.json',import.meta.url))),c=JSON.parse(fs.readFileSync(new URL('./candidaturas.json',import.meta.url)));
assert.equal(d.questions.length,18);assert.equal(Object.keys(c).length,52);assert.equal(c.MADRID.length,14);assert(Object.values(c).every(x=>x.length>0));
for(const party of d.parties)for(const [id,pos] of Object.entries(party.positions)){assert(d.questions.some(q=>q.id===id));assert(pos.source.startsWith('https://'));assert(pos.locator);assert(pos.value>=1&&pos.value<=5);}
console.log('OK: extremos, ponderación, omisiones, cobertura, comparación común y catálogo de 52 circunscripciones.');
