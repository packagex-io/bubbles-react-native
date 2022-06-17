import * as React from 'react';
import { Platform, Text } from 'react-native';
import { withTheme } from '../../core/theming';
import { Animated, View, StyleSheet } from 'react-native';
import color from 'color';
import type { $RemoveChildren } from '../../types';
import TouchableRippleNative from '../TouchableRipple/TouchableRipple.native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  /**
   * Status of checkbox.
   */
  status: 'checked' | 'unchecked' | 'indeterminate';
  /**
   * Whether checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Custom color for unchecked checkbox.
   */
  uncheckedColor?: string;
  /**
   * Custom color for checkbox.
   */
  color?: string;
  /**
   * @optional
   */
  theme: PackageX.Theme;
  /**
   * testID to be used on tests.
   */
  testID?: string;
};

// From https://material.io/design/motion/speed.html#duration
const ANIMATION_DURATION = 100;

/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for Android, but can be used
 * on any platform.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/checkbox-enabled.android.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/checkbox-disabled.android.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
const Checkbox = ({
  status,
  theme,
  disabled,
  onPress,
  testID,
  ...rest
}: Props) => {
  const { current: scaleAnim } = React.useRef<Animated.Value>(
    new Animated.Value(1)
  );
  const isFirstRendering = React.useRef<boolean>(true);

  const {
    animation: { scale },
  } = theme;

  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }

    const checked = status === 'checked';

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: checked ? ANIMATION_DURATION * scale : 0,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: checked
          ? ANIMATION_DURATION * scale
          : ANIMATION_DURATION * scale * 1.75,
        useNativeDriver: false,
      }),
    ]).start();
  }, [status, scaleAnim, scale]);

  const checked = status === 'checked';
  const indeterminate = status === 'indeterminate';
  const checkedColor = rest.color || theme.colors.primary;
  const uncheckedColor =
    rest.uncheckedColor ||
    color(theme.colors.text)
      .alpha(theme.dark ? 0.7 : 0.54)
      .rgb()
      .string();

  let rippleColor, checkboxColor;

  if (disabled) {
    rippleColor = color(theme.colors.text).alpha(0.16).rgb().string();
    checkboxColor = theme.colors.disabled;
  } else {
    rippleColor = color(checkedColor).fade(0.32).rgb().string();
    checkboxColor = checked ? checkedColor : uncheckedColor;
  }

  const borderWidth = scaleAnim.interpolate({
    inputRange: [0.8, 1],
    outputRange: [7, 0],
  });

  const icon = indeterminate
    ? 'minus-box'
    : checked
    ? 'checkbox-marked'
    : 'checkbox-blank-outline';

  return (
    <TouchableRippleNative
      {...rest}
      borderless
      rippleColor={rippleColor}
      onPress={onPress}
      disabled={disabled}
      // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
      accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
      accessibilityComponentType="button"
      accessibilityRole="checkbox"
      accessibilityState={{ disabled, checked }}
      accessibilityLiveRegion="polite"
      style={styles.container}
      testID={testID}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {/* <MaterialCommunityIcon
          allowFontScaling={false}
          name={icon}
          size={24}
          color={checkboxColor}
          direction="ltr"
        /> */}
        <Icon
          name={icon}
          size={24}
          direction="ltr"
          color={checkboxColor}
          allowFontScaling={false}
        />
        <View style={[StyleSheet.absoluteFill, styles.fillContainer]}>
          <Animated.View
            style={[
              styles.fill,
              { borderColor: checkboxColor },
              { borderWidth },
            ]}
          />
        </View>
      </Animated.View>
    </TouchableRippleNative>
  );
};

Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    width: 36,
    height: 36,
    padding: 6,
  },
  fillContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    height: 14,
    width: 14,
  },
});

export default withTheme(Checkbox);

// @component-docs ignore-next-line
const CheckboxWithTheme = withTheme(Checkbox);
// @component-docs ignore-next-line
export { CheckboxWithTheme as Checkbox };
