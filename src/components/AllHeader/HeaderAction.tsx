import * as React from 'react';
import type {
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

import color from 'color';

import type { IconSource } from '../Icon';
import IconButton from '../IconButton/IconButton';
import { colors } from '../../styles/tokens';
import { useTheme } from '../../core/theming';

export type Props = React.ComponentPropsWithoutRef<typeof IconButton> & {
  /**
   *  Custom color for action icon.
   */
  color?: string;
  /**
   * Name of the icon to show.
   */
  icon: IconSource;
  /**
   * Optional icon size.
   */
  size?: number;
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * @supported Available in v5.x with theme version 3
   *
   * Whether it's the leading button.
   */
  isLeading?: boolean;
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<TouchableWithoutFeedback>;
};

/**
 * A component used to display an action item in the appbar.
 * <div class="screenshots">
 *   <img class="small" src="screenshots/appbar-action-android.png" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Appbar } from 'react-native-paper';
 * import { Platform } from 'react-native';
 *
 * const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
 *
 * const MyComponent = () => (
 *     <Appbar.Header>
 *        <Appbar.Content title="Title" subtitle={'Subtitle'} />
 *         <Appbar.Action icon="magnify" onPress={() => {}} />
 *         <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
 *     </Appbar.Header>
 * );
 *
 * export default MyComponent;
 * ```
 */
const HeaderAction = ({
  size = 24,
  color: iconColor,
  icon,
  disabled,
  onPress,
  accessibilityLabel,
  isLeading,
  ...rest
}: Props) => {
  const theme = useTheme();

  const actionIconColor = iconColor ? iconColor : theme.colors.fg.default;

  return (
    <IconButton
      size={size}
      onPress={onPress}
      iconColor={actionIconColor}
      icon={icon}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      animated
      {...rest}
    />
  );
};

HeaderAction.displayName = 'Header.Action';

export default HeaderAction;

// @component-docs ignore-next-line
export { HeaderAction };
