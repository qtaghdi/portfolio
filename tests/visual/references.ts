export const originalScreens = [
  {
    key: 'notiiv',
    route: '/projects/notiiv',
    asset: '/projects/notiiv/img.png',
    width: 1905,
    height: 956,
    sha256: 'c38ae614a63bcfeb20a11761d128c5089175fb816de44c8d502b2ec5f153ed44',
    source: 'bigtablet-notiiv-monorepo-web support screen',
  },
  {
    key: 'design-system',
    route: '/projects/design-system',
    asset: '/projects/design-system/storybook-overview.png',
    width: 1440,
    height: 900,
    sha256: '4cb867fa9a2099e8712b6e98f26ba4dd0ce8206f6e154f9fac0aceb614340c21',
    source: 'bigtablet-design-system Storybook introduction',
  },
  {
    key: 'intranet',
    route: '/projects/intranet',
    asset: '/projects/intranet/home.png',
    width: 390,
    height: 788,
    sha256: '62f235f08263c1433b15108b302a2c020748adc5f6ed9d3d374f43db46a099b5',
    source: 'bigtablet-intranet-app home with integration fixtures',
  },
  {
    key: 'document-workspace',
    route: '/projects/document-workspace',
    asset: '/projects/document-workspace/editor.png',
    width: 1440,
    height: 900,
    sha256: '286756ba5922e516590ab6dc12409be46c734e99a55698ab57eb24a1b668c32c',
    source: 'document-workspace LibreOffice compatibility fixture',
  },
] as const;

export const declaredReconstructions = [
  {
    key: 'boundra',
    route: '/projects/boundra',
    reason: 'CLI output is rendered as selectable HTML because no distributable original capture is available.',
  },
] as const;
