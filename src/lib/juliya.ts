export const enhanceKoreanText = async () => {
  if (document.documentElement.lang !== 'ko') return;
  const elements = [...document.querySelectorAll<HTMLElement>('[data-kowrap], [data-kowrap-prose] > :is(p, h2, h3):not(:has(*:not(br[data-kowrap-break])))')];
  if (elements.length === 0) return;

  try {
    const { mountKowrap } = await import('@oddmash/juliya/dom');
    await document.fonts?.ready;
    const controllers: ReturnType<typeof mountKowrap>[] = [];

    for (const element of elements) {
      const text = element.textContent;
      const style = element.getAttribute('style');
      try {
        controllers.push(mountKowrap(element, { inline: true, locale: 'ko' }));
        element.dataset.kowrapMounted = '';
      } catch (error) {
        element.textContent = text;
        if (style === null) element.removeAttribute('style');
        else element.setAttribute('style', style);
        console.warn('Juliya enhancement unavailable', error);
      }
    }

    window.addEventListener('pagehide', (event) => {
      if (!event.persisted) controllers.forEach((controller) => controller.destroy());
    });
  } catch (error) {
    console.warn('Juliya enhancement unavailable', error);
  }
};
