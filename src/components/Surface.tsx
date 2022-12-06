import * as React from "react";
import { Animated, StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import shadow from "../styles/shadow";
import { withTheme } from "../core/theming";
import overlay from "../styles/overlay";

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Content of the `Surface`.
   */
  children: React.ReactNode;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  /**
   * @optional
   */
  theme: PackageX.Theme;
};

const Surface = React.forwardRef<any, Props>((props, ref) => {
  const { style, theme, ...rest } = props;
  const { elevation = 0 } = (StyleSheet.flatten(style) || {}) as ViewStyle;
  const { dark: isDarkTheme, mode, colors } = theme;
  return (
    <Animated.View
      ref={ref}
      {...rest}
      style={[
        {
          backgroundColor:
            isDarkTheme && mode === "adaptive"
              ? overlay(elevation, colors.surface)
              : colors.surface,
        },
        elevation ? shadow(elevation) : null,
        style,
      ]}
    />
  );
});

export default withTheme(Surface);
