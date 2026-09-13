// N'accepte qu'un chemin interne ("/messages/123"), jamais une adresse externe
// ("//site.com", "https://…"), pour ne pas rediriger un membre vers un faux site.
export function safeNextPath(value, fallback = '/') {
  if (typeof value !== 'string') return fallback;
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return fallback;
  return value;
}
