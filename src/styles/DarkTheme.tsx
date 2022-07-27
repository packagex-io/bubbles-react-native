import color from 'color';
import DefaultTheme from './DefaultTheme';
import { colors } from './tokens';
import type { Theme } from '../types';

const DarkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  mode: 'adaptive',
  colors: {
    ...DefaultTheme.colors,
    primary: '#BB86FC',
    accent: '#03dac6',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    onSurface: '#FFFFFF',
    text: colors.white,
    disabled: color(colors.white).alpha(0.38).rgb().string(),
    placeholder: color(colors.white).alpha(0.54).rgb().string(),
    backdrop: color(colors.black).alpha(0.5).rgb().string(),
    notification: colors.pink100,
  },
};

export default DarkTheme;
