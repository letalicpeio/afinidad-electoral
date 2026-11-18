// Imagen para compartir (canvas, 100 % en el navegador): no se envía nada a ningún servidor.
import { GROUPS } from "./charts.mjs";

const W = 1080, H = 1350;
const INK = "#17181c", MUTED = "#5d6068", LINE = "#e4e0d7", ACCENT = "#27366b", PAPER = "#f7f5f0", CARD = "#ffffff";
const SERIF = '"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif';
const SANS = 'system-ui,-apple-system,"Segoe UI",Roboto,sans-serif';

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function text(ctx, s, x, y, font, color, align = "left", maxW) {
  ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = "alphabetic";
  maxW ? ctx.fillText(s, x, y, maxW) : ctx.fillText(s, x, y);
}

function drawCompass(ctx, x, y, size, pts, you) {
  const P = 34, inner = size - 2 * P;
  const reach = Math.max(0.5, ...pts.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))), you ? Math.max(Math.abs(you.x), Math.abs(you.y)) : 0) * 1.12;
  const k = Math.min(1, reach);
  const px = (v) => x + P + ((v / k + 1) / 2) * inner;
  const py = (v) => y + P + ((1 - v / k) / 2) * inner;
  rr(ctx, x + P, y + P, inner, inner, 18); ctx.fillStyle = "#faf8f3"; ctx.fill(); ctx.strokeStyle = LINE; ctx.lineWidth = 2; ctx.stroke();
  ctx.save(); rr(ctx, x + P, y + P, inner, inner, 18); ctx.clip();
  ctx.strokeStyle = "#e8e4da"; ctx.setLineDash([6, 8]); ctx.lineWidth = 1.5;
  for (const t of [-0.5 * k, 0.5 * k]) {
    ctx.beginPath(); ctx.moveTo(px(t), y + P); ctx.lineTo(px(t), y + P + inner); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + P, py(t)); ctx.lineTo(x + P + inner, py(t)); ctx.stroke();
  }
  ctx.setLineDash([]); ctx.strokeStyle = "#a8a79f"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(px(0), y + P); ctx.lineTo(px(0), y + P + inner); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + P, py(0)); ctx.lineTo(x + P + inner, py(0)); ctx.stroke();
  ctx.restore();
  const lab = "700 15px " + SANS;
  text(ctx, "CONSERVADOR", x + size / 2, y + 22, lab, MUTED, "center");
  text(ctx, "PROGRESISTA", x + size / 2, y + size - 8, lab, MUTED, "center");
  text(ctx, "IZQUIERDA", x + P + 12, y + size / 2 - 10, lab, MUTED);
  text(ctx, "DERECHA", x + size - P - 12, y + size / 2 - 10, lab, MUTED, "right");
  if (you && pts[0]) {
    const top = pts.find((p) => p.top);
    if (top) { ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(px(you.x), py(you.y)); ctx.lineTo(px(top.x), py(top.y)); ctx.stroke(); }
  }
  const placed = you ? [{ x: px(you.x) + 50, y: py(you.y) + 8 }] : [];
  for (const p of pts) {
    ctx.beginPath(); ctx.arc(px(p.x), py(p.y), p.top ? 13 : 9, 0, 7); ctx.fillStyle = p.color; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = "#fff"; ctx.stroke();
  }
  for (const p of pts.filter((p) => p.top)) {
    let lx = px(p.x), ly = py(p.y) - 20;
    for (let i = 0; i < 10 && placed.some((q) => Math.abs(q.x - lx) < 90 && Math.abs(q.y - ly) < 22); i++) ly += (i % 2 ? -1 : 1) * 23 * Math.ceil((i + 1) / 2);
    placed.push({ x: lx, y: ly });
    ctx.lineWidth = 5; ctx.strokeStyle = "#faf8f3"; ctx.lineJoin = "round"; ctx.font = "700 19px " + SANS; ctx.textAlign = "center";
    ctx.strokeText(p.label, lx, ly); ctx.fillStyle = INK; ctx.fillText(p.label, lx, ly);
  }
  if (you) {
    ctx.beginPath(); ctx.arc(px(you.x), py(you.y), 14, 0, 7); ctx.fillStyle = INK; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = "#fff"; ctx.stroke();
    ctx.lineWidth = 5; ctx.strokeStyle = "#faf8f3"; ctx.font = "800 22px " + SANS; ctx.textAlign = "left";
    ctx.strokeText("Tú", px(you.x) + 22, py(you.y) + 8); ctx.fillStyle = INK; ctx.fillText("Tú", px(you.x) + 22, py(you.y) + 8);
  }
}

function drawRadar(ctx, cx, cy, R, youVals, other) {
  const n = GROUPS.length, ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i, v) => [cx + Math.cos(ang(i)) * R * ((v - 1) / 4), cy + Math.sin(ang(i)) * R * ((v - 1) / 4)];
  ctx.lineWidth = 1.5; ctx.strokeStyle = LINE;
  for (let r = 2; r <= 5; r++) { ctx.beginPath(); GROUPS.forEach((_, i) => { const [x, y] = pt(i, r); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.stroke(); }
  GROUPS.forEach((g, i) => {
    const [x, y] = pt(i, 5); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
    const lx = cx + Math.cos(ang(i)) * (R + 18), ly = cy + Math.sin(ang(i)) * (R + 18);
    const c = Math.cos(ang(i)), a = Math.abs(c) < 0.2 ? "center" : c > 0 ? "left" : "right";
    const words = g.name.split(" "), mid = Math.ceil(words.length / 2);
    const lines = g.name.length > 14 ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")] : [g.name];
    lines.forEach((t, j) => text(ctx, t, lx, ly + 5 + j * 18 + (Math.sin(ang(i)) > 0.5 ? 10 : Math.sin(ang(i)) < -0.5 ? -8 - (lines.length - 1) * 18 : 0), "600 16px " + SANS, MUTED, a));
  });
  const poly = (vals, color, alpha) => {
    const idx = vals.map((v, i) => (v == null ? null : i)).filter((i) => i !== null);
    if (idx.length < 3) return;
    ctx.beginPath(); idx.forEach((i, j) => { const [x, y] = pt(i, vals[i]); j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath();
    ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.fill(); ctx.globalAlpha = 1; ctx.lineWidth = 3.5; ctx.strokeStyle = color; ctx.stroke();
    for (const i of idx) { const [x, y] = pt(i, vals[i]); ctx.beginPath(); ctx.arc(x, y, 5.5, 0, 7); ctx.fillStyle = color; ctx.fill(); }
  };
  if (other) poly(other.values, other.color, 0.16);
  poly(youVals, INK, 0.1);
}

/** opts: {province, top:[{label,color,affinity,coverage}], pts, you, radar:{you:[], other:{values,color,label}}, date} */
export async function makeShareImage(opts) {
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.85, -80, 20, W * 0.85, -80, 700); glow.addColorStop(0, "#e9ecf7"); glow.addColorStop(1, "rgba(247,245,240,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, 700);
  // cabecera
  rr(ctx, 64, 64, 56, 56, 14); ctx.fillStyle = ACCENT; ctx.fill();
  text(ctx, "a.", 92, 104, `italic 700 34px ${SERIF}`, "#f1d9a0", "center");
  text(ctx, "afinidad", 136, 104, `700 38px ${SERIF}`, INK);
  text(ctx, "CONGRESO · 29 NOV 2026", W - 64, 100, "700 18px " + SANS, MUTED, "right");
  text(ctx, "Mi mapa de coincidencias", 64, 212, `600 64px ${SERIF}`, INK);
  text(ctx, `${opts.province} · comparación parcial con las candidaturas analizadas`, 64, 256, "400 24px " + SANS, MUTED);
  // tarjetas
  const cardY = 300, cardH = 470;
  rr(ctx, 48, cardY, 484, cardH, 24); ctx.fillStyle = CARD; ctx.fill(); ctx.strokeStyle = LINE; ctx.lineWidth = 2; ctx.stroke();
  rr(ctx, 548, cardY, 484, cardH, 24); ctx.fillStyle = CARD; ctx.fill(); ctx.stroke();
  text(ctx, "MAPA ECONÓMICO Y SOCIAL", 76, cardY + 40, "700 16px " + SANS, ACCENT);
  text(ctx, "RADAR POR BLOQUES", 576, cardY + 40, "700 16px " + SANS, ACCENT);
  if (opts.you) drawCompass(ctx, 58, cardY + 50, 464, opts.pts, opts.you);
  else text(ctx, "Faltan respuestas para el mapa", 290, cardY + 250, "400 22px " + SANS, MUTED, "center");
  if (opts.radar) {
    drawRadar(ctx, 790, cardY + 245, 126, opts.radar.you, opts.radar.other);
    const o = opts.radar.other;
    if (o) {
      ctx.beginPath(); ctx.arc(600, cardY + cardH - 24, 7, 0, 7); ctx.fillStyle = INK; ctx.fill();
      text(ctx, "Tú", 614, cardY + cardH - 17, "600 19px " + SANS, INK);
      ctx.beginPath(); ctx.arc(680, cardY + cardH - 24, 7, 0, 7); ctx.fillStyle = o.color; ctx.fill();
      text(ctx, o.label, 694, cardY + cardH - 17, "600 19px " + SANS, INK);
    }
  }
  // ranking
  let y = cardY + cardH + 56;
  text(ctx, "MÁS AFINES, SEGÚN LO DOCUMENTADO", 64, y, "700 18px " + SANS, ACCENT);
  y += 18;
  const top = opts.top.slice(0, 5);
  if (!top.length) text(ctx, "Sin cobertura suficiente para mostrar porcentajes.", 64, y + 50, "400 24px " + SANS, MUTED);
  top.forEach((p, i) => {
    const ry = y + 24 + i * 76;
    text(ctx, `${i + 1}`, 52, ry + 34, `600 34px ${SERIF}`, MUTED);
    text(ctx, p.label, 120, ry + 30, `600 30px ${SERIF}`, INK, "left", 560);
    text(ctx, `${Math.round(p.affinity)} %`, W - 64, ry + 34, `600 38px ${SERIF}`, ACCENT, "right");
    rr(ctx, 120, ry + 44, W - 64 - 120, 12, 6); ctx.fillStyle = "#ece9e0"; ctx.fill();
    const g = ctx.createLinearGradient(120, 0, W - 64, 0); g.addColorStop(0, "#3d4f94"); g.addColorStop(1, "#8fa0dc");
    rr(ctx, 120, ry + 44, Math.max(12, (W - 64 - 120) * (p.affinity / 100)), 12, 6); ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(100, ry + 17, 7, 0, 7); ctx.fillStyle = p.color; ctx.fill();
  });
  // pie
  ctx.fillStyle = LINE; ctx.fillRect(64, H - 112, W - 128, 2);
  text(ctx, "Comparación parcial con propuestas documentadas e inferencias señaladas. No es una recomendación de voto.", 64, H - 74, "400 17px " + SANS, MUTED, "left", W - 128);
  text(ctx, "afinidad-electoral.org", 64, H - 40, `600 24px ${SERIF}`, ACCENT);
  text(ctx, opts.date, W - 64, H - 40, "400 18px " + SANS, MUTED, "right");
  return new Promise((res) => c.toBlob(res, "image/png"));
}
