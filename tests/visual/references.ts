export const originalScreens = [
  { key: 'owkr', route: '/projects/owkr', asset: '/projects/owkr/team-result.png', width: 1600, height: 1000, sha256: '8132732f8c6a97b124ac752e674514ab7d739d1f874cb18ceab2bca9cca8e6a0', source: 'OWKR Match local app with ten demo participants' },
  { key: 'chorus', route: '/projects/chorus', asset: '/projects/chorus/vinyl.png', width: 600, height: 1000, sha256: '9df0eb4447b357e245049f30fadac914eb76284714a853e5d5f296f2f34eda76', source: 'Chorus local repaired UI with real music metadata' },
  { key: 'rust-with-typescript', route: '/projects/rust-with-typescript', asset: '/projects/rust-with-typescript/ownership.png', width: 1600, height: 1000, sha256: '5bff038dc19ab0d394b9b26e59ac15cd7f4c39326818995d7099f722b7516934', source: 'Rust with TypeScript public Korean chapter' },
  {
    key: 'apple-music-discord-presence',
    route: '/projects/apple-music-discord-presence',
    asset: '/projects/apple-music-discord-presence/discord-presence.png',
    width: 828,
    height: 340,
    sha256: 'b8c299d4a44358383feb24d6679b465ba6be0d34afc8948a04243f54369fae7a',
    source: 'apple-music-discord-presence public macOS Discord activity capture',
  },
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

export const supplementalReferences = [
  { key: 'design-system', asset: '/projects/design-system/tokens-components.png', width: 1600, height: 1000, sha256: '19d25b5d187c3f14169736c607179def0f45f5d576c58fdf10ed02d51a56b10d' },
  { key: 'design-system', asset: '/projects/design-system/button-light-reference.png', width: 672, height: 128, sha256: '59c2a8b3beea78ff0baf0c0d4ac822707782e2051127acdf592bb7a80f89d4ef' },
  { key: 'design-system', asset: '/projects/design-system/button-dark-reference.png', width: 672, height: 128, sha256: '4df67fdbdcb3768b39e3aa56af0b95e3f50eddcf3c4eb4007738306301188744' },
  { key: 'owkr', asset: '/projects/owkr/operations-guide.png', width: 1600, height: 1000, sha256: '0ff875ed0451ff8b5a2eb2f6693920c4e1c0b2a50ab03e1602db42c5ec0aba46' },
  { key: 'chorus', asset: '/projects/chorus/search.png', width: 1600, height: 1000, sha256: '717e1870ba8960b7dfef023106fc2fc811599758541cbbc7a94fa265c3514f92' },
  { key: 'rust-with-typescript', asset: '/projects/rust-with-typescript/home.png', width: 1600, height: 1000, sha256: '30cedd4eb39cbb8ef8d2c2e08c1d7f7c61fc4f629c9b4b0da3516a76a856942e' },
  { key: 'chorus', asset: '/projects/chorus/export.png', width: 350, height: 622, sha256: '46384e01f9b565b6a8e45d8704c2580774fd3debcbdd7318689bf8869daa0b7a' },
] as const;
