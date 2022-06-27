import * as React from 'react';
import { Platform, I18nManager, View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderCloseIcon = ({ size, color }: { size: number; color: string }) => {
  const iosIconSize = size - 3;

  return Platform.OS === 'ios' ? (
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
});

export default HeaderCloseIcon;

// @component-docs ignore-next-line
export { HeaderCloseIcon };
