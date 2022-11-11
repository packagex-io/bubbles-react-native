import color from 'color';
import type { Theme } from '../../types';

type IconButtonMode = 'outlined' | 'contained' | 'contained-tonal';

type BaseProps = {
  theme: Theme;
  isMode: (mode: IconButtonMode) => boolean;
  disabled?: boolean;
  selected?: boolean;
};

const getBorderColor = ({
  theme,
  disabled,
}: {
  theme: Theme;
  disabled?: boolean;
}) => {
  return undefined;
};

const getBackgroundColor = ({
  theme,
  isMode,
  disabled,
  selected,
  customContainerColor,
}: BaseProps & { customContainerColor?: string }) => {
  if (typeof customContainerColor !== 'undefined') {
    return customContainerColor;
  }

  return theme.colors.bg.canvas;
};

const getIconColor = ({
  theme,
  isMode,
  disabled,
  selected,
  customIconColor,
}: BaseProps & { customIconColor?: string }) => {
  if (typeof customIconColor !== 'undefined') {
    return customIconColor;
  }

  return theme.colors.fg.default;
};

const getRippleColor = ({
  theme,
  iconColor,
}: {
  theme: Theme;
  iconColor: string;
}) => {
  return color(iconColor).alpha(0.32).rgb().string();
};

export const getIconButtonColor = ({
  theme,
  disabled,
  mode,
  selected,
  customIconColor,
  customContainerColor,
}: {
  theme: Theme;
  disabled?: boolean;
  selected?: boolean;
  mode?: IconButtonMode;
  customIconColor?: string;
  customContainerColor?: string;
}) => {
  const isMode = (modeToCompare: IconButtonMode) => {
    return mode === modeToCompare;
  };

  const baseIconColorProps = {
    theme,
    isMode,
    disabled,
    selected,
  };

  const iconColor = getIconColor({
    ...baseIconColorProps,
    customIconColor,
  });

  return {
    iconColor,
    backgroundColor: getBackgroundColor({
      ...baseIconColorProps,
      customContainerColor,
    }),
    rippleColor: getRippleColor({ theme, iconColor }),
    borderColor: getBorderColor({ theme, disabled }),
  };
};
