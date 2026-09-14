// Texte de recherche utilisable dans un filtre PostgREST entre guillemets :
// virgules et parenthèses sont conservées, mais les jokers (% _ *) et les
// caractères d'échappement (" \) saisis sont neutralisés.
export function toSearchTerm(query) {
  return (query || '').replace(/[%_*"\\]/g, ' ').replace(/\s+/g, ' ').trim();
}
