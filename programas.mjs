import { isScorablePosition } from "./scoring.mjs";

// Selector y comparador de programas electorales. Solo lee datos; no toca la encuesta.
export const SCALE = [
  "Totalmente en desacuerdo",
  "Más bien en desacuerdo",
  "Posición intermedia",
  "Más bien de acuerdo",
  "Totalmente de acuerdo",
];
export const STATUS_ORDER = [
  "oficial",
  "resumen",
  "copia",
  "secundaria",
  "no-localizado",
  "sin-revisar",
];

const $ = (selector) => document.querySelector(selector);
const el = (tag, text, cls) => {
  const node = document.createElement(tag);
  if (text != null) node.textContent = text;
  if (cls) node.className = cls;
  return node;
};
const upper = (text) => text.toLocaleUpperCase("es");
const host = (url) => new URL(url).hostname.replace(/^www\./, "");

export function provincesOf(entry, candidates) {
  const names = new Set(entry.names.map(upper));
  return Object.entries(candidates)
    .filter(([, list]) => list.some((name) => names.has(upper(name))))
    .map(([province]) => province)
    .sort((a, b) => a.localeCompare(b, "es"));
}

export function groupedEntries(entries) {
  return STATUS_ORDER.map((status) => ({
    status,
    entries: entries
      .filter((entry) => entry.program.status === status)
      .sort((a, b) => a.name.localeCompare(b.name, "es")),
  })).filter((group) => group.entries.length);
}

// Comparación de dos posiciones puntuables; cualquier otro caso no es comparable.
export function compare(a, b) {
  if (!isScorablePosition(a) || !isScorablePosition(b)) return null;
  const gap = Math.abs(a.value - b.value);
  return gap === 0 ? "Coinciden" : gap === 1 ? "Próximas" : "Distintas";
}

function link(url, text, cls) {
  const a = el("a", text, cls);
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
}

function card(entry, labels, candidates) {
  const box = el("article", null, "programcard");
  const head = el("div", null, "programhead");
  head.append(el("h3", entry.name));
  if (entry.short && entry.short !== entry.name)
    head.append(el("span", entry.short, "small"));
  box.append(head);
  box.append(
    el(
      "span",
      labels[entry.program.status],
      `badge status-${entry.program.status}`,
    ),
  );
  const { program } = entry;
  if (program.detail) box.append(el("p", program.detail, "small"));
  if (program.note) box.append(el("p", program.note, "small"));
  if (entry.note) box.append(el("p", entry.note, "small"));
  const actions = el("div", null, "programactions");
  if (program.url) {
    actions.append(
      link(
        program.url,
        `${program.title || "Abrir programa"} ↗`,
        "primary linkbutton",
      ),
    );
    box.append(actions);
    box.append(
      el(
        "p",
        `Dirección del documento: ${host(program.url)}${program.official ? "" : " (no es el dominio del partido)"}. Comprueba que coincide con la web del partido.`,
        "small",
      ),
    );
  }
  if (program.fullDocument) {
    actions.append(
      link(
        program.fullDocument.url,
        `${program.fullDocument.title} ↗`,
        "quiet linkbutton",
      ),
    );
    if (program.fullDocument.note)
      box.append(el("p", program.fullDocument.note, "small"));
  }
  if (program.consulted)
    actions.append(
      link(program.consulted, "Dónde se consultó ↗", "quiet linkbutton"),
    );
  if (entry.website)
    actions.append(link(entry.website, "Web oficial ↗", "quiet linkbutton"));
  if (!program.url && !program.consulted && !entry.website)
    box.append(
      el(
        "p",
        "Sin web oficial verificada en esta aplicación. Consulta la candidatura en el BOE.",
        "small",
      ),
    );
  if (actions.childNodes.length && !actions.parentNode) box.append(actions);
  const provinces = provincesOf(entry, candidates);
  const details = el("details");
  details.append(
    el(
      "summary",
      `Se presenta en ${provinces.length} ${provinces.length === 1 ? "circunscripción" : "circunscripciones"}`,
    ),
    el("p", provinces.join(" · "), "small"),
  );
  box.append(details);
  return box;
}

function cell(entry, dataParty, id) {
  const td = el("td");
  const position = dataParty?.positions[id];
  if (isScorablePosition(position)) {
    td.append(
      el(
        "span",
        "●".repeat(position.value) + "○".repeat(5 - position.value),
        "dots",
      ),
      el("b", ` ${position.value}/5`),
      el("div", SCALE[position.value - 1], "small"),
      link(position.source, `${position.locator} ↗`, "small"),
    );
    td.dataset.value = position.value;
  } else if (position) {
    td.append(
      el("span", "En revisión, no puntúa", "badge"),
      el("div", position.reviewNote || "Evidencia contextual.", "small"),
      link(position.source, `${position.locator} ↗`, "small"),
    );
  } else {
    td.append(
      el(
        "span",
        entry.dataId ? "Sin evidencia revisada" : "Sin revisar",
        "small muted",
      ),
    );
  }
  return td;
}

export function renderCompare(target, questions, left, right, data, onlyData) {
  target.replaceChildren();
  const parties = [left, right].filter(Boolean);
  const dataOf = (entry) => data.parties.find((p) => p.id === entry.dataId);
  const table = el("table", null, "cmp");
  const caption = el(
    "caption",
    `Posiciones sobre ${questions.length} temas: ${parties.map((p) => p.name).join(" frente a ")}`,
  );
  const header = el("tr");
  header.append(el("th", "Tema y afirmación"));
  parties.forEach((p) => header.append(el("th", p.name)));
  if (right) header.append(el("th", "Comparación"));
  header.querySelectorAll("th").forEach((th) => (th.scope = "col"));
  const thead = el("thead");
  thead.append(header);
  const tbody = el("tbody");
  let shown = 0,
    comparable = 0,
    same = 0;
  for (const question of questions) {
    const pos = parties.map((p) => dataOf(p)?.positions[question.id]);
    if (onlyData && !pos.some(Boolean)) continue;
    shown++;
    const row = el("tr");
    const th = el("th", null, "topiccell");
    th.scope = "row";
    th.append(el("b", question.topic), el("div", question.text, "small"));
    row.append(th);
    parties.forEach((p) => row.append(cell(p, dataOf(p), question.id)));
    if (right) {
      const verdict = compare(pos[0], pos[1]);
      if (verdict) comparable++;
      if (verdict === "Coinciden") same++;
      row.append(
        el(
          "td",
          verdict || "No comparable",
          verdict ? "verdict" : "small muted",
        ),
      );
    }
    tbody.append(row);
  }
  table.append(caption, thead, tbody);
  const summary = el(
    "p",
    right
      ? `${comparable} de ${questions.length} temas comparables con posición puntuable en ambos; coinciden ${same}. Es un recuento, no un porcentaje de afinidad entre partidos.`
      : `${shown} de ${questions.length} temas mostrados.`,
    "small",
  );
  target.append(summary, table);
}

async function init() {
  const section = $("#programs");
  if (!section) return;
  try {
    const [data, candidates, catalog] = await Promise.all(
      ["data.json", "candidaturas.json", "programas.json"].map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw Error(url);
        return response.json();
      }),
    );
    const selectA = $("#programA"),
      selectB = $("#programB"),
      only = $("#programOnlyData");
    const byId = Object.fromEntries(catalog.parties.map((p) => [p.id, p]));
    const fill = (select, withNone) => {
      if (withNone) select.add(new Option("— Sin comparar —", ""));
      else select.add(new Option("Elige un partido…", ""));
      for (const group of groupedEntries(catalog.parties)) {
        const optgroup = document.createElement("optgroup");
        optgroup.label = `${catalog.statusLabels[group.status]} (${group.entries.length})`;
        for (const entry of group.entries)
          optgroup.append(new Option(entry.name, entry.id));
        select.append(optgroup);
      }
    };
    fill(selectA, false);
    fill(selectB, true);
    const draw = () => {
      const left = byId[selectA.value],
        right = byId[selectB.value];
      const cards = $("#programCards"),
        compareBox = $("#programCompare");
      cards.replaceChildren();
      compareBox.replaceChildren();
      $("#programOptions").hidden = !left;
      if (!left) return;
      for (const entry of [left, right].filter(Boolean))
        cards.append(card(entry, catalog.statusLabels, candidates));
      renderCompare(
        compareBox,
        data.questions,
        left,
        right,
        data,
        only.checked,
      );
      const ids = [left.id, right?.id].filter(Boolean).join(",");
      try {
        history.replaceState(null, "", `#programas=${ids}`);
      } catch {}
    };
    selectA.onchange = selectB.onchange = only.onchange = draw;
    const [a, b] = (location.hash.match(/^#programas=([^&]+)/)?.[1] || "")
      .split(",")
      .map((id) => (byId[id] ? id : ""));
    if (a) {
      selectA.value = a;
      selectB.value = b || "";
      draw();
    }
  } catch {
    $("#programCards").textContent =
      "No se pudieron cargar los programas. Recarga la página para intentarlo de nuevo.";
  }
}
if (typeof document !== "undefined") init();
