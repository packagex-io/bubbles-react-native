import * as React from 'react';
import {
  ViewStyle,
  StyleSheet,
  StyleProp,
  GestureResponderEvent,
  TouchableWithoutFeedback,
} from 'react-native';

import TouchableRipple from '../TouchableRipple/TouchableRipple.native';
import Icon, { IconSource } from '../Icon';
import { withTheme } from '../../core/theming';
import type { $RemoveChildren, Theme } from '../../types';
import { getIconButtonColor } from './utils';
import Surface from '../Surface';

const PADDING = 12;

type IconButtonMode = 'outlined' | 'contained' | 'contained-tonal';

type Props = $RemoveChildren<typeof TouchableRipple> & {
  /**
   * Icon to display.
   */
  icon: IconSource;
  /**
   * @supported Available in v5.x
   * Mode of the icon button. By default there is no specified mode - only pressable icon will be rendered.
   */
  mode?: IconButtonMode;
  /**
   * Color of the icon.
   */
  iconColor?: string;
  /**
   * Background color of the icon container.
   */
  containerColor?: string;
  /**
   * Whether icon button is selected. A selected button receives alternative combination of icon and container colors.
   */
  selected?: boolean;
  /**
   * Size of the icon.
   */
  size?: number;
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Whether an icon change is animated.
   */
  animated?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<TouchableWithoutFeedback>;
  /**
   * @optional
   */
  theme: Theme;
};

const IconButton = ({
  icon,
  iconColor: customIconColor,
  containerColor: customContainerColor,
  size = 24,
  accessibilityLabel,
  disabled,
  onPress,
  selected = false,
  animated = false,
  mode,
  theme,
  style,
  ...rest
}: Props) => {
  const IconComponent = Icon; //if animatd pick a diff one - like CrossFade

  const { iconColor, rippleColor, backgroundColor, borderColor } =
    getIconButtonColor({
      theme,
      disabled,
      selected,
      mode,
      customIconColor,
      customContainerColor,
    });

  const buttonSize = size + 2 * PADDING;

  const borderStyles = {
    // borderRadius: buttonSize / 2,
    borderRadius: 12,
    borderColor,
  };

  return (
    <Surface
      style={
        [
          {
            backgroundColor,
            width: buttonSize,
            height: buttonSize,
          },
          styles.container,
          borderStyles,
          disabled && styles.disabled,
          style,
        ] as StyleProp<ViewStyle>
      }
      {...{ elevation: 0 }}
    >
      <TouchableRipple
        borderless
        centered
        onPress={onPress}
        rippleColor={rippleColor}
        accessibilityLabel={accessibilityLabel}
        style={styles.touchable}
        accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        disabled={disabled}
        hitSlop={
          TouchableRipple.supported
            ? { top: 10, left: 10, bottom: 10, right: 10 }
            : { top: 6, left: 6, bottom: 6, right: 6 }
        }
        {...rest}
      >
        <IconComponent color={iconColor} source={icon} size={size} />
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    margin: 6,
    elevation: 0,
  },
  touchable: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.32,
  },
});

export default withTheme(IconButton);
