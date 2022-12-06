import type * as React from 'react';

export type Font = {
  fontFamily: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};

export enum HeadlinesType {
  Colossus = 'Colossus',
  Uber = 'Uber',
  Hero = 'Hero',
  Display = 'Display',
  Headline1 = 'Headline1',
  Headline2 = 'Headline2',
  Headline3 = 'Headline3',
  Headline4 = 'Headline4',
  Headline5 = 'Headline5',
}

export enum BodyType {
  Lead = 'Lead',
  Body = 'Body',
  Small = 'Small',
  Caption = 'Caption',
  XSmall = 'XSmall',
  Tiny = 'Tiny',
  'Input/Large' = 'Input/Large',
  'Input/Normal' = 'Input/Normal',
  'Input/Label' = 'Input/Label',
  'Button/XLarge' = 'Button/XLarge',
  'Button/Large' = 'Button/Large',
  'Button/Normal' = 'Button/Normal',
}

export type TextType = {
  fontFamily: string;
  letterSpacing: number | string;
  fontWeight: Font['fontWeight'];
  lineHeight: number;
  fontSize: number;
  textTransform?: string;
  color?: string;
};

export type TextTypescale = {
  [key in HeadlinesType]: TextType;
} & { [key in BodyType]: TextType };

enum fontSizeType {
  xxs = 'xxs',
  xs = 'xs',
  sm = 'sm',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
  '3xl' = '3xl',
  '4xl' = '4xl',
  '5xl' = '5xl',
  '6xl' = '6xl',
  '7xl' = '7xl',
  '8xl' = '8xl',
  '9xl' = '9xl',
  '10xl' = '10xl',
}

export type fontSize = { base: number; scale: number } & {
  [key in fontSizeType]: number;
};

export type tokensType = {
  sys: {
    typescale: TextTypescale;
  };
  ref: {
    fontFamilies: { headlines: string; body: string };
    fontWeights: {
      headlines: { bold: string; regular: string };
      body: { bold: string; regular: string };
    };
    fontSize: fontSize;
    letterSpacing: {
      body: string | number;
      headlines: string | number;
      button: string | number;
      captions: string | number;
    };
    lineHeight: {
      headlines: {
        xl: number;
        lg: number;
        default: number;
        sm: number;
      };
      body: {
        relaxed: number;
        default: number;
      };
    };
  };
};

export type Fonts = {
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
  bold: Font;
  semiBold: Font;
};

export type SemanticColor = {
  default: string;
  emphasis: string;
  muted: string;
  subtle: string;
  disabled: string;
};

type Mode = 'adaptive' | 'exact';

export type Theme = {
  dark: boolean;
  mode?: Mode;
  roundness: number;
  colors: {
    primary: SemanticColor; // REMINDER - remove string type after refactoring components (allowing string here so nothing breaks for now)
    secondary: SemanticColor;
    warning: SemanticColor;
    error: SemanticColor;
    info: SemanticColor;
    success: SemanticColor;

    background: string;
    surface: string;
    accent: string;
    text: string;
    onSurface: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    notification: string;

    fg: {
      default: string;
      muted: string;
      subtle: string;
      ['on-accent']: string;
      ['on-disabled']: string;
      disabled: string;
    };
    bg: {
      surface: string;
      muted: string;
      subtle: string;
      canvas: string;
    };

    input: {
      background: string;
      text: string;
      placeholder: string;
      border: { default: string; disabled: string };
      fg: { disabled: string };
    };
    overlay: string;
    border: string;
  };
  fonts: Fonts;
  animation: {
    scale: number;
  };
  typescale: TextTypescale;
  fontFamilies: { headlines: string; body: string };
  fontWeights: {
    headlines: { bold: string; regular: string };
    body: { bold: string; regular: string };
  };
  fontSize: fontSize;
  letterSpacing: {
    body: string | number;
    headlines: string | number;
    button: string | number;
    captions: string | number;
  };
  lineHeight: {
    headlines: {
      xl: number;
      lg: number;
      default: number;
      sm: number;
    };
    body: {
      relaxed: number;
      default: number;
    };
  };
};

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
  React.ComponentPropsWithoutRef<T>,
  'children'
>;

export type EllipsizeProp = 'head' | 'middle' | 'tail' | 'clip';

export type ChipMargin = {
  mt: string | number;
  mr: string | number;
  ml: string | number;
  mb: string | number;
};

declare global {
  namespace PackageX {
    interface ThemeFont {
      fontFamily: string;
      fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
    }
    interface ThemeFonts {
      regular: ThemeFont;
      semiBold: ThemeFont;
      medium: ThemeFont;
      light: ThemeFont;
      thin: ThemeFont;
      bold: ThemeFont;
    }
    interface ThemeColors {
      primary: SemanticColor;
      secondary: SemanticColor;
      warning: SemanticColor;
      error: SemanticColor;
      info: SemanticColor;
      success: SemanticColor;
      fg: {
        default: string;
        muted: string;
        subtle: string;
        ['on-accent']: string;
        ['on-disabled']: string;
        disabled: string;
      };
      bg: {
        surface: string;
        muted: string;
        subtle: string;
        canvas: string;
      };

      input: {
        background: string;
        text: string;
        placeholder: string;
        border: { default: string; disabled: string };
        fg: { disabled: string };
      };
      overlay: string;
      border: string;

      background: string;
      surface: string;
      accent: string;
      text: string;
      onSurface: string;
      disabled: string;
      placeholder: string;
      backdrop: string;
      notification: string;
    }

    interface ThemeAnimation {
      scale: number;
    }

    interface Theme {
      dark: boolean;
      mode?: Mode;
      roundness: number;
      colors: ThemeColors;
      fonts: ThemeFonts;
      animation: ThemeAnimation;
    }
  }
}
