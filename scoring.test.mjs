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
// Validación estructural de data.json
const ids=d.questions.map(q=>q.id);
assert.equal(new Set(ids).size,ids.length,'ids de pregunta duplicados');
for(const q of d.questions){assert(q.topic&&q.text,'pregunta incompleta '+q.id);}
const matches=d.parties.map(x=>x.match);
assert.equal(new Set(d.parties.map(x=>x.id)).size,d.parties.length,'ids de partido duplicados');
for(const party of d.parties){
 assert(party.id&&party.name&&party.match,'partido incompleto');
 for(const [id,pos] of Object.entries(party.positions))for(const k of ['reason','reviewed','coding'])assert(pos[k],`${party.id}/${id}: falta ${k}`);
 for(const [id,pos] of Object.entries(party.positions))assert(Number.isInteger(pos.value),`${party.id}/${id}: value no entero`);
}
// Cada candidatura del BOE casa con como máximo un partido (patrón inequívoco)
for(const [prov,names] of Object.entries(c))for(const n of names){const hits=d.parties.filter(x=>n.toUpperCase().includes(x.match));assert(hits.length<=1,`${prov}/${n}: coincide con varios partidos`);}
assert(d.candidateSource.startsWith('https://'));
console.log('OK: extremos, ponderación, omisiones, cobertura, comparación común y catálogo de 52 circunscripciones.');
