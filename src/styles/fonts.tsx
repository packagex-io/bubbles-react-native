import {Platform, PlatformOSType} from 'react-native';
import type {Fonts} from '../types';

const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Inter, System',
      fontWeight: '400' as '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100' as '100',
    },
  },
  default: {
    regular: {
      fontFamily: 'Inter',
      fontWeight: 'normal' as 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal' as 'normal',
    },
    semiBold: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: 'normal' as 'normal',
    },
    bold: {
      fontFamily: 'Inter-Bold',
      fontWeight: 'normal' as 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal' as 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal' as 'normal',
    },
  },
  web: {
    regular: {
      fontFamily: 'Inter',
      fontWeight: 'normal' as 'normal',
    },
    medium: {
      fontFamily: 'Inter',
      fontWeight: '500' as '500',
    },
    semiBold: {
      fontFamily: 'Inter',
      fontWeight: '600' as '600',
    },
    bold: {
      fontFamily: 'Inter',
      fontWeight: '700' as '700',
    },
    light: {
      fontFamily: 'Inter',
      fontWeight: '300' as '300',
    },
    thin: {
      fontFamily: 'Inter',
      fontWeight: '100' as '100',
    },
  },
};

export default function configureFonts(
  config?: {
    [platform in PlatformOSType | 'default']?: Fonts;
  },
): Fonts {
  const fonts = Platform.select({...fontConfig, ...config}) as Fonts;
  return fonts;
}
