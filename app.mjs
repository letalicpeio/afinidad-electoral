import { score, sharedIds } from "./scoring.mjs";
const $ = (s) => document.querySelector(s),
  el = (t, text, cls) => {
    const e = document.createElement(t);
    if (text != null) e.textContent = text;
    if (cls) e.className = cls;
    return e;
  };
const LOW_COVERAGE = 50;
let TOTAL = 0;
let data,
  candidates,
  state = null,
  exportData;
const fmt = (n) =>
  n == null
    ? "Sin datos"
    : n.toLocaleString("es-ES", { maximumFractionDigits: 1 }) + " %";
function knownParty(name) {
  return data.parties.find((p) => name.toUpperCase().includes(p.match));
}
function renderCandidates() {
  const box = $("#candidates");
  box.replaceChildren();
  for (const name of candidates[$("#province").value] || []) {
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
}
function show(id) {
  for (const s of ["setup", "survey", "results"]) $("#" + s).hidden = s !== id;
  window.scrollTo({ top: 0, behavior: "smooth" });
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
function save() {
  const q = data.questions[state.q],
    p = state.people[state.p],
    checked = $("input[name=answer]:checked");
  if (checked) p.answers[q.id] = Number(checked.value);
  p.weights[q.id] = Number($("#weight").value);
  return Object.hasOwn(p.answers, q.id);
}
function next() {
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
function renderResults() {
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
        `${state.province} · ${Object.values(person.answers).filter(Number.isInteger).length} de ${TOTAL} temas respondidos`,
      ),
    );
    const common = sharedIds(
      person.answers,
      analyzed.map((x) => x.party),
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
    // Alphabetical order: partial coverage is not a fair global ranking.
    analyzed
      .sort((a, b) => a.name.localeCompare(b.name, "es"))
      .forEach(({ name, party }) => {
        const result = score(person.answers, person.weights, party.positions),
          commonResult = score(commonAnswers, person.weights, party.positions);
        report.parties.push({
          name,
          ...result,
          commonAffinity: commonResult.affinity,
        });
        const row = el("div", null, "resultrow"),
          head = el("div", null, "resulthead");
        head.append(el("b", name), el("span", fmt(result.affinity), "metric"));
        row.append(
          head,
          el(
            "p",
            `Afinidad parcial · Cobertura ponderada ${fmt(result.coverage)} · ${result.count} ${result.count === 1 ? "tema con evidencia" : "temas con evidencia"}`,
          ),
        );
        const bar = el("div", null, "bar"),
          fill = el("div", null, "fill");
        fill.style.width = (result.affinity || 0) + "%";
        bar.append(fill);
        row.append(bar);
        if (result.coverage < LOW_COVERAGE)
          row.append(
            el(
              "p",
              `⚠ Cobertura baja (${fmt(result.coverage)}): este porcentaje se basa en pocos de tus temas y puede no ser representativo.`,
              "warning",
            ),
          );
        row.append(
          el(
            "p",
            `Sobre ${common.length} preguntas comunes a las candidaturas analizadas: ${fmt(commonResult.affinity)}. Esta comparación también es incompleta.`,
          ),
        );
        const details = el("details"),
          summary = el("summary", "Revisar respuestas, posiciones y fuentes");
        details.append(summary);
        for (const d of result.details) {
          const ev = el("div", null, "evidence"),
            q = data.questions.find((q) => q.id === d.id);
          ev.append(
            el("b", q.topic),
            el(
              "p",
              `Tu respuesta: ${d.answer}/5 · Posición codificada: ${d.position}/5 · Peso: ${d.weight}/5 · Coincidencia: ${fmt(d.similarity)}`,
            ),
            el("p", d.reason),
          );
          const link = el("a", d.locator + " ↗");
          link.href = d.source;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          ev.append(link, el("p", d.coding));
          details.append(ev);
        }
        row.append(details);
        card.append(row);
      });
    reports.push(report);
    $("#resultCards").append(card);
  });
  $("#pending").replaceChildren();
  for (const p of parties.filter((p) => !p.party))
    $("#pending").append(el("div", p.name, "candidate"));
  exportData = {
    version: data.version,
    election: data.election,
    province: state.province,
    limitations: data.limitations,
    reports,
  };
  show("results");
}
async function init() {
  try {
    [data, candidates] = await Promise.all(
      ["data.json", "candidaturas.json"].map(async (u) => {
        const r = await fetch(u);
        if (!r.ok) throw Error(u);
        return r.json();
      }),
    );
    TOTAL = data.questions.length;
    $("#progress").max = TOTAL;
    $("#limits").textContent = data.limitations;
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
