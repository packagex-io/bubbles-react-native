import { Platform } from 'react-native';
import setColor from 'color';

import type { Theme } from '../../types';
import { colors } from '../../styles/tokens';

type BaseProps = {
  theme: Theme;
  disabled?: boolean;
  value?: boolean;
};

const getCheckedColor = ({
  theme,
  color,
}: {
  theme: Theme;
  color?: string;
}) => {
  if (color) {
    return color;
  }

  return theme.colors.primary.default;
};

const getThumbTintColor = ({
  theme,
  disabled,
  value,
  checkedColor,
}: BaseProps & { checkedColor: string }) => {
  const isIOS = Platform.OS === 'ios';

  if (isIOS) {
    return undefined;
  }

  if (disabled) {
    if (theme.dark) {
      return colors.gray800;
    }
    return colors.gray400;
  }

  if (value) {
    return checkedColor;
  }

  if (theme.dark) {
    return colors.gray400;
  }
  return colors.gray50;
};

const getOnTintColor = ({
  theme,
  disabled,
  value,
  checkedColor,
}: BaseProps & { checkedColor: string }) => {
  const isIOS = Platform.OS === 'ios';

  if (isIOS) {
    return checkedColor;
  }

  if (disabled) {
    if (theme.dark) {
      return setColor(colors.white).alpha(0.06).rgb().string();
    }
    return setColor(colors.black).alpha(0.12).rgb().string();
  }

  if (value) {
    return setColor(checkedColor).alpha(0.5).rgb().string();
  }

  if (theme.dark) {
    return colors.gray700;
  }
  return 'rgb(178, 175, 177)';
};

export const getSwitchColor = ({
  theme,
  disabled,
  value,
  color,
}: BaseProps & { color?: string }) => {
  const checkedColor = getCheckedColor({ theme, color });

  return {
    onTintColor: getOnTintColor({ theme, disabled, value, checkedColor }),
    thumbTintColor: getThumbTintColor({ theme, disabled, value, checkedColor }),
    checkedColor,
  };
};
