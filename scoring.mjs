export function isScorablePosition(position) {
  if (!position || position.scoreable === false || !Number.isInteger(position.value) ||
      position.value < 1 || position.value > 5 || !position.locator?.trim() ||
      typeof position.source !== 'string') return false;
  try { return new URL(position.source).protocol === 'https:'; }
  catch { return false; }
}
const validAnswer = value => Number.isInteger(value) && value >= 1 && value <= 5;

export function score(answers, weights, positions) {
  let total = 0, known = 0, similarity = 0, missingMinimum = 0;
  const details = [], excluded = [];
  for (const [id, answer] of Object.entries(answers)) {
    if (!validAnswer(answer)) continue;
    const weight = weights[id];
    if (!Number.isInteger(weight) || weight < 1 || weight > 5) throw Error('Peso no válido');
    total += weight;
    const position = positions[id];
    if (!isScorablePosition(position)) {
      missingMinimum += weight * (1 - Math.max(answer - 1, 5 - answer) / 4);
      if (position) excluded.push({ ...position, id });
      continue;
    }
    const agreement = 1 - Math.abs(answer - position.value) / 4;
    known += weight;
    similarity += weight * agreement;
    details.push({ ...position, id, answer, weight, position: position.value, similarity: agreement * 100 });
  }
  return {
    affinity: known ? similarity * 100 / known : null,
    coverage: total ? known * 100 / total : 0,
    count: details.length, total, known, details, excluded,
    // Bounds over all possible 1–5 positions on unanswered-by-the-party topics.
    // These are not confidence intervals or electoral probabilities.
    bounds: known ? {
      lower: (similarity + missingMinimum) * 100 / total,
      upper: (similarity + total - known) * 100 / total,
    } : null,
  };
}
export function sharedIds(answers, parties) {
  if (parties.length < 2) return [];
  return Object.keys(answers).filter(id => validAnswer(answers[id]) &&
    parties.every(party => isScorablePosition(party.positions[id])));
}

// Por debajo de esta cobertura ponderada no se publica un porcentaje: con tan poca evidencia
// documentada sería una apariencia de precisión. Se muestra solo la comparación tema a tema.
export const MIN_COVERAGE = 50;
export const WARN_COVERAGE = 75;
export const showAffinity = (result) =>
  result.affinity !== null && result.coverage >= MIN_COVERAGE;

// Jerarquía de evidencia: la información oficial actual (2026) prevalece. La prensa de 2026 y los
// antecedentes de otras convocatorias solo rellenan temas en los que el partido no tiene evidencia
// oficial reciente, y siempre se muestran etiquetados.
export const evidenceTier = (position) =>
  position?.inferred
    ? 'inferido'
    : position?.historical
    ? 'historico'
    : /^fuente secundaria/i.test(position?.sourceNote || '')
      ? 'secundaria'
      : 'oficial';

export function tierCounts(details) {
  const counts = { oficial: 0, secundaria: 0, historico: 0, inferido: 0 };
  const years = new Set();
  for (const d of details) {
    const tier = evidenceTier(d);
    counts[tier]++;
    if (tier === 'historico' && d.sourceYear) years.add(d.sourceYear);
  }
  return { ...counts, years: [...years].sort() };
}
