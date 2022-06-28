import * as React from 'react';
import { Platform, I18nManager, View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Surface from '../Surface';
import TouchableRippleNative from '../TouchableRipple/TouchableRipple.native';

type Props = React.ComponentPropsWithoutRef<typeof Surface> & {
  /**
   *  Custom color for icon.
   */
  color?: string;
  /**
   * Optional icon size.
   */
  size?: number;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
};

const HeaderCloseIcon = ({
  size = 24,
  color,
  onPress = () => null,
  accessibilityLabel,
}: Props) => {
  const iosIconSize = size - 3;

  return (
    <TouchableRippleNative
      borderless
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      style={styles.touchable}
      rippleColor={'#F9F9F9'}
      // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
      accessibilityTraits={'button'}
      accessibilityComponentType="button"
      accessibilityRole="button"
      hitSlop={
        TouchableRippleNative.supported
          ? { top: 10, left: 10, bottom: 10, right: 10 }
          : { top: 6, left: 6, bottom: 6, right: 6 }
      }
    >
      {Platform.OS === 'ios' ? (
        <View
          style={[
            styles.wrapper,
            {
              width: size + 14,
              height: size + 14,
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
            },
          ]}
        >
          <Image
            source={require('../../assets/close.png')}
            style={[
              styles.icon,
              { tintColor: color, width: iosIconSize, height: iosIconSize },
            ]}
          />
        </View>
      ) : (
        <View
          style={[
            styles.wrapper,
            {
              width: size + 14,
              height: size + 14,
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
            },
          ]}
        >
          <Icon
            name="close"
            color={color}
            size={size}
            direction={I18nManager.isRTL ? 'rtl' : 'ltr'}
          />
        </View>
      )}
    </TouchableRippleNative>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  icon: {
    resizeMode: 'contain',
  },
  touchable: {
    // flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderCloseIcon;

// @component-docs ignore-next-line
export { HeaderCloseIcon };
