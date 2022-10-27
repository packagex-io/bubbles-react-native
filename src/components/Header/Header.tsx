import * as React from 'react';
import {View, ViewStyle, Platform, StyleSheet, StyleProp} from 'react-native';
import color from 'color';

import Surface from '../Surface';
import {withTheme} from '../../core/theming';
import {colors as Colors} from '../../styles/tokens';
import overlay from '../../styles/overlay';
import Text from '../Typography/Text';
import HeaderBackIcon from './BackIcon';
import HeaderCloseIcon from './CloseIcon';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
type Props = Partial<React.ComponentPropsWithRef<typeof View>> &
  React.ComponentProps<typeof Breadcrumbs> & {
    /**
     * Whether the background color is a dark color. A dark appbar will render light text and vice-versa.
     */
    dark?: boolean;
    /**
     * Icons of the `Appbar`.
     */
    children: React.ReactNode;
    /**
     * @optional
     */
    theme: PackageX.Theme;
    style?: StyleProp<ViewStyle>;
    /**
     * Text for the title.
     */
    title: React.ReactNode;
    /**
     * Custom color for the text.
     */
    color?: string;
    /**
     * Center title text in the Header
     */
    centerText?: boolean;
  };

export const DEFAULT_APPBAR_HEIGHT = 56;

const Header = ({
  children,
  dark,
  style,
  theme,
  color: titleColor = Colors.black,
  centerText = false,
  title,
  breadcrumbs,
  breadcrumb_labels,
  ...rest
}: Props) => {
  const {colors, dark: isDarkTheme, mode, fonts} = theme;
  const {
    backgroundColor: customBackground,
    elevation = 0,
    ...restStyle
  }: ViewStyle = StyleSheet.flatten(style) || {};

  let isDark: boolean;

  const backgroundColor = customBackground
    ? customBackground
    : isDarkTheme && mode === 'adaptive'
    ? overlay(elevation, colors.surface)
    : 'transparent';
  if (typeof dark === 'boolean') {
    isDark = dark;
  } else {
    isDark =
      backgroundColor === 'transparent'
        ? false
        : typeof backgroundColor === 'string'
        ? !color(backgroundColor).isLight()
        : true;
  }

  return (
    <View style={{width: '100%'}}>
      <Surface
        style={[{backgroundColor}, styles.appbar, {elevation}, restStyle]}
        {...rest}
      >
        <View style={[styles.container, style]} {...rest}>
          {React.Children.toArray(children)
            .filter(child => child != null && typeof child !== 'boolean')
            .filter(child => [HeaderBackIcon].includes(child.type))
            .map((child, i) => {
              return child;
            })}

          <Text
            variant="Display"
            style={[
              {
                color: titleColor,
                ...fonts.bold,
                marginLeft: 32,
                textAlign: centerText ? 'center' : 'left',
              },
              styles.title,
              Platform.OS === 'web' && {fontFamily: 'Inter', fontWeight: 700},
            ]}
            numberOfLines={1}
            accessible
            accessibilityTraits="header"
            accessibilityRole={'header'}
          >
            {title}
          </Text>
          {React.Children.toArray(children)
            .filter(child => child != null && typeof child !== 'boolean')
            .filter(child => [HeaderCloseIcon].includes(child.type))
            .map((child, i) => {
              return child;
            })}
        </View>
      </Surface>
      <View style={{paddingLeft: 78}}>
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          breadcrumb_labels={breadcrumb_labels}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    height: DEFAULT_APPBAR_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 4,
    elevation: 0,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: '#CCCDD3',
  },
  spacing: {
    width: 48,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
});

export default withTheme(Header);

// @component-docs ignore-next-line
const HeaderWithTheme = withTheme(Header);
// @component-docs ignore-next-line
export {HeaderWithTheme as Header};
