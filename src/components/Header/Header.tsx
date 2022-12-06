import * as React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import color from 'color';

import Surface from '../Surface';
import HeaderAction from './HeaderAction';
import HeaderBackAction from './HeaderBackAction';
import HeaderContent from './HeaderContent';

import { withTheme } from '../../core/theming';
import { Theme } from '../../types';
import { colors } from '../../styles/tokens';

export const DEFAULT_APPBAR_HEIGHT = 56;

export type Props = Partial<React.ComponentPropsWithRef<typeof View>> & {
  /**
   * Whether the background color is a dark color. A dark appbar will render light text and vice-versa.
   */
  dark?: boolean;
  /**
   * Content of the `Appbar`.
   */
  children: React.ReactNode;
  /**
   * @supported Available in v5.x with theme version 3
   * Whether Appbar background should have the elevation along with primary color pigment.
   */
  elevated?: boolean;
  /**
   * @supported Available in v5.x
   * Safe area insets for the Appbar. This can be used to avoid elements like the navigation bar on Android and bottom safe area on iOS.
   */
  safeAreaInsets?: {
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
  };
  /**
   * Align title left or center
   */
  align?: 'left' | 'center';
  /**
   * @optional
   */
  theme: Theme;
  style?: StyleProp<ViewStyle>;
};

const Header = ({
  children,
  dark,
  style,
  theme,
  elevated,
  safeAreaInsets,
  align,
  ...rest
}: Props) => {
  const { backgroundColor: customBackground, ...restStyle }: ViewStyle =
    StyleSheet.flatten(style) || {};

  const { dark: isDarkTheme } = theme;
  let isDark: boolean;
  const backgroundColor = customBackground ? customBackground : 'transparent';

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

  let shouldCenterContent = false;
  let shouldAddLeftSpacing = false;
  let shouldAddRightSpacing = false;
  if (Platform.OS === 'ios' || align === 'center') {
    let hasAppbarContent = false;
    let leftItemsCount = 0;
    let rightItemsCount = 0;

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === HeaderContent) {
          hasAppbarContent = true;
        } else if (hasAppbarContent) {
          rightItemsCount++;
        } else {
          leftItemsCount++;
        }
      }
    });

    shouldCenterContent =
      hasAppbarContent && leftItemsCount < 2 && rightItemsCount < 2;
    shouldAddLeftSpacing = shouldCenterContent && leftItemsCount === 0;
    shouldAddRightSpacing = shouldCenterContent && rightItemsCount === 0;
  }

  type RenderAppbarContentProps = {
    children: React.ReactNode;
    isDark: boolean;
    shouldCenterContent?: boolean;
    renderOnly?: React.ReactNode[];
    renderExcept?: React.ReactNode[];
  };

  const renderAppbarContent = ({
    children,
    isDark,
    shouldCenterContent = false,
    renderOnly,
    renderExcept,
  }: RenderAppbarContentProps) => {
    const content = React.Children.toArray(children)
      .filter((child) => child != null && typeof child !== 'boolean')
      .filter((child) =>
        // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
        renderExcept ? !renderExcept.includes(child.type) : child
      )

      .filter(
        (
          child // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
        ) => (renderOnly ? renderOnly.includes(child.type) : child)
      )
      .map((child, i) => {
        if (
          !React.isValidElement(child) ||
          ![HeaderContent, HeaderAction, HeaderBackAction].includes(
            // @ts-expect-error: TypeScript complains about the type of type but it doesn't matter
            child.type
          )
        ) {
          return child;
        }

        const props: {
          color?: string;
          style?: StyleProp<ViewStyle>;
        } = {
          color:
            typeof child.props.color !== 'undefined'
              ? child.props.color
              : isDark
              ? colors.white
              : colors.black,
        };

        if (child.type === HeaderContent) {
          props.style = [
            i !== 0 && {
              marginLeft: 8,
            },
            ,
            shouldCenterContent && styles.centerAlignedContent,
            child.props.style,
          ];
        }
        return React.cloneElement(child, props);
      });

    return content;
  };

  const spacingStyle = styles.spacing;

  const insets = {
    paddingBottom: safeAreaInsets?.bottom,
    paddingTop: safeAreaInsets?.top,
    paddingLeft: safeAreaInsets?.left,
    paddingRight: safeAreaInsets?.right,
  };

  return (
    <Surface
      style={[
        { backgroundColor },
        styles.appbar,
        {
          height: DEFAULT_APPBAR_HEIGHT,
        },
        insets,
        restStyle,
      ]}
      {...rest}
    >
      {shouldAddLeftSpacing ? <View style={spacingStyle} /> : null}

      {renderAppbarContent({
        children,
        isDark,

        shouldCenterContent: align === 'center' || shouldCenterContent,
      })}

      {shouldAddRightSpacing ? <View style={spacingStyle} /> : null}
    </Surface>
  );
};

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    width: '100%',
    marginVertical: 8,
  },
  centerAlignedContent: {
    alignItems: 'center',
  },
  spacing: {
    width: 48,
  },
  v3Spacing: {
    width: 52,
  },
  controlsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightActionControls: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  columnContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 8,
  },
  centerAlignedContainer: {
    paddingTop: 0,
  },
});

export default withTheme(Header);

// @component-docs ignore-next-line
const HeaderWithTheme = withTheme(Header);
// @component-docs ignore-next-line
export { HeaderWithTheme as Header };
