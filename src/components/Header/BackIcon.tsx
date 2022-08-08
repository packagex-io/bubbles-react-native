import * as React from 'react';
import { Platform, I18nManager, View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DefaultTheme from '../../styles/DefaultTheme';

const HeaderBackIcon = ({
  size,
  color = DefaultTheme.colors.fg.default,
}: {
  size: number;
  color: string;
}) => {
  const iosIconSize = size - 3;

  return Platform.OS === 'ios' ? (
    <View
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
        },
      ]}
    >
      <Image
        source={require('../../assets/back-chevron.png')}
        style={[
          styles.icon,
          { tintColor: color, width: iosIconSize, height: iosIconSize },
        ]}
      />
    </View>
  ) : (
    <Icon
      name="chevron-left"
      color={color}
      size={size}
      direction={I18nManager.isRTL ? 'rtl' : 'ltr'}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
});

export default HeaderBackIcon;

// @component-docs ignore-next-line
export { HeaderBackIcon };
