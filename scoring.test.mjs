import {findParty} from "./catalog.mjs";
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
for(const [prov,names] of Object.entries(c))for(const n of names){assert.doesNotThrow(()=>findParty(n,d.parties),`${prov}/${n}: coincide con varios partidos`);}
const known=n=>findParty(n,d.parties);
assert.equal(known(c.NAVARRA.find(n=>n.includes('UPN'))),undefined,'UPN-PP no debe heredar al PP');
assert.equal(known(c.MADRID.find(n=>n.startsWith('PARTIDO POPULAR')))?.id,'pp');
assert(d.candidateSource.startsWith('https://'));
console.log('OK: extremos, ponderación, omisiones, cobertura, comparación común y catálogo de 52 circunscripciones.');

// Una posición no puntuable no puede entrar en la comparación común.
const review={...p(1),scoreable:false};
assert.equal(score({'1':5},{'1':2},{'1':review}).affinity,null);
assert.equal(score({'1':5},{'1':2},{'1':review}).excluded.length,1);
assert.deepEqual(sharedIds({'1':5},[]),[]);
assert.deepEqual(sharedIds({'1':5},[{positions:{'1':p(5)}}]),[]);
assert.deepEqual(sharedIds({'1':5},[{positions:{'1':p(5)}},{positions:{'1':review}}]),[]);
assert.deepEqual(sharedIds({'1':0,'2':6},[{positions:{'1':p(5),'2':p(5)}},{positions:{'1':p(5),'2':p(5)}}]),[]);
assert.deepEqual(sharedIds({'1':3},[{positions:{'1':p(5)}},{positions:{'1':{value:4}}}]),[]);
assert.equal(score({'1':3},{'1':2},{'1':{...p(3),source:'javascript:alert(1)'}}).affinity,null);
assert.throws(()=>score({'1':3},{'1':0},{'1':p(3)}),/Peso/);
assert.deepEqual(score({'1':5},{'1':3},{'1':p(5)}).bounds,{lower:100,upper:100});
assert.equal(score({'1':null},{},{'1':p(3)}).bounds,null);
// Verifica exhaustivamente los extremos: cada tema desconocido puede tomar 1–5.
for(let answer1=1;answer1<=5;answer1++)for(let answer2=1;answer2<=5;answer2++){
 const answers={'1':answer1,'2':answer2,'3':3}, weights={'1':1,'2':4,'3':2};
 const partial=score(answers,weights,{'1':p(4)});const possible=[];
 for(let x=1;x<=5;x++)for(let y=1;y<=5;y++)possible.push(score(answers,weights,{'1':p(4),'2':p(x),'3':p(y)}).affinity);
 assert(Math.abs(partial.bounds.lower-Math.min(...possible))<1e-9);
 assert(Math.abs(partial.bounds.upper-Math.max(...possible))<1e-9);
}
assert.equal(known(c['A CORUÑA'].find(n=>n.includes('BLOQUE')))?.id,'bng');
assert.equal(known(c['LAS PALMAS'].find(n=>n.toUpperCase().includes('MUNICIPALISTAS PRIMERO')))?.id,'cc');
assert.equal(known(c['SANTA CRUZ DE TENERIFE'].find(n=>n.toUpperCase().includes('MUNICIPALISTAS PRIMERO')))?.id,'cc');
for(const party of d.parties)for(const pos of Object.values(party.positions)){
 assert(pos.scoreable===undefined||typeof pos.scoreable==='boolean');
 if(pos.scoreable===false)assert(pos.reviewNote,'La exclusión debe explicar el motivo');
}
console.log('OK: exclusiones editoriales, comparación sin partidos, validación de posiciones, coaliciones y extremos de rangos.');

assert.throws(()=>findParty('PARTIDO POPULAR',[{match:'POPULAR'},{match:'PARTIDO'}]),/ambigua/);

assert.equal(known(c.BARCELONA.find(n=>n.includes('(ERC)')))?.id,'erc');
assert.equal(known(c.MADRID.find(n=>n.includes('(PACMA)')))?.id,'pacma');
for(const [prov,names] of Object.entries(c))for(const n of names)assert.doesNotThrow(()=>findParty(n,d.research||[]),`investigación ambigua ${prov}/${n}`);
for(const item of d.research||[]){
 assert(item.status&&item.note&&item.reviewed&&item.source.startsWith('https://'));
 assert(!item.positions,'El registro de investigación no debe puntuar');
}
assert.equal(findParty('PARTIT DELS SOCIALISTES DE CATALUNYA (PSC-PSOE) (PSC)',d.research).id,'psoe');
assert.equal(findParty('UNIDAD DEL PUEBLO CANARIO UPC (NC-BC, PODEMOS, IU, SUMAR)',d.research),undefined,'Una coalición no hereda el estado documental de Podemos');
assert.equal(nextParty('erc').positions['1'].source, 'https://esquerrarepublicana.cat/documents/e2026-programa.pdf');
assert(!('sourceNote' in nextParty('erc').positions['1']));
function nextParty(id){return d.parties.find(p=>p.id===id);}
console.log('OK: ERC, PACMA, procedencia de copias y registro de investigación sin puntuación.');
