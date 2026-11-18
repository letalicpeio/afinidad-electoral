// Gráficos orientativos: mapa de dos ejes y radar por bloques temáticos.
// Son resúmenes visuales de las 18 afirmaciones (1–5); no son puntuaciones publicadas por los partidos.

export const GROUPS = [
  { name: "Vivienda", qs: [2] },
  { name: "Energía y clima", qs: [9] },
  { name: "Trabajo y rentas", qs: [8, 10, 18] },
  { name: "Exterior y defensa", qs: [12, 13] },
  { name: "Fiscalidad", qs: [1] },
  { name: "Servicios públicos", qs: [4, 6] },
  { name: "Identidad y territorio", qs: [7, 14] },
  { name: "Derechos y libertades", qs: [5, 11, 15, 16] },
  { name: "Inmigración", qs: [3, 17] },
];

// Signo: +1 si estar de acuerdo con la afirmación desplaza hacia la derecha / el polo conservador.
export const ECONOMIC = { 1: 1, 2: -1, 4: 1, 6: 1, 8: -1, 10: -1, 18: 1 };
export const SOCIAL = { 3: -1, 5: 1, 11: -1, 13: 1, 14: -1, 15: -1, 17: -1 };
export const MIN_AXIS_QUESTIONS = 3;

export const PARTY_COLORS = {
  pp: "#1f6fd1", vox: "#5fae2e", psoe: "#e03a3a", podemos: "#7b3fa8", "frente-amplio": "#d93f87",
  comuns: "#e8782a", erc: "#f2b705", junts: "#14a3a3", ehbildu: "#9bbd1c", pnv: "#2a8a4a", bng: "#4ea5d9",
  cc: "#c4a000", compromis: "#e6892f", adelante: "#2f9e6e", geroabai: "#b5532f", pcte: "#8c1d2c", fo: "#a23b3b",
  fejons: "#6b4a2b", pacma: "#6db33f", mj: "#8a6bbf", salf: "#ff7a45", humanista: "#f08a5d", iustitia: "#4c5d9a", d21: "#7a8b99",
};
export const PARTY_SHORT = {
  pp: "PP", vox: "VOX", psoe: "PSOE", podemos: "Podemos", "frente-amplio": "F. Amplio", comuns: "Comuns", erc: "ERC", junts: "Junts",
  ehbildu: "EH Bildu", pnv: "PNV", bng: "BNG", cc: "CC", compromis: "Compromís", adelante: "Adelante", geroabai: "Geroa Bai", pcte: "PCTE",
  fo: "F. Obrero", fejons: "FE-JONS", pacma: "PACMA", mj: "Mundo Justo", salf: "SALF", humanista: "Humanista", iustitia: "Iustitia", d21: "D21",
};
export const colorOf = (id) => PARTY_COLORS[id] || "#6c7a73";
export const shortOf = (id, name) => PARTY_SHORT[id] || name;

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

/** values: {id: 1..5}. Devuelve la media por bloque (null si no hay datos). */
export function groupMeans(values) {
  return GROUPS.map((g) => {
    const v = g.qs.map((q) => values[q]).filter(Number.isInteger);
    return { name: g.name, value: mean(v), n: v.length };
  });
}

function axis(values, signs) {
  const v = [];
  for (const [q, s] of Object.entries(signs)) {
    const x = values[q];
    if (Number.isInteger(x)) v.push(((x - 3) / 2) * s);
  }
  return v.length >= MIN_AXIS_QUESTIONS ? { value: mean(v), n: v.length } : null;
}

/** Coordenadas en [-1, 1]: x = económico (izquierda − / derecha +), y = social (progresista − / conservador +). */
export function compassPoint(values) {
  const x = axis(values, ECONOMIC), y = axis(values, SOCIAL);
  return x && y ? { x: x.value, y: y.value, n: x.n + y.n } : null;
}

const NS = "http://www.w3.org/2000/svg";
function s(tag, attrs = {}, text) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (text != null) e.textContent = text;
  return e;
}

/** points: [{id, label, color, x, y, you?, top?}] */
export function compassSvg(points, { lineTo } = {}) {
  const W = 360, H = 360, P = 34, inner = W - 2 * P;
  const reach = Math.max(0.5, ...points.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y)))) * 1.12;
  const k = Math.min(1, reach);
  const px = (x) => P + ((x / k + 1) / 2) * inner;
  const py = (y) => P + ((1 - y / k) / 2) * (H - 2 * P);
  const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", class: "chart compass",
    "aria-label": "Mapa orientativo con tu posición y la de las candidaturas según ejes económico y social" });
  svg.append(s("rect", { x: P, y: P, width: inner, height: H - 2 * P, class: "plot", rx: 10 }));
  for (const t of [-0.5 * k, 0, 0.5 * k]) {
    svg.append(s("line", { x1: px(t), y1: P, x2: px(t), y2: H - P, class: t === 0 ? "axis" : "grid" }));
    svg.append(s("line", { x1: P, y1: py(t), x2: W - P, y2: py(t), class: t === 0 ? "axis" : "grid" }));
  }
  svg.append(s("text", { x: W / 2, y: 16, class: "axlabel", "text-anchor": "middle" }, "CONSERVADOR"));
  svg.append(s("text", { x: W / 2, y: H - 8, class: "axlabel", "text-anchor": "middle" }, "PROGRESISTA"));
  svg.append(s("text", { x: P + 4, y: H / 2 - 6, class: "axlabel" }, "IZQUIERDA"));
  svg.append(s("text", { x: W - P - 4, y: H / 2 - 6, class: "axlabel", "text-anchor": "end" }, "DERECHA"));
  const you = points.find((p) => p.you), target = lineTo && points.find((p) => p.id === lineTo);
  if (you && target) svg.append(s("line", { x1: px(you.x), y1: py(you.y), x2: px(target.x), y2: py(target.y), class: "link" }));
  const placed = you ? [{ x: px(you.x) + 28, y: py(you.y) + 4 }] : [];
  for (const p of points.filter((p) => !p.you)) {
    const g = s("g");
    g.append(s("title", {}, p.label));
    g.append(s("circle", { cx: px(p.x), cy: py(p.y), r: p.top ? 7 : 5.5, fill: p.color, class: "dot" }));
    if (p.top) {
      let lx = px(p.x), ly = py(p.y) - 11;
      for (let i = 0; i < 8 && placed.some((q) => Math.abs(q.x - lx) < 46 && Math.abs(q.y - ly) < 12); i++)
        ly += (i % 2 ? -1 : 1) * 13 * Math.ceil((i + 1) / 2);
      placed.push({ x: lx, y: ly });
      g.append(s("text", { x: lx, y: ly, class: "dotlabel", "text-anchor": "middle" }, p.label));
    }
    svg.append(g);
  }
  if (you) {
    const g = s("g");
    g.append(s("title", {}, "Tú"));
    g.append(s("circle", { cx: px(you.x), cy: py(you.y), r: 8, class: "you" }));
    g.append(s("text", { x: px(you.x) + 12, y: py(you.y) + 4, class: "youlabel" }, "Tú"));
    svg.append(g);
  }
  return svg;
}

/** series: [{label, color, values:[1..5|null] por GROUPS, dashed?}] */
export function radarSvg(series) {
  const W = 360, H = 340, cx = W / 2, cy = 170, R = 112, n = GROUPS.length;
  const ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i, v) => [cx + Math.cos(ang(i)) * R * ((v - 1) / 4), cy + Math.sin(ang(i)) * R * ((v - 1) / 4)];
  const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", class: "chart radar",
    "aria-label": "Radar de acuerdo con las afirmaciones por bloque temático" });
  for (let r = 1; r <= 4; r++)
    svg.append(s("polygon", { points: GROUPS.map((_, i) => pt(i, 1 + r).join(",")).join(" "), class: "ring" }));
  GROUPS.forEach((g, i) => {
    const [x, y] = pt(i, 5);
    svg.append(s("line", { x1: cx, y1: cy, x2: x, y2: y, class: "spoke" }));
    const lx = cx + Math.cos(ang(i)) * (R + 16), ly = cy + Math.sin(ang(i)) * (R + 16);
    const anchor = Math.abs(Math.cos(ang(i))) < 0.2 ? "middle" : Math.cos(ang(i)) > 0 ? "start" : "end";
    const words = g.name.split(" ");
    const t = s("text", { x: lx, y: ly + (Math.sin(ang(i)) > 0.5 ? 8 : Math.sin(ang(i)) < -0.5 ? -2 : 3), class: "spokelabel", "text-anchor": anchor });
    words.length > 2 || g.name.length > 14
      ? (t.append(s("tspan", { x: lx, dy: "0" }, words.slice(0, Math.ceil(words.length / 2)).join(" ")),
         s("tspan", { x: lx, dy: "1.1em" }, words.slice(Math.ceil(words.length / 2)).join(" "))))
      : (t.textContent = g.name);
    svg.append(t);
  });
  for (const se of series) {
    const idx = se.values.map((v, i) => (v == null ? null : i)).filter((i) => i !== null);
    if (idx.length >= 3)
      svg.append(s("polygon", { points: idx.map((i) => pt(i, se.values[i]).join(",")).join(" "), style: `fill:${se.color};fill-opacity:.16;stroke:${se.color};stroke-width:2.2;stroke-dasharray:${se.dashed ? "5 3" : "0"}`, class: "area" }));
    for (const i of idx) svg.append(s("circle", { cx: pt(i, se.values[i])[0], cy: pt(i, se.values[i])[1], r: 3.6, style: `fill:${se.color}`, class: "vertex" }));
  }
  return svg;
}
