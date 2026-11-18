import { findParty } from "./catalog.mjs";
import { GROUPS, groupMeans, compassPoint, compassSvg, radarSvg, colorOf, shortOf } from "./charts.mjs";
import { score, sharedIds, isScorablePosition, MIN_COVERAGE, WARN_COVERAGE, showAffinity, tierCounts, evidenceTier } from "./scoring.mjs";
const $ = (s) => document.querySelector(s),
  el = (t, text, cls) => {
    const e = document.createElement(t);
    if (text != null) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  };
let TOTAL = 0;
let data,
  candidates,
  state = null,
  exportData;
const fmt = (n) =>
  n == null
    ? "Sin datos"
    : n.toLocaleString("es-ES", { maximumFractionDigits: 1 }) + " %";
function knownParty(name) { return findParty(name, data.parties); }
const prettyProvince = (name) =>
  name
    .toLocaleLowerCase("es")
    .replace(/(^|\s)(\p{L})/gu, (m, space, letter) => space + letter.toLocaleUpperCase("es"))
    .replace(/(?<=\s)(De|Del|La|Las|Los|El|Y|I)(?=\s)/g, (word) => word.toLowerCase());
function setCandidatesOpen(open) {
  $("#candidatePanel").hidden = !open;
  $("#seeCandidates").setAttribute("aria-expanded", String(open));
  $("#seeCandidates").textContent = open ? "Ocultar candidaturas ▴" : "Consultar candidaturas ▾";
}
function renderCandidates() {
  const box = $("#candidates");
  box.replaceChildren();
  const province = $("#province").value;
  const names = candidates[province] || [];
  const withData = names.filter((name) => knownParty(name)).length;
  const pending = names.length - withData;
  $("#provinceSummary").textContent =
    `Hay ${names.length} ${names.length === 1 ? "candidatura" : "candidaturas"} al Congreso en ${prettyProvince(province)}: ` +
    `${withData} con alguna evidencia revisada` +
    (pending ? ` y ${pending} pendiente${pending === 1 ? "" : "s"} de análisis.` : ".");
  for (const name of names) {
    const r = el("div", name + " ", "candidate");
    r.append(
      el(
        "span",
        knownParty(name) ? "Análisis parcial" : "Pendiente de análisis",
        "badge",
      ),
    );
    box.append(r);
  }
  renderCoverage(names);
}
function renderCoverage(names) {
  const box = $("#coverageMatrix");
  box.replaceChildren();
  const analyzed = names.filter(name => knownParty(name));
  $("#coverageSummary").textContent = `${analyzed.length} de ${names.length} candidaturas con alguna evidencia revisada. Una casilla vacía no implica oposición ni neutralidad.`;
  const table = el("table"), caption = el("caption", "Evidencias por candidatura y tema");
  table.append(caption);
  const head = el("thead"), tr = el("tr");
  const th = el("th", "Candidatura"); th.scope = "col"; tr.append(th);
  for (const q of data.questions) { const h = el("th", q.topic); h.scope = "col"; tr.append(h); }
  head.append(tr); table.append(head);
  const body = el("tbody");
  for (const name of names) {
    const row = el("tr"), nameCell = el("th", name); nameCell.scope = "row"; row.append(nameCell);
    const party = knownParty(name);
    for (const q of data.questions) {
      const p = party?.positions[q.id], td = el("td");
      if (p) {
        const link = el("a", isScorablePosition(p) ? `${p.value}/5${p.historical ? " · " + p.sourceYear : ""}` : "Revisión");
        link.href = p.source; link.target = "_blank"; link.rel = "noopener noreferrer";
        link.title = `${p.locator}: ${p.reviewNote || p.reason}`; td.append(link);
      } else td.textContent = "Sin datos";
      row.append(td);
    }
    body.append(row);
  }
  table.append(body); box.append(table);
}
function show(id) {
  for (const s of ["setup", "survey", "results"]) $("#" + s).hidden = s !== id;
  window.scrollTo({ top: 0, behavior: "smooth" });
  const heading = $("#" + id).querySelector("h1, h2");
  if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
}
function renderQuestion() {
  const q = data.questions[state.q],
    p = state.people[state.p];
  $("#personLabel").textContent =
    `Persona ${state.p + 1} de ${state.people.length}`;
  $("#progressText").textContent = `${state.q + 1} / ${TOTAL}`;
  $("#progress").value = state.q + 1;
  $("#topic").textContent = q.topic;
  $("#question").textContent = q.text;
  $("#question").tabIndex = -1;
  const ctx = q.context, box = $("#qContext");
  box.hidden = !ctx;
  box.open = false;
  if (ctx) {
    const body = $("#qContextBody");
    body.replaceChildren(el("p", ctx.about));
    const sides = el("div", null, "qsides");
    const pro = el("div", null, "qside qpro"), con = el("div", null, "qside qcon");
    pro.append(el("b", "Quienes están a favor suelen decir"), el("p", ctx.pro));
    con.append(el("b", "Quienes están en contra suelen decir"), el("p", ctx.con));
    sides.append(pro, con);
    body.append(sides, el("p", "Resumen neutral y sintético; no refleja la posición de ninguna candidatura.", "small muted"));
  }
  $("#choices").replaceChildren();
  [
    "Totalmente en desacuerdo",
    "Más bien en desacuerdo",
    "Posición intermedia",
    "Más bien de acuerdo",
    "Totalmente de acuerdo",
  ].forEach((text, i) => {
    const l = el("label", null, "choice"),
      input = el("input");
    input.type = "radio";
    input.name = "answer";
    input.value = i + 1;
    input.checked = p.answers[q.id] === i + 1;
    // Un clic con puntero o toque avanza solo; con el teclado (flechas) hay que pulsar «Siguiente».
    input.addEventListener("click", (e) => { if (e.detail > 0) advanceSoon(); });
    l.append(input, el("span", `${i + 1} · ${text}`));
    $("#choices").append(l);
  });
  $("#skip").textContent =
    p.answers[q.id] === null
      ? "✓ Sin opinión / omitida"
      : "Sin opinión / omitir";
  $("#weight").value = p.weights[q.id] || 3;
  $("#weightValue").value = $("#weight").value + " / 5";
  $("#back").disabled = state.q === 0 && state.p === 0;
  $("#next").textContent =
    state.q === TOTAL - 1
      ? state.p === state.people.length - 1
        ? "Ver resultados →"
        : "Siguiente persona →"
      : "Siguiente →";
  $("#error").textContent = "";
}
let advanceTimer = null;
function advanceSoon() {
  clearTimeout(advanceTimer);
  advanceTimer = setTimeout(() => { if (!$("#survey").hidden) next(); }, 260);
}
function save() {
  const q = data.questions[state.q],
    p = state.people[state.p],
    checked = $("input[name=answer]:checked");
  if (checked) p.answers[q.id] = Number(checked.value);
  p.weights[q.id] = Number($("#weight").value);
  return Object.hasOwn(p.answers, q.id);
}
function next() {
  clearTimeout(advanceTimer);
  if (!save()) {
    $("#error").textContent =
      "Elige una respuesta o pulsa «Sin opinión / omitir».";
    return;
  }
  if (state.q < TOTAL - 1) state.q++;
  else if (state.p < state.people.length - 1) {
    state.p++;
    state.q = 0;
  } else {
    return renderResults();
  }
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
// Abre el PDF directamente en la página citada cuando el localizador la indica («PDF p. 49»).
const sourceHref = (d) => {
  const m = /(?:^|[·; ])PDF pp?\.\s*(\d+)/i.exec(d.locator || "");
  return m && /\.pdf(\?|$)/i.test(d.source) && !/impreso/i.test(d.locator) && !d.source.includes("#")
    ? `${d.source}#page=${m[1]}` : d.source;
};
let onlyDoc = false;
const posOf = (party) => onlyDoc
  ? Object.fromEntries(Object.entries(party.positions).filter(([, p]) => !p.inferred))
  : party.positions;


function coincidenceList(you, other, label, color) {
  const rows = you.map((g, i) => ({ name: g.name, a: g.value, b: other[i].value }))
    .filter((r) => r.a != null && r.b != null)
    .map((r) => ({ ...r, diff: Math.abs(r.a - r.b) }))
    .sort((x, y) => x.diff - y.diff);
  const box = el("div", null, "coincide");
  if (rows.length < 2) return box;
  const block = (title, list, cls) => {
    if (!list.length) return;
    const sec = el("div", null, "coblock " + cls);
    sec.append(el("b", title));
    for (const r of list) {
      const row = el("div", null, "corow");
      row.append(el("span", r.name, "coname"));
      const meter = el("span", null, "cometer");
      const dotA = el("i", null, "codot you"), dotB = el("i", null, "codot");
      dotA.style.left = ((r.a - 1) / 4) * 100 + "%";
      dotB.style.left = ((r.b - 1) / 4) * 100 + "%";
      dotB.style.background = color;
      meter.append(dotA, dotB);
      row.append(meter, el("span", r.diff <= 0.5 ? "coincide" : r.diff <= 1.25 ? "cercano" : "distinto", "cotag"));
      row.title = `Tú ${r.a.toFixed(1)} · ${label} ${r.b.toFixed(1)}`;
      sec.append(row);
    }
    box.append(sec);
  };
  const best = rows.filter((r) => r.diff <= 1.25).slice(0, 3);
  const worst = rows.filter((r) => r.diff > 1.25 && !best.includes(r)).slice(-3).reverse();
  block("Donde más coincides", best, "good");
  block("Donde más difieres", worst, "bad");
  if (!best.length && !worst.length) block("Por bloque", rows.slice(0, 3), "good");
  return box;
}
function buildCharts(person, entries) {
  const youVals = Object.fromEntries(Object.entries(person.answers).filter(([, v]) => Number.isInteger(v)));
  const valuesOf = (party) => Object.fromEntries(Object.entries(posOf(party)).filter(([, p]) => isScorablePosition(p)).map(([q, p]) => [q, p.value]));
  const wrap = el("section", null, "charts");
  wrap.append(el("h3", "Tu posición de un vistazo"));
  wrap.append(el("p", "Resúmenes visuales de tus respuestas y de las posiciones registradas. Son orientativos: condensan 18 afirmaciones en dos ejes y nueve bloques, y no son puntuaciones publicadas por los partidos.", "small"));
  const grid = el("div", null, "chartgrid");
  const mapBox = el("figure", null, "chartbox"), radarBox = el("figure", null, "chartbox");
  const withVals = entries.map((e) => ({ ...e, id: e.party.id, vals: valuesOf(e.party) }));
  let topRank = 0;
  const pts = [];
  for (const e of withVals) {
    const c = compassPoint(e.vals);
    if (!c) continue;
    pts.push({ id: e.id, label: shortOf(e.id, e.party.name || e.name), color: colorOf(e.id), x: c.x, y: c.y, top: e.shown && topRank++ < 5 });
  }
  const you = compassPoint(youVals);
  mapBox.append(el("figcaption", "Mapa: económico y social"));
  if (!you) mapBox.append(el("p", "Para situarte en el mapa hacen falta al menos tres respuestas económicas y tres sociales.", "small muted"));
  else {
    const first = withVals.find((e) => e.shown && pts.some((p) => p.id === e.id));
    mapBox.append(compassSvg([...pts, { you: true, x: you.x, y: you.y }], { lineTo: first?.id }));
    mapBox.append(el("p", "Eje económico: impuestos, alquiler, sanidad y educación concertada, jornada, pensiones y empresas. Eje social: penas, regularización, ayudas a extranjeros, violencia de género, gasto en defensa, república y aborto. Modelo territorial, UE, energía e indultos no entran en el mapa. La línea te une con la candidatura de mayor afinidad parcial.", "small muted"));
    const legend = el("div", null, "legend");
    for (const p of pts) {
      const chip = el("span", null, "chip");
      const dot = el("i"); dot.style.background = p.color;
      chip.append(dot, document.createTextNode(p.label)); legend.append(chip);
    }
    mapBox.append(legend);
    const missing = withVals.filter((e) => !pts.some((p) => p.id === e.id)).map((e) => e.party.name || e.name);
    if (missing.length) mapBox.append(el("p", `Sin datos suficientes para el mapa: ${missing.join(", ")}.`, "small muted"));
  }
  radarBox.append(el("figcaption", "Radar por bloques temáticos"));
  const usable = withVals.filter((e) => groupMeans(e.vals).filter((g) => g.value != null).length >= 3);
  if (!usable.length) radarBox.append(el("p", "No hay datos suficientes para el radar.", "small muted"));
  else {
    const sel = el("select");
    sel.setAttribute("aria-label", "Candidatura que comparar en el radar");
    usable.forEach((e, i) => { const o = el("option", e.party.name || e.name); o.value = i; sel.append(o); });
    const holder = el("div", null, "radarholder");
    const draw = () => {
      const e = usable[sel.value];
      holder.replaceChildren(radarSvg([
        { label: "Tú", color: "var(--ink)", values: groupMeans(youVals).map((g) => g.value) },
        { label: e.party.name, color: colorOf(e.id), values: groupMeans(e.vals).map((g) => g.value), dashed: false },
      ]));
      const key = el("div", null, "legend");
      for (const [t, c] of [["Tú", "var(--ink)"], [shortOf(e.id, e.party.name), colorOf(e.id)]]) {
        const chip = el("span", null, "chip"); const dot = el("i"); dot.style.background = c; chip.append(dot, document.createTextNode(t)); key.append(chip);
      }
      holder.append(key, coincidenceList(groupMeans(youVals), groupMeans(e.vals), shortOf(e.id, e.party.name), colorOf(e.id)));
    };
    sel.onchange = draw;
    radarBox.append(sel, holder, el("p", "Cada eje es el grado medio de acuerdo con las afirmaciones del bloque (centro = 1, en contra; borde = 5, a favor). Solo se dibujan los bloques con datos.", "small muted"));
    draw();
  }
  grid.append(mapBox, radarBox);
  wrap.append(grid);
  return wrap;
}
function renderResults(keep = false) {
  const names = candidates[state.province],
    parties = names.map((n) => ({ name: n, party: knownParty(n) })),
    analyzed = parties.filter((p) => p.party);
  $("#resultCards").replaceChildren();
  const reports = [];
  state.people.forEach((person, i) => {
    const card = el("article", null, "resultcard");
    card.append(
      el("h2", `Persona ${i + 1}`),
      el(
        "p",
        `${state.province} · ${Object.values(person.answers).filter(Number.isInteger).length} de ${TOTAL} temas`,
      ),
    );
    const edit = el("button", "Revisar mis respuestas", "quiet");
    edit.onclick = () => { state.p = i; state.q = 0; show("survey"); renderQuestion(); };
    card.append(edit);
    const common = sharedIds(
      person.answers,
      analyzed.map((x) => ({ positions: posOf(x.party) })),
    );
    const commonAnswers = Object.fromEntries(
      common.map((id) => [id, person.answers[id]]),
    );
    const report = {
      person: i + 1,
      answers: person.answers,
      weights: person.weights,
      parties: [],
    };
    if (!analyzed.length)
      card.append(
        el(
          "p",
          "Todavía no hay candidaturas documentadas para esta circunscripción.",
        ),
      );
    // Ordered by partial affinity (highest first); candidacies without enough coverage go last, grouped.
    const entries = analyzed.map(({ name, party }) => {
      const result = score(person.answers, person.weights, posOf(party));
      return { name, party, result, shown: showAffinity(result) };
    });
    entries.sort((a, b) =>
      (b.shown ? 1 : 0) - (a.shown ? 1 : 0) ||
      (b.shown ? b.result.affinity - a.result.affinity : 0) ||
      b.result.coverage - a.result.coverage ||
      a.name.localeCompare(b.name, "es"));
    if (entries.some((e) => e.shown))
      card.append(el("p", "Ordenadas de mayor a menor afinidad parcial. La cobertura no es la misma en todas: no es una clasificación global.", "small"));
    card.append(buildCharts(person, entries));
    const lowcov = el("details", null, "lowcov");
    let rank = 0;
    entries.forEach(({ name, party, result, shown }) => {
        const commonResult = score(commonAnswers, person.weights, posOf(party));
        report.parties.push({
          name,
          ...result,
          ...(shown
            ? { commonAffinity: commonResult.affinity }
            : {
                affinity: null,
                bounds: null,
                commonAffinity: null,
                affinityWithheld: `Cobertura inferior al ${MIN_COVERAGE} %`,
              }),
        });
        const row = el("div", null, "resultrow"),
          head = el("div", null, "resulthead");
        const label = party.name || name;
        head.append(el("b", shown ? `${++rank}. ${label}` : label));
        if (shown) head.append(el("span", fmt(result.affinity), "metric"));
        row.append(head);
        if (shown) {
          const bar = el("div", null, "bar"),
            fill = el("div", null, "fill");
          fill.style.width = (result.affinity || 0) + "%";
          bar.append(fill);
          row.append(bar);
        }
        const t = tierCounts(result.details), src = [];
        if (t.oficial) src.push(`${t.oficial} oficial${t.oficial === 1 ? "" : "es"}`);
        if (t.secundaria) src.push(`${t.secundaria} de prensa`);
        if (t.historico) src.push(`${t.historico} antecedente${t.historico === 1 ? "" : "s"}${t.years.length ? " de " + t.years.join("/") : ""}`);
        if (t.inferido) src.push(`${t.inferido} inferida${t.inferido === 1 ? "" : "s"}`);
        const topicOf = (id) => data.questions.find((q) => q.id === id).topic;
        const clash = result.details.filter((d) => d.weight >= 4 && Math.abs(d.answer - d.position) >= 3).map((d) => topicOf(d.id));
        const meta = el("p", result.count
          ? `Cobertura ${fmt(result.coverage)} · ${result.count} ${result.count === 1 ? "tema" : "temas"}${src.length ? " (" + src.join(", ") + ")" : ""}${shown ? "" : " · sin porcentaje: cobertura inferior al " + MIN_COVERAGE + " %"}${shown && result.coverage < 60 ? " · ⚠ parcial" : ""}${t.inferido && t.inferido * 2 >= result.count ? " · ⚠ mayoría inferida" : ""}`
          : "Ninguno de tus temas tiene posición documentada.", "small meta");
        if (clash.length)
          meta.append(el("span", ` · ⚠ choca en ${clash.slice(0, 2).join(", ")}${clash.length > 2 ? ` y ${clash.length - 2} más` : ""}`, "clash"));
        row.append(meta);
        const details = el("details");
        details.append(el("summary", shown ? "Cómo se ha calculado este porcentaje" : "Ver comparación tema a tema"));
        if (shown)
          details.append(el("p", `Afinidad = suma de (coincidencia × importancia) de los ${result.count} temas comparados, dividida por la suma de sus importancias. Coincidencia de un tema = 1 − |tu respuesta − posición del partido| ÷ 4: 100 % si coincidís y 0 % si estáis en extremos opuestos. La cobertura (${fmt(result.coverage)}) es la parte de la importancia total de tus respuestas que tiene posición del partido.`, "small"));
        if (shown && t.inferido)
          details.append(el("p", `${t.inferido} de los ${result.count} temas son posiciones inferidas: el partido no las trata en sus textos y las hemos deducido de su perfil y de otras posiciones suyas. Cuentan como una posición más, pero están marcadas como «Inferida» y puedes excluirlas con la casilla «solo documentado».`, "small"));
        const tierLabel = (d) => {
          const k = evidenceTier(d);
          return k === "oficial" ? "Programa o fuente oficial de 2026"
            : k === "secundaria" ? "Prensa de 2026"
            : k === "historico" ? `Antecedente de ${d.sourceYear}`
            : "Inferida (deducción editorial)";
        };
        for (const d of [...result.details].sort((a, b) => b.weight - a.weight || a.similarity - b.similarity)) {
          const ev = el("div", null, "evidence");
          ev.append(
            el("b", `${topicOf(d.id)} · coincidencia ${fmt(d.similarity)}`),
            el("p", `Tú: ${d.answer}/5 · Partido: ${d.position}/5 · Importancia: ${d.weight}/5`, "small"),
            el("p", d.reason, "small"),
          );
          const kind = el("p", null, "small"), tag = el("span", tierLabel(d), `tier tier-${evidenceTier(d)}`);
          kind.append(tag, document.createTextNode(" · "));
          if (d.inferred) {
            kind.append(document.createTextNode("el partido no trata este tema; posición deducida · "));
            const links = Array.isArray(d.basisLinks) && d.basisLinks.length ? d.basisLinks : [{ url: d.source, label: "Documento de contexto del partido" }];
            links.forEach((b, i) => {
              if (i) kind.append(document.createTextNode(" · "));
              const a = el("a", `${b.label} ↗`);
              a.href = b.url; a.target = "_blank"; a.rel = "noopener noreferrer";
              kind.append(a);
            });
          } else {
            const link = el("a", `${d.locator} ↗`);
            link.href = sourceHref(d);
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            kind.append(link);
          }
          ev.append(kind);
          if (d.sourceNote) ev.append(el("p", d.sourceNote, "small"));
          details.append(ev);
        }
        {
          const used = new Set(result.details.map((d) => d.id));
          const miss = data.questions.filter((q) => Number.isInteger(person.answers[q.id]) && !used.has(q.id)).map((q) => q.topic);
          if (miss.length)
            details.append(el("p", onlyDoc
              ? `Temas sin posición documentada (no cuentan en el porcentaje): ${miss.join(", ")}. Las posiciones inferidas están excluidas porque has marcado «solo documentado».`
              : `Temas sin ninguna posición, ni documentada ni inferida (no cuentan en el porcentaje): ${miss.join(", ")}.`, "small"));
        }
        if (shown) {
          details.append(el("p", common.length
            ? `Sobre ${common.length} ${common.length === 1 ? "pregunta común" : "preguntas comunes"} a las candidaturas analizadas, la afinidad sería ${fmt(commonResult.affinity)}. Comparación también incompleta.`
            : "No hay preguntas puntuables comunes para comparar al menos dos candidaturas.", "small"));
          if (result.bounds) details.append(el("p",
            `Si en los temas sin posición el partido tuviera cualquier posición posible, tu afinidad estaría entre ${fmt(result.bounds.lower)} y ${fmt(result.bounds.upper)}. Es un rango matemático, no una probabilidad.`, "small"));
        }
        if (t.secundaria || t.historico || t.inferido)
          details.append(el("p", "La información oficial actual prevalece; prensa, antecedentes y posiciones inferidas solo cubren temas sin evidencia oficial reciente." + (t.inferido ? " Una posición inferida es una deducción editorial a partir de otras posiciones o votaciones del partido, no una declaración suya." : ""), "small"));
        for (const d of result.excluded) {
          const ev = el("div", null, "evidence");
          ev.append(el("b", `${topicOf(d.id)} · no puntúa`),
            el("p", d.reviewNote || "La evidencia requiere revisión antes de puntuar.", "small"));
          const link = el("a", d.locator + " ↗"); link.href = d.source;
          link.target = "_blank"; link.rel = "noopener noreferrer"; ev.append(link); details.append(ev);
        }
        row.append(details);
        if (shown) card.append(row); else lowcov.append(row);
      });
    if (lowcov.children.length) {
      lowcov.prepend(el("summary", `${lowcov.children.length} ${lowcov.children.length === 1 ? "candidatura" : "candidaturas"} sin cobertura suficiente para mostrar porcentaje`));
      card.append(lowcov);
    }
    reports.push(report);
    $("#resultCards").append(card);
  });
  $("#pending").replaceChildren();
  for (const p of parties.filter((p) => !p.party)) {
    const row = el("div", null, "candidate"); row.append(el("b", p.name));
    const research = findParty(p.name, data.research || []);
    if (research) {
      row.append(el("p", research.status), el("p", research.note, "small"));
      const link = el("a", `Fuente consultada · ${research.reviewed} ↗`);
      link.href = research.source; link.target = "_blank"; link.rel = "noopener noreferrer"; row.append(link);
    } else row.append(el("p", "Pendiente de investigación documental", "small"));
    $("#pending").append(row);
  }
  exportData = {
    version: data.version,
    election: data.election,
    province: state.province,
    limitations: data.limitations,
    questions: data.questions,
    candidateSource: data.candidateSource,
    pendingCandidates: parties.filter(p => !p.party).map(p => ({name:p.name,research:findParty(p.name,data.research || []) || null})),
    methodology: "Media ponderada de 1 − |respuesta − posición| / 4; posiciones sin evidencia directa excluidas; rangos matemáticos sobre los temas sin datos, no intervalos de confianza.",
    onlyDocumented: onlyDoc,
    reports,
  };
  if (!keep) show("results");
}
async function init() {
  try {
    [data, candidates] = await Promise.all(
      ["data.json", "candidaturas.json"].map(async (u) => {
        const r = await fetch(u, { cache: "no-store" });
        if (!r.ok) throw Error(u);
        return r.json();
      }),
    );
    if (!Array.isArray(data.questions) || !data.questions.length || !Array.isArray(data.parties)) throw Error("Catálogo no válido");
    TOTAL = data.questions.length;
    $("#progress").max = TOTAL;
    $("#footVersion").textContent = `Última revisión parcial: ${data.date.split("-").reverse().join("/")} · Versión ${data.version} · Proyecto independiente`;
    $("#boe").href = data.candidateSource;
    const params = new URLSearchParams(location.search);
    for (const p of Object.keys(candidates).sort((a, b) =>
      a.localeCompare(b, "es"),
    ))
      $("#province").add(new Option(p, p));
    if (candidates[params.get("provincia")])
      $("#province").value = params.get("provincia");
    else $("#province").value = "MADRID";
    for (let n = 1; n <= 10; n++)
      $("#people").add(new Option(n === 1 ? "1 persona" : `${n} personas`, n));
    const num = Number(params.get("personas"));
    $("#people").value =
      Number.isInteger(num) && num >= 1 && num <= 10 ? num : 1;
    renderCandidates();
  } catch (e) {
    $("#limits").textContent =
      "No se pudieron cargar los datos. Recarga la página para intentarlo de nuevo.";
    $("#start button[type=submit]").disabled = true;
  }
}
$("#province").addEventListener("change", renderCandidates);
$("#onlyDoc").addEventListener("change", (e) => { onlyDoc = e.target.checked; renderResults(true); });
$("#seeCandidates").addEventListener("click", () => setCandidatesOpen($("#candidatePanel").hidden));
$("#start").addEventListener("submit", (e) => {
  e.preventDefault();
  state = {
    province: $("#province").value,
    p: 0,
    q: 0,
    people: Array.from({ length: Number($("#people").value) }, () => ({
      answers: {},
      weights: {},
    })),
  };
  show("survey");
  renderQuestion();
});
$("#next").onclick = next;
$("#back").onclick = () => {
  save();
  if (state.q) state.q--;
  else if (state.p) {
    state.p--;
    state.q = TOTAL - 1;
  }
  renderQuestion();
};
$("#skip").onclick = () => {
  state.people[state.p].answers[data.questions[state.q].id] = null;
  document
    .querySelectorAll("input[name=answer]")
    .forEach((x) => (x.checked = false));
  next();
};
document.addEventListener("keydown", (e) => {
  if ($("#survey").hidden || e.ctrlKey || e.metaKey || e.altKey) return;
  if (/^(SELECT|TEXTAREA)$/.test(e.target.tagName) || (e.target.tagName === "INPUT" && e.target.type === "range")) return;
  if (/^[1-5]$/.test(e.key)) {
    const r = document.querySelector(`input[name=answer][value="${e.key}"]`);
    if (r) { r.checked = true; advanceSoon(); e.preventDefault(); }
  }
});
$("#weight").oninput = () =>
  ($("#weightValue").value = $("#weight").value + " / 5");
$("#restart").onclick = () => {
  state = null;
  exportData = null;
  $("#resultCards").replaceChildren();
  show("setup");
};
$("#methodTop").onclick = () =>
  $("#method").scrollIntoView({ behavior: "smooth" });
$("#share").onclick = async () => {
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("provincia", $("#province").value);
  url.searchParams.set("personas", $("#people").value);
  try {
    await navigator.clipboard.writeText(url.href);
    $("#shareStatus").textContent = "Enlace copiado. No contiene respuestas.";
  } catch {
    $("#shareStatus").textContent = url.href;
  }
};
$("#download").onclick = () => {
  const u = URL.createObjectURL(
      new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      }),
    ),
    a = el("a");
  a.href = u;
  a.download = "resultados-afinidad.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
};
init();
