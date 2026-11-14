import { strict as assert } from "node:assert";
import fs from "node:fs";
import { findParty } from "./catalog.mjs";
import {
  compare,
  groupedEntries,
  provincesOf,
  STATUS_ORDER,
} from "./programas.mjs";

const read = (name) =>
  JSON.parse(fs.readFileSync(new URL(`./${name}`, import.meta.url), "utf8"));
const catalog = read("programas.json");
const data = read("data.json");
const candidates = read("candidaturas.json");
const upper = (text) => text.toLocaleUpperCase("es");

// Identificadores únicos y estados conocidos.
const ids = catalog.parties.map((p) => p.id);
assert.equal(new Set(ids).size, ids.length, "ids duplicados en programas.json");
for (const p of catalog.parties) {
  assert(
    p.name && Array.isArray(p.names) && p.names.length,
    `${p.id}: incompleto`,
  );
  assert(
    STATUS_ORDER.includes(p.program.status),
    `${p.id}: estado desconocido`,
  );
  assert(catalog.statusLabels[p.program.status], `${p.id}: sin etiqueta`);
}

// Cada denominación del BOE pertenece a exactamente una entidad, y viceversa.
const owner = new Map();
for (const p of catalog.parties)
  for (const name of p.names) {
    const key = upper(name);
    assert(!owner.has(key), `denominación repetida: ${name}`);
    owner.set(key, p.id);
  }
for (const [province, names] of Object.entries(candidates))
  for (const name of names)
    assert(
      owner.has(upper(name)),
      `${province}: «${name}» sin entidad en programas.json`,
    );
const boe = new Set(Object.values(candidates).flat().map(upper));
for (const key of owner.keys())
  assert(boe.has(key), `denominación inexistente en el BOE: ${key}`);

// Enlaces: https, y «oficial» solo si el dominio es el de la web del partido.
const hostOf = (url) => new URL(url).hostname.replace(/^www\./, "");
for (const p of catalog.parties) {
  if (p.program.fullDocument) {
    const doc = p.program.fullDocument;
    assert.equal(
      new URL(doc.url).protocol,
      "https:",
      `${p.id}: documento no https`,
    );
    assert(
      doc.title && typeof doc.verified === "boolean",
      `${p.id}: documento incompleto`,
    );
    assert(
      p.website && hostOf(doc.url).endsWith(hostOf(p.website)),
      `${p.id}: el documento no es del dominio del partido`,
    );
    if (!doc.verified)
      assert(doc.note, `${p.id}: documento sin verificar requiere nota`);
  }
  for (const url of [p.website, p.program.url, p.program.consulted].filter(
    Boolean,
  ))
    assert.equal(new URL(url).protocol, "https:", `${p.id}: enlace no https`);
  if (p.program.url) {
    assert(p.program.title, `${p.id}: falta título del documento`);
    assert(p.website, `${p.id}: falta web oficial para contrastar el dominio`);
    const sameHost =
      hostOf(p.program.url) === hostOf(p.website) ||
      hostOf(p.program.url).endsWith(`.${hostOf(p.website)}`);
    assert.equal(
      p.program.official,
      sameHost,
      `${p.id}: «official» no coincide con el dominio`,
    );
  }
  if (p.program.status === "oficial" || p.program.status === "resumen")
    assert(
      p.program.url && p.program.official,
      `${p.id}: estado oficial sin documento oficial`,
    );
  if (p.program.status === "copia") assert.equal(p.program.official, false);
}

// El programa enlazado debe ser una de las fuentes que usan las posiciones codificadas.
for (const p of catalog.parties.filter((x) => x.dataId)) {
  const party = data.parties.find((x) => x.id === p.dataId);
  assert(party, `${p.id}: dataId inexistente`);
  assert(
    p.program.url,
    `${p.id}: tiene posiciones pero no enlace a su programa`,
  );
  const sources = new Set(Object.values(party.positions).map((x) => x.source));
  assert(
    sources.has(p.program.url),
    `${p.id}: el enlace del programa no figura entre las fuentes de data.json`,
  );
}
// Y toda formación de data.json aparece en el catálogo.
for (const party of data.parties)
  assert(
    catalog.parties.some((p) => p.dataId === party.id),
    `${party.id} no está en programas.json`,
  );

// Utilidades de la interfaz.
const pp = catalog.parties.find((p) => p.id === "pp");
assert.equal(provincesOf(pp, candidates).length, 51);
const upn = catalog.parties.find((p) => p.id === "upn-pp");
assert.deepEqual(
  provincesOf(upn, candidates),
  ["NAVARRA"],
  "UPN-PP no se confunde con el PP",
);
assert(!provincesOf(pp, candidates).includes("NAVARRA"));
const groups = groupedEntries(catalog.parties);
assert.deepEqual(
  groups.map((g) => g.status),
  STATUS_ORDER.filter((s) =>
    catalog.parties.some((p) => p.program.status === s),
  ),
);
for (const g of groups)
  assert.deepEqual(
    g.entries.map((e) => e.name),
    [...g.entries.map((e) => e.name)].sort((a, b) => a.localeCompare(b, "es")),
  );
const pos = (value) => ({ value, source: "https://example.org", locator: "1" });
assert.equal(compare(pos(5), pos(5)), "Coinciden");
assert.equal(compare(pos(4), pos(5)), "Próximas");
assert.equal(compare(pos(1), pos(5)), "Distintas");
assert.equal(compare(pos(1), { ...pos(5), scoreable: false }), null);
assert.equal(compare(pos(1), undefined), null);

// Una coalición nunca hereda las posiciones de uno de sus miembros (p. ej. EH Bildu–ERC no es ERC).
for (const catalogEntry of catalog.parties.filter((p) =>
  p.note?.startsWith("Coalición:"),
)) {
  for (const name of catalogEntry.names)
    assert.equal(
      findParty(name, data.parties),
      undefined,
      `«${name}» hereda posiciones de un partido miembro`,
    );
}

console.log(
  `OK: ${catalog.parties.length} entidades, ${owner.size} denominaciones del BOE, enlaces y comparación.`,
);
