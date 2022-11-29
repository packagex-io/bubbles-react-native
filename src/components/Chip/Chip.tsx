import * as React from 'react';
import {
  AccessibilityState,
  Animated,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import color from 'color';
import Surface from '../Surface';
import Text from '../Typography/Text';
import TouchableRipple from '../TouchableRipple/TouchableRipple.native';
import { withTheme } from '../../core/theming';
import { colors as Colors } from '../../styles/tokens';
import type { EllipsizeProp } from '../../types';

type Props = React.ComponentProps<typeof Surface> & {
  /**
   * Mode of the chip.
   * - `flat` - flat chip without outline.
   * - `outlined` - chip with an outline.
   */
  mode?: 'flat' | 'outlined';
  /**
   * Text content of the `Chip`.
   */
  children: React.ReactNode;
  /**
   * Whether chip is selected.
   */
  selected?: boolean;
  /**
   * Whether to style the chip color as selected.
   */
  selectedColor?: string;
  /**
   * Whether the chip is disabled. A disabled chip is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Accessibility label for the chip. This is read by the screen reader when the user taps the chip.
   */
  accessibilityLabel?: string;
  /**
   * Accessibility label for the close icon. This is read by the screen reader when the user taps the close icon.
   */
  closeIconAccessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Function to execute on long press.
   */
  onLongPress?: () => void;
  /**
   * Function to execute on close button press. The close button appears only when this prop is specified.
   */
  onClose?: () => void;
  /**
   * Style of chip's text
   */
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;

  /**
   * @optional
   */
  theme: PackageX.Theme;
  /**
   * Pass down testID from chip props to touchable for Detox tests.
   */
  testID?: string;
  /**
   * Ellipsize Mode for the children text
   */
  ellipsizeMode?: EllipsizeProp;
  /**
   * theme/color of the button
   */
  color?: string;
};

const Chip = ({
  mode = 'flat',
  children,
  selected = false,
  disabled = false,
  accessibilityLabel,
  textStyle,
  style,
  theme,
  testID,
  selectedColor,
  ellipsizeMode,
  color: chipColor,
  ...rest
}: Props) => {
  const { current: elevation } = React.useRef<Animated.Value>(
    new Animated.Value(0)
  );

  const { dark, colors } = theme;
  const defaultBackgroundColor =
    mode === 'outlined'
      ? 'transparent'
      : dark
      ? '#383838'
      : theme.colors.primary.default;

  const { backgroundColor = defaultBackgroundColor, borderRadius = 8 } =
    (StyleSheet.flatten(style) || {}) as ViewStyle;

  const borderColor =
    mode === 'outlined'
      ? chipColor
        ? chipColor
        : theme.colors.primary.default
      : backgroundColor;

  const textColor = disabled
    ? colors.disabled
    : mode === 'outlined'
    ? chipColor || theme.colors.primary.default
    : Colors.white;

  const backgroundColorString =
    typeof backgroundColor === 'string'
      ? backgroundColor
      : defaultBackgroundColor;
  const selectedBackgroundColor = (
    dark
      ? color(backgroundColorString).lighten(mode === 'outlined' ? 0.2 : 0.4)
      : color(backgroundColorString).darken(mode === 'outlined' ? 0.08 : 0.2)
  )
    .rgb()
    .string();

  const underlayColor = selectedColor
    ? color(selectedColor).fade(0.5).rgb().string()
    : selectedBackgroundColor;

  const accessibilityTraits = ['button'];
  const accessibilityState: AccessibilityState = {
    selected,
    disabled,
  };

  if (selected) {
    accessibilityTraits.push('selected');
  }

  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  return (
    <Surface
      style={
        [
          styles.container,
          {
            elevation: Platform.OS === 'android' ? elevation : 0,
            backgroundColor: selected
              ? selectedBackgroundColor
              : backgroundColor,
            borderColor,
            borderRadius,
          },
          style,
        ] as StyleProp<ViewStyle>
      }
      {...rest}
    >
      <TouchableRipple
        borderless
        delayPressIn={0}
        style={[{ borderRadius }, styles.touchable]}
        underlayColor={underlayColor}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
        accessibilityTraits={accessibilityTraits}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        testID={testID}
      >
        <View style={[styles.content]}>
          <Text
            selectable={false}
            numberOfLines={1}
            style={[
              styles.text,
              {
                ...theme.fonts.bold,
                color: textColor,
                // marginRight: 8,
                // marginLeft: selected ? 4 : 8,
              },
              textStyle,
            ]}
            ellipsizeMode={ellipsizeMode}
          >
            {children}
          </Text>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderStyle: 'solid',
    flexDirection: 'column',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  text: {
    // minHeight: 24,
    // lineHeight: 24,
    textAlignVertical: 'center',
    marginVertical: 4,
    // textTransform: 'uppercase',
    fontSize: 12,
  },
  touchable: {},
});

export default withTheme(Chip);
