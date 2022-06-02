import color from 'color';
import { black, white, pinkA400 } from './colors';
import configureFonts from './fonts';
import type { Theme } from '../types';

const DefaultTheme: Theme = {
  dark: false,
  roundness: 16,
  colors: {
    primary: '#6C5DD3',
    secondary: '#FF98E5',
    error: '#FF6628',
    warning: '#FF9F38',
    success: '#4FBF67',
    info: '#355DFF',
    gray: '#808191',
    dark: '#1B1D21',

    accent: '#03dac4',
    background: '#f6f6f6',
    surface: white,
    text: black,
    onSurface: '#000000',
    disabled: color(black).alpha(0.26).rgb().string(),
    placeholder: color(black).alpha(0.54).rgb().string(),
    backdrop: color(black).alpha(0.5).rgb().string(),
    notification: pinkA400,
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export default DefaultTheme;
