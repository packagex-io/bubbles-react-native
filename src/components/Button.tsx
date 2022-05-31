import * as React from 'react';
import {
  Animated,
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import color from 'color';

import ActivityIndicator from './ActivityIndicator';
// import Surface from './Surface';
import Text from './Text';
import { black, white } from '../styles/colors';
import { withTheme } from '../core/theming';

type Props = {
  /**
   * Whether the color is a dark color. A dark button will render light text and vice-versa.
   */
  dark?: boolean;
  /**
   * Use a compact look, useful for `text` buttons in a row.
   */
  compact?: boolean;
  /**
   * Use a compact look, useful for `text` buttons in a row.
   */
  wide?: boolean;
  /**
   * Pass true if you want the button to take the full width of it's parent container.
   */
  color?: string;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Label text of the button.
   */
  children: React.ReactNode;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Accessibility hint for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityHint?: string;
  /**
   * The top margin in rem values.
   */
  mt?: number;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Function to execute on long press.
   */
  onLongPress?: () => void;
  /**
   * Style of button's inner content.
   * Use this prop to apply custom height and width and to set the icon on the right with `flexDirection: 'row-reverse'`.
   */
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the button text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * @optional
   */
  theme: ProjectX.Theme;
  /**
   * testID to be used on tests.
   */
  testID?: string;
};

/**
 * A button is component that the user can press to trigger an action.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/button-1.png" />
 *     <figcaption>Text button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-2.png" />
 *     <figcaption>Outlined button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-3.png" />
 *     <figcaption>Contained button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Button>
 * );
 *
 * export default MyComponent;
 * ```
 */
const Button = ({
  disabled,
  compact,
  dark,
  loading,
  color: buttonColor,
  children,
  accessibilityLabel,
  accessibilityHint,
  onPress,
  onLongPress,
  style,
  theme,
  contentStyle,
  labelStyle,
  testID,
  wide,
  ...rest
}: Props) => {
  const handlePressIn = () => {};

  const handlePressOut = () => {};

  const { colors, roundness } = theme;
  const font = theme.fonts.medium;

  let backgroundColor: string,
    borderColor: string,
    textColor: string,
    borderWidth: number;

  if (disabled) {
    backgroundColor = color(theme.dark ? white : black)
      .alpha(0.12)
      .rgb()
      .string();
  } else if (buttonColor) {
    backgroundColor = buttonColor;
  } else {
    backgroundColor = colors.primary;
  }

  borderColor = 'transparent';
  borderWidth = 0;

  if (disabled) {
    textColor = color(theme.dark ? white : black)
      .alpha(0.32)
      .rgb()
      .string();
  } else {
    let isDark;

    if (typeof dark === 'boolean') {
      isDark = dark;
    } else {
      isDark =
        backgroundColor === 'transparent'
          ? false
          : !color(backgroundColor).isLight();
    }

    textColor = isDark ? white : black;
  }

  const buttonStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius: roundness,
  };

  const { color: customLabelColor, fontSize: customLabelSize } =
    StyleSheet.flatten(labelStyle) || {};

  const textStyle = { color: textColor, ...font };
  const iconStyle =
    StyleSheet.flatten(contentStyle)?.flexDirection === 'row-reverse'
      ? styles.iconReverse
      : styles.icon;

  return (
    <View
      style={[wide && styles.wide, styles.content, contentStyle, buttonStyle]}
    >
      {loading ? (
        <ActivityIndicator
          size={customLabelSize ?? 16}
          color={
            typeof customLabelColor === 'string' ? customLabelColor : textColor
          }
          style={iconStyle}
        />
      ) : null}
      <Text
        selectable={false}
        numberOfLines={1}
        style={[
          styles.label,
          compact && styles.compactLabel,
          textStyle,
          font,
          labelStyle,
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 64,
    borderStyle: 'solid',
  },
  wide: { width: '100%' },
  compact: {
    minWidth: 'auto',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 12,
    marginRight: -4,
  },
  iconReverse: {
    marginRight: 12,
    marginLeft: -4,
  },
  label: {
    textAlign: 'center',
    letterSpacing: 1,
    marginVertical: 9,
    marginHorizontal: 16,
  },
  compactLabel: {
    marginHorizontal: 8,
  },
});

export default withTheme(Button);
