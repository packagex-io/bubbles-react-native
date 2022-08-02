import { fontSize, TextTypescale, tokensType } from '../types';

export const colors = {
  transparent: 'rgba(255, 255, 255, 0)',

  blue50: '#EBEFFF',
  blue100: '#D7DFFF',
  blue200: '#AEBEFF',
  blue300: '#869EFF',
  blue400: '#5D7DFF',
  blue500: '#355DFF',
  blue600: '#2A4ACC',
  blue700: '#203899',
  blue800: '#152566',
  blue900: '#0B1333',
  blue950: '#050919',

  orange50: '#FFF0EA',
  orange100: '#FFE0D4',
  orange200: '#FFC2A9',
  orange300: '#FFA37E',
  orange400: '#FF8553',
  orange500: '#FF6628',
  orange600: '#CC5220',
  orange700: '#993D18',
  orange800: '#662910',
  orange900: '#331408',
  orange950: '#190A04',

  yellow50: '#FFF5EB',
  yellow100: '#FFECD7',
  yellow200: '#FFD9AF',
  yellow300: '#FFC588',
  yellow400: '#FFB260',
  yellow500: '#FF9F38',
  yellow600: '#CC7F2D',
  yellow700: '#995F22',
  yellow800: '#664016',
  yellow900: '#33200B',
  yellow950: '#191006',

  green50: '#EDF9F0',
  green100: '#DCF2E1',
  green200: '#B9E5C2',
  green300: '#95D9A4',
  green400: '#72CC85',
  green500: '#4FBF67',
  green600: '#3F9952',
  green700: '#2F733E',
  green800: '#204C29',
  green900: '#102615',
  green950: '#08130A',

  pink50: '#FFF5FC',
  pink100: '#FFEAFA',
  pink200: '#FFD6F5',
  pink300: '#FFC1EF',
  pink400: '#FFADEA',
  pink500: '#FF98E5',
  pink600: '#CC7AB7',
  pink700: '#995B89',
  pink800: '#663D5C',
  pink900: '#331E2E',
  pink950: '#190F17',

  purple50: '#F0EFFB',
  purple100: '#EDEBFA',
  purple200: '#DAD6F4',
  purple300: '#B5AEE9',
  purple400: '#9186DE',
  purple500: '#6C5DD3',
  purple600: '#50459E',
  purple700: '#352E69',
  purple800: '#1B1734',
  purple900: '#121023',
  purple950: '#0B0915',

  gray50: '#F9F9F9',
  gray100: '#E6E6E9',
  gray200: '#CCCDD3',
  gray300: '#B3B3BD',
  gray400: '#999AA7',
  gray500: '#808191',
  gray600: '#666774',
  gray700: '#4D4D57',
  gray800: '#33343A',
  gray900: '#1A1A1D',
  gray950: '#0D0D0E',

  black: '#171717',
  white: '#ffffff',
};

export const fontSizes: fontSize = { base: 16, scale: 1.15 };
fontSizes.sm = Math.round(fontSizes.base / fontSizes.scale);
fontSizes.xs = Math.round(fontSizes.sm / fontSizes.scale);
fontSizes.xxs = Math.round(fontSizes.xs / fontSizes.scale);
fontSizes.lg = Math.round(fontSizes.base * fontSizes.scale);
fontSizes.xl = Math.round(fontSizes.lg * fontSizes.scale);
fontSizes['2xl'] = Math.round(fontSizes.xl * fontSizes.scale);
fontSizes['3xl'] = Math.round(fontSizes['2xl'] * fontSizes.scale);
fontSizes['4xl'] = Math.round(fontSizes['3xl'] * fontSizes.scale);
fontSizes['5xl'] = Math.round(fontSizes['4xl'] * fontSizes.scale);
fontSizes['6xl'] = Math.round(fontSizes['5xl'] * fontSizes.scale);
fontSizes['7xl'] = Math.round(fontSizes['6xl'] * fontSizes.scale);
fontSizes['8xl'] = Math.round(fontSizes['7xl'] * fontSizes.scale);
fontSizes['9xl'] = Math.round(fontSizes['8xl'] * fontSizes.scale);
fontSizes['10xl'] = Math.round(fontSizes['9xl'] * fontSizes.scale);

const ref = {
  fontFamilies: { headlines: 'Inter', body: 'Inter' },
  fontSize: fontSizes,
  letterSpacing: {
    body: '0%',
    headlines: '-1%',
    button: '3%',
    captions: '0%',
  },
  lineHeight: {
    headlines: { xl: 1.1, lg: 1.1, default: 1.1, sm: 1.3 },
    body: { relaxed: 1.75, default: 1.5 },
  },
  fontWeights: {
    headlines: { bold: 'bold', regular: 'regular' },
    body: { bold: 'bold', regular: 'regular' },
  },
};

const regularHeadingType = {
  fontFamily: 'Inter',
  fontWeight: 'normal' as 'normal',
  color: colors.black,
  letterSpacing: -1,
};

const regularBodyType = {
  fontFamily: 'Inter',
  fontWeight: 'normal' as 'normal',
  color: '#171717',
  letterSpacing: -1,
};

export const typescale: TextTypescale = {
  Colossus: {
    ...regularHeadingType,
    fontSize: ref.fontSize['10xl'],
    lineHeight: ref.fontSize['10xl'] * ref.lineHeight.headlines.default,
  },
  Uber: {
    ...regularHeadingType,
    fontSize: fontSizes['9xl'],
    lineHeight: ref.fontSize['9xl'] * ref.lineHeight.headlines.default,
  },
  Hero: {
    ...regularHeadingType,
    fontSize: fontSizes['8xl'],
    lineHeight: ref.fontSize['8xl'] * ref.lineHeight.headlines.default,
  },
  Display: {
    ...regularHeadingType,
    fontSize: fontSizes['7xl'],
    lineHeight: ref.fontSize['7xl'] * ref.lineHeight.headlines.default,
  },
  Headline1: {
    ...regularHeadingType,
    fontSize: fontSizes['6xl'],
    lineHeight: ref.fontSize['6xl'] * ref.lineHeight.headlines.default,
  },
  Headline2: {
    ...regularHeadingType,
    fontSize: fontSizes['5xl'],
    lineHeight: ref.fontSize['5xl'] * ref.lineHeight.headlines.default,
  },
  Headline3: {
    ...regularHeadingType,
    fontSize: fontSizes['4xl'],
    lineHeight: ref.fontSize['4xl'] * ref.lineHeight.headlines.default,
  },
  Headline4: {
    ...regularHeadingType,
    fontSize: fontSizes['3xl'],
    lineHeight: ref.fontSize['3xl'] * ref.lineHeight.headlines.default,
  },
  Headline5: {
    ...regularHeadingType,
    fontSize: fontSizes['xl'],
    lineHeight: ref.fontSize['xl'] * ref.lineHeight.headlines.default,
  },
  Lead: {
    ...regularBodyType,
    fontSize: fontSizes['2xl'],
    lineHeight: ref.fontSize['2xl'] * ref.lineHeight.body.default,
  },
  Body: {
    ...regularBodyType,
    fontSize: fontSizes.lg,
    lineHeight: ref.fontSize['lg'] * ref.lineHeight.body.default,
  },
  Small: {
    ...regularBodyType,
    fontSize: 16,
    lineHeight: 16 * ref.lineHeight.body.default,
  },
  Caption: {
    ...regularBodyType,
    fontSize: fontSizes.sm,
    lineHeight: ref.fontSize['sm'] * ref.lineHeight.body.default,
  },
  XSmall: {
    ...regularBodyType,
    fontSize: fontSizes.xs,
    lineHeight: ref.fontSize['xs'] * ref.lineHeight.body.default,
  },
  Tiny: {
    ...regularBodyType,
    fontSize: fontSizes.xxs,
    lineHeight: ref.fontSize['xxs'] * ref.lineHeight.body.default,
  },
  'Input/Large': {
    ...regularBodyType,
    fontSize: fontSizes.lg,
    lineHeight: ref.fontSize['lg'] * ref.lineHeight.body.default,
  },
  'Input/Normal': {
    ...regularBodyType,
    fontSize: 16,
    lineHeight: 16 * ref.lineHeight.body.default,
  },
  'Input/Label': {
    ...regularBodyType,
    fontSize: fontSizes.xxs,
    textTransform: 'uppercase',
    letterSpacing: '0.9px',
    color: '#808191',
    lineHeight: ref.fontSize['xxs'] * ref.lineHeight.body.default,
  },
  'Button/XLarge': {
    ...regularBodyType,
    fontSize: fontSizes.xl,
    lineHeight: ref.fontSize['xl'] * ref.lineHeight.body.default,
  },
  'Button/Large': {
    ...regularBodyType,
    fontSize: 16,
    lineHeight: 16 * ref.lineHeight.body.default,
  },
  'Button/Normal': {
    ...regularBodyType,
    fontSize: fontSizes.sm,
    lineHeight: ref.fontSize.sm * ref.lineHeight.body.default,
  },
};

export const tokens: tokensType = {
  sys: { typescale },
  ref,
};
