import assert from "node:assert/strict";
import { GROUPS, groupMeans, compassPoint, ECONOMIC, SOCIAL } from "./charts.mjs";
const all = (v) => Object.fromEntries(Array.from({ length: 18 }, (_, i) => [i + 1, v]));
// Todo "totalmente de acuerdo": los signos se compensan parcialmente; los valores quedan en [-1, 1].
for (const v of [1, 3, 5]) {
  const c = compassPoint(all(v));
  assert.ok(c && Math.abs(c.x) <= 1 && Math.abs(c.y) <= 1);
}
assert.deepEqual(compassPoint(all(3)), { x: 0, y: 0, n: Object.keys(ECONOMIC).length + Object.keys(SOCIAL).length });
// Un eje necesita al menos dos preguntas.
assert.equal(compassPoint({ 1: 5, 3: 5, 5: 5 }), null);
// Una respuesta económica a favor de la derecha y social conservadora ubica arriba a la derecha.
const right = compassPoint({ 1: 5, 4: 5, 6: 5, 5: 5, 3: 1, 11: 1 });
assert.ok(right.x > 0 && right.y > 0);
// Cada pregunta pertenece exactamente a un bloque del radar.
const qs = GROUPS.flatMap((g) => g.qs).sort((a, b) => a - b);
assert.deepEqual(qs, Array.from({ length: 18 }, (_, i) => i + 1));
assert.equal(groupMeans({ 8: 1, 10: 5 }).find((g) => g.name === "Trabajo y rentas").value, 3);
console.log("charts ok");
