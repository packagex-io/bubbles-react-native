import * as React from 'react';
import {
  Animated,
  Easing,
  NativeModules,
  Platform,
  StyleProp,
  Switch as NativeSwitch,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {withTheme} from '../../core/theming';
import type {Theme} from '../../types';
import useAnimatedValue from '../../utils/useAnimatedValue';
import TouchableRippleNative from '../TouchableRipple/TouchableRipple.native';
import {getSwitchColor} from './utils';

const version = NativeModules.PlatformConstants
  ? NativeModules.PlatformConstants.reactNativeVersion
  : undefined;

type Props = React.ComponentPropsWithRef<typeof NativeSwitch> & {
  /**
   * Disable toggling the switch.
   */
  disabled?: boolean;
  /**
   * Value of the switch, true means 'on', false means 'off'.
   */
  value?: boolean;
  /**
   * Custom color for switch.
   */
  color?: string;
  /**
   * Callback called with the new value when it changes.
   */
  onValueChange?: Function;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

const KNOB_OFFSET = 36;

const Switch = ({
  value,
  disabled,
  onValueChange,
  color,
  theme,
  ...rest
}: Props) => {
  const xPosiiton = useAnimatedValue(value ? KNOB_OFFSET : 0);

  React.useEffect(() => {
    Animated.timing(xPosiiton, {
      toValue: value ? KNOB_OFFSET : 0,
      easing: Easing.elastic(0.7),
      duration: 100,
      useNativeDriver: true,
    }).start();
    return () => {};
  }, [value]);

  return (
    <View>
      <TouchableHighlight
        underlayColor={theme.colors.bg.subtle}
        style={{
          width: 64,
          height: 24,
          borderRadius: KNOB_OFFSET,
          padding: 4,
          backgroundColor: theme.colors.bg.subtle,
          justifyContent: 'center',
        }}
        onPress={disabled ? undefined : onValueChange}
      >
        <Animated.View
          style={{
            width: 20,
            height: 20,
            borderRadius: 32,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [
              {
                translateX: xPosiiton,
              },
            ],
          }}
        >
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: value
                ? theme.colors.primary.default
                : theme.colors.fg.subtle,
              borderRadius: 16,
            }}
          />
        </Animated.View>
      </TouchableHighlight>
    </View>
  );
};

export default withTheme(Switch);
