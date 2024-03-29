import color from 'color';

import { colors } from '../../styles/tokens';
import type { Theme } from '../../types';
import type { IconSource } from '../Icon';

export const MIN_WIDTH = 112;
export const MAX_WIDTH = 280;

type ContentProps = {
  isV3: boolean;
  iconWidth: number;
  leadingIcon?: IconSource;
  trailingIcon?: IconSource;
};

type ColorProps = {
  theme: Theme;
  disabled?: boolean;
};

const getDisabledColor = (theme: Theme) => {
  return color(theme.dark ? colors.white : colors.black)
    .alpha(0.32)
    .rgb()
    .string();
};

const getTitleColor = ({ theme, disabled }: ColorProps) => {
  if (disabled) {
    return getDisabledColor(theme);
  }

  return color(theme.colors.text).alpha(0.87).rgb().string();
};

const getIconColor = ({ theme, disabled }: ColorProps) => {
  if (disabled) {
    return getDisabledColor(theme);
  }

  return color(theme.colors.text).alpha(0.54).rgb().string();
};

export const getMenuItemColor = ({ theme, disabled }: ColorProps) => {
  return {
    titleColor: getTitleColor({ theme, disabled }),
    iconColor: getIconColor({ theme, disabled }),
    underlayColor: undefined,
  };
};

export const getContentMaxWidth = ({
  isV3,
  iconWidth,
  leadingIcon,
  trailingIcon,
}: ContentProps) => {
  if (isV3) {
    if (leadingIcon && trailingIcon) {
      return MAX_WIDTH - (2 * iconWidth + 24);
    }

    if (leadingIcon || trailingIcon) {
      return MAX_WIDTH - (iconWidth + 24);
    }

    return MAX_WIDTH - 12;
  }

  if (leadingIcon) {
    return MAX_WIDTH - (iconWidth + 48);
  }

  return MAX_WIDTH - 16;
};
