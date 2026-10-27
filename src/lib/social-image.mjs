export function socialImagePath(pathname, locale) {
  const path = pathname.replace(/^\/en(?=\/|$)/, '').replace(/^\/+|\/+$/g, '');
  const project = path.match(/^projects\/([a-z0-9-]+)$/)?.[1];
  return `/social/v1/${locale}/${project ?? 'index'}.png`;
}
