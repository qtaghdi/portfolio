export function socialImagePath(pathname, locale) {
  const path = pathname.replace(/^\/en(?=\/|$)/, '').replace(/^\/+|\/+$/g, '');
  const project = path.match(/^projects\/([a-z0-9-]+)$/)?.[1];
  return project ? `/social/v1/${locale}/${project}.png` : `/social/v2/${locale}/index.png`;
}
