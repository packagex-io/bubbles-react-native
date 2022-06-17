import * as React from 'react';
import { Platform } from 'react-native';
import { withTheme } from '../../core/theming';
import { Animated, View, StyleSheet } from 'react-native';
import color from 'color';
import { RadioButtonContext, RadioButtonContextType } from './RadioButtonGroup';
import TouchableRipple from '../TouchableRipple/TouchableRipple';
import type { $RemoveChildren } from '../../types';
import { white } from '../../styles/colors';

export const handlePress = ({
  onPress,
  value,
  onValueChange,
}: {
  onPress?: () => void;
  value: string;
  onValueChange?: (value: string) => void;
}) => {
  if (onPress && onValueChange) {
    console.warn(
      `onPress in the scope of RadioButtonGroup will not be executed, use onValueChange instead`
    );
  }

  onValueChange ? onValueChange(value) : onPress?.();
};

export const isChecked = ({
  value,
  status,
  contextValue,
}: {
  value: string;
  status?: 'checked' | 'unchecked';
  contextValue?: string;
}) => {
  if (contextValue !== undefined && contextValue !== null) {
    return contextValue === value ? 'checked' : 'unchecked';
  } else {
    return status;
  }
};

export type Props = {
  /**
   * Value of the radio button
   */
  value: string;
  /**
   * Status of radio button.
   */
  status?: 'checked' | 'unchecked';
  /**
   * Whether radio is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Custom color for unchecked radio.
   */
  uncheckedColor?: string;
  /**
   * Custom color for radio.
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

const BORDER_WIDTH = 2;
const RadioButton = ({
  disabled,
  onPress,
  theme,
  value,
  status,
  testID,
  ...rest
}: Props) => {
  const { current: borderAnim } = React.useRef<Animated.Value>(
    new Animated.Value(BORDER_WIDTH)
  );

  const { current: radioAnim } = React.useRef<Animated.Value>(
    new Animated.Value(1)
  );

  const isFirstRendering = React.useRef<boolean>(true);

  const { scale } = theme.animation;

  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }

    if (status === 'checked') {
      radioAnim.setValue(1.2);

      Animated.timing(radioAnim, {
        toValue: 1,
        duration: 150 * scale,
        useNativeDriver: true,
      }).start();
    } else {
      borderAnim.setValue(10);

      Animated.timing(borderAnim, {
        toValue: BORDER_WIDTH,
        duration: 150 * scale,
        useNativeDriver: false,
      }).start();
    }
  }, [status, borderAnim, radioAnim, scale]);

  const checkedColor = rest.color || theme.colors.primary;
  const uncheckedColor = rest.uncheckedColor || '#CCCDD3';

  let rippleColor: string, radioColor: string;

  return (
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        const checked =
          isChecked({
            contextValue: context?.value,
            status,
            value,
          }) === 'checked';

        if (disabled) {
          rippleColor = color(theme.colors.text).alpha(0.16).rgb().string();
          radioColor = theme.colors.disabled;
        } else {
          rippleColor = color(checkedColor).fade(0.32).rgb().string();
          radioColor = checked ? checkedColor : uncheckedColor;
        }

        return (
          <TouchableRipple
            {...rest}
            borderless
            rippleColor={rippleColor}
            onPress={
              disabled
                ? undefined
                : () => {
                    handlePress({
                      onPress,
                      onValueChange: context?.onValueChange,
                      value,
                    });
                  }
            }
            // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
            accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
            accessibilityComponentType={
              checked ? 'radiobutton_checked' : 'radiobutton_unchecked'
            }
            accessibilityRole="radio"
            accessibilityState={{ disabled, checked }}
            accessibilityLiveRegion="polite"
            style={styles.container}
            testID={testID}
          >
            <Animated.View
              style={[
                styles.radio,
                {
                  borderColor: radioColor,
                  borderWidth: borderAnim,
                  backgroundColor: radioColor,
                },
              ]}
            >
              {checked ? (
                <View style={[StyleSheet.absoluteFill, styles.radioContainer]}>
                  <Animated.View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: white,
                        transform: [{ scale: radioAnim }],
                      },
                    ]}
                  />
                </View>
              ) : null}
            </Animated.View>
          </TouchableRipple>
        );
      }}
    </RadioButtonContext.Consumer>
  );
};

RadioButton.displayName = 'RadioButton';

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 8,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});

export default withTheme(RadioButton);

// @component-docs ignore-next-line
const RadioButtonWithTheme = withTheme(RadioButton);
// @component-docs ignore-next-line
export { RadioButtonWithTheme as RadioButton };
