// Names remain those of the BOE. Aliases describe the same electoral coalition,
// never inheritance from one of its member parties.
export function findParty(name, parties) {
  if (typeof name !== 'string') return undefined;
  const candidate = name.toLocaleUpperCase('es');
  const hits = parties.filter(party => [party.match, ...(party.aliases || [])]
    .some(pattern => candidate.includes(pattern.toLocaleUpperCase('es'))) &&
    !(party.exclude || []).some(pattern => candidate.includes(pattern.toLocaleUpperCase('es'))));
  if (hits.length > 1) throw Error(`Candidatura ambigua: ${name}`);
  return hits[0];
}
