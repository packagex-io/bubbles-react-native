import color from "color";
import configureFonts from "./fonts";
import type { Theme } from "../types";
import { colors, tokens, typescale } from "./tokens";

const DefaultTheme: Theme = {
  dark: false,
  roundness: 16,
  colors: {
    fg: {
      default: colors.black,
      muted: colors.gray700,
      subtle: colors.gray500,
      "on-accent": colors.white,
      "on-disabled": colors.gray500,
      disabled: colors.gray300,
    },
    bg: {
      surface: colors.white,
      muted: colors.gray200,
      subtle: colors.gray50,
      canvas: colors.white,
    },
    primary: {
      default: colors.purple500,
      emphasis: colors.purple700,
      muted: colors.purple600,
      subtle: colors.purple50,
      disabled: colors.gray300,
    },
    secondary: {
      default: colors.pink500,
      emphasis: colors.pink600,
      muted: colors.pink400,
      subtle: colors.pink50,
      disabled: colors.pink200,
    },
    warning: {
      default: colors.yellow500,
      emphasis: colors.yellow700,
      muted: colors.yellow600,
      subtle: colors.yellow100,
      disabled: colors.black,
    },
    error: {
      default: colors.orange500,
      emphasis: colors.orange700,
      muted: colors.orange600,
      subtle: colors.orange100,
      disabled: colors.white,
    },
    info: {
      default: colors.blue500,
      emphasis: colors.blue700,
      muted: colors.blue600,
      subtle: colors.blue100,
      disabled: colors.white,
    },
    success: {
      default: colors.green500,
      emphasis: colors.green700,
      muted: colors.green600,
      subtle: colors.green100,
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
    border: colors.gray200,

    accent: "#03dac4",
    background: "#f6f6f6",
    surface: colors.white,
    text: colors.black,
    onSurface: "#000000",
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

export default DefaultTheme;
