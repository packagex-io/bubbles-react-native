import color from 'color';
import configureFonts from './fonts';
import type { Theme } from '../types';
import { colors, tokens, typescale } from './tokens';

const DarkTheme: Theme = {
  dark: true,
  roundness: 16,
  colors: {
    fg: {
      default: colors.white,
      muted: colors.gray200,
      subtle: colors.gray500,
      'on-accent': colors.white,
      'on-disabled': colors.gray300,
      disabled: colors.gray600,
    },
    bg: {
      surface: colors.gray950,
      muted: colors.gray600,
      subtle: colors.gray900,
      canvas: colors.black,
    },
    primary: {
      default: colors.purple500,
      emphasis: colors.purple600,
      muted: colors.purple400,
      subtle: colors.purple50,
      disabled: colors.gray300,
    },
    secondary: {
      default: colors.pink500,
      emphasis: colors.pink600,
      muted: colors.pink500,
      subtle: colors.pink50,
      disabled: colors.pink900,
    },
    warning: {
      default: colors.yellow600,
      emphasis: colors.yellow400,
      muted: colors.yellow500,
      subtle: colors.yellow800,
      disabled: colors.black,
    },
    error: {
      default: colors.orange600,
      emphasis: colors.orange400,
      muted: colors.orange500,
      subtle: colors.orange950,
      disabled: colors.white,
    },
    info: {
      default: colors.blue600,
      emphasis: colors.blue400,
      muted: colors.blue500,
      subtle: colors.blue100,
      disabled: colors.white,
    },
    success: {
      default: colors.green600,
      emphasis: colors.green400,
      muted: colors.green500,
      subtle: colors.green50,
      disabled: colors.white,
    },
    input: {
      background: colors.white,
      text: colors.gray800,
      placeholder: colors.gray500,
      border: { default: colors.gray300, disabled: colors.gray200 },
      fg: { disabled: colors.gray300 },
    },
    overlay: colors.black,
    border: colors.gray900,

    accent: '#03dac4',
    background: '#f6f6f6',
    surface: colors.white,
    text: colors.white,
    onSurface: '#000000',
    disabled: color(colors.black).alpha(0.26).rgb().string(),
    placeholder: color(colors.black).alpha(0.54).rgb().string(),
    backdrop: color(colors.black).alpha(0.5).rgb().string(),
    notification: colors.pink400,
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
  typescale: typescale,
  ...tokens.ref,
};

export default DarkTheme;
