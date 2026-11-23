export const enhanceKoreanText = async () => {
  if (document.documentElement.lang !== 'ko') return;
  const elements = [...document.querySelectorAll<HTMLElement>('[data-kowrap]')];
  if (elements.length === 0) return;

  try {
    const { mountKowrap } = await import('@oddmash/kowrap/dom');
    await document.fonts?.ready;
    const controllers: ReturnType<typeof mountKowrap>[] = [];

    for (const element of elements) {
      const text = element.textContent;
      const style = element.getAttribute('style');
      try {
        controllers.push(mountKowrap(element, { inline: true }));
        element.dataset.kowrapMounted = '';
      } catch (error) {
        element.textContent = text;
        if (style === null) element.removeAttribute('style');
        else element.setAttribute('style', style);
        console.warn('Kowrap enhancement unavailable', error);
      }
    }

    window.addEventListener('pagehide', (event) => {
      if (!event.persisted) controllers.forEach((controller) => controller.destroy());
    });
  } catch (error) {
    console.warn('Kowrap enhancement unavailable', error);
  }
};
