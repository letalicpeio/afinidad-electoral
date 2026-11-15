import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const evidence = read('./evidence/gpt/pnv.json');
const party = read('./data.json').parties.find(p => p.id === 'pnv');
const sources = new Set(evidence.sources.map(s => s.id));
assert.equal(Object.keys(evidence.questions).length, 18);
let missing = 0, scored = 0;
for (const [id, q] of Object.entries(evidence.questions)) {
  if (q.status === 'sin-evidencia') {
    missing++;
    assert.equal(q.position, null, `${id}: ausencia con valor`);
    assert.deepEqual(q.sourceIds, [], `${id}: consulta presentada como respaldo`);
    assert.equal(q.locator, null, `${id}: ausencia con localizador de respaldo`);
    assert.equal(party.positions[id], undefined, `${id}: ausencia integrada al cálculo`);
    assert(q.consultedSources.length > 0, `${id}: se perdió la consulta previa`);
    for (const c of q.consultedSources) {
      assert(sources.has(c.sourceId), `${id}: referencia inexistente`);
      if (c.sourceId === 'pnv-s02') assert.equal(c.locator, null, `${id}: localizador de 2026 atribuido a 2023`);
    }
  } else if (q.status === 'documentada') {
    scored++;
    const p = party.positions[id];
    assert(p && p.scoreable !== false, `${id}: documentada sin integración puntuable`);
    assert.equal(p.value, q.position, `${id}: valor divergente`);
    assert(q.sourceIds.some(s => evidence.sources.find(x => x.id === s)?.url === p.source), `${id}: fuente divergente`);
  } else {
    assert.equal(q.position, null);
    assert(!party.positions[id] || party.positions[id].scoreable === false, `${id}: caso en revisión puntuable`);
  }
}
assert.equal(missing, 10);
assert.equal(scored, 5);
console.log('OK: PNV, consultas separadas de respaldo y 18 decisiones coherentes con el cálculo.');
