import * as React from "react";
import {
  Animated,
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TextStyle,
  Platform,
} from "react-native";
import color from "color";

import ActivityIndicator from "./ActivityIndicator";
// import Icon, { IconSource } from './Icon';
import Surface from "./Surface";
import Text from "./Typography/Text";
import TouchableRipple from "./TouchableRipple/TouchableRipple.native";
import { colors as Colors } from "../styles/tokens";
import { withTheme } from "../core/theming";

type Props = React.ComponentProps<typeof Surface> & {
  /**
   * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
   * - `text` - flat button without background or outline (low emphasis)
   * - `outlined` - button with an outline (medium emphasis)
   * - `contained` - button with a background color and elevation shadow (high emphasis)
   */
  mode?: "outlined" | "contained";

  /**
   * Use a compact look, useful for `text` buttons in a row.
   */
  compact?: boolean;
  /**
   * Custom text color for flat button, or background color for contained button.
   */
  color?: string;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Label text of the button.
   */
  children: React.ReactNode;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Accessibility hint for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityHint?: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Function to execute on long press.
   */
  onLongPress?: () => void;
  /**
   * Style of button's inner content.
   * Use this prop to apply custom height and width and to set the icon on the right with `flexDirection: 'row-reverse'`.
   */
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the button text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * @optional
   */
  theme: PackageX.Theme;
  /**
   * testID to be used on tests.
   */
  testID?: string;
  /**
   * The top margin in point values.
   */
  mt?: number;

  /**
   * The bottom margin in point values.
   */
  mb?: number;
  /**
   * The button to take the full width of it's parent container.
   */
  wide?: boolean;
};

const Button = ({
  disabled,
  mode = "contained",
  loading,
  color: buttonColor,
  children,
  accessibilityLabel,
  accessibilityHint,
  onPress,
  onLongPress,
  style,
  theme,
  contentStyle,
  labelStyle,
  testID,
  accessible,
  mt = 0,
  mb = 0,
  wide = true,
  ...rest
}: Props) => {
  const { current: elevation } = React.useRef<Animated.Value>(
    new Animated.Value(disabled || mode !== "contained" ? 0 : 2)
  );
  React.useEffect(() => {
    elevation.setValue(disabled || mode !== "contained" ? 0 : 2);
  }, [mode, elevation, disabled]);

  const baseButtonColor = buttonColor
    ? buttonColor
    : theme.colors.primary.default;

  const handlePressIn = () => {
    if (mode === "contained") {
      const { scale } = theme.animation;
      // Animated.timing(elevation, {
      //   toValue: 8,
      //   duration: 200 * scale,
      //   useNativeDriver: true,
      // }).start();
    }
  };

  const handlePressOut = () => {
    if (mode === "contained") {
      const { scale } = theme.animation;
      // Animated.timing(elevation, {
      //   toValue: 2,
      //   duration: 150 * scale,
      //   useNativeDriver: true,
      // }).start();
    }
  };

  const { colors, roundness } = theme;
  const font = theme.fonts.bold;

  let backgroundColor: string,
    borderColor: string,
    textColor: string,
    borderWidth: number;

  if (mode === "contained") {
    if (disabled) {
      backgroundColor = color(theme.dark ? Colors.white : baseButtonColor)
        .alpha(0.12)
        .rgb()
        .string();
    } else if (buttonColor) {
      backgroundColor = buttonColor;
    } else {
      backgroundColor = theme.colors.primary.default;
    }
  } else {
    backgroundColor = "transparent";
  }

  if (mode === "outlined") {
    if (disabled) {
      borderColor = color(baseButtonColor).alpha(0.12).rgb().string();
    } else {
      borderColor = baseButtonColor;
    }
    borderWidth = 3;
  } else {
    borderColor = "transparent";
    borderWidth = 0;
  }
  if (disabled) {
    textColor = color(baseButtonColor).alpha(0.32).rgb().string();
  } else if (mode === "contained") {
    textColor = Colors.white;
  } else {
    textColor = baseButtonColor;
  }

  const rippleColor = color(textColor).alpha(0.32).rgb().string();
  const buttonStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius: roundness,
  };
  const touchableStyle = {
    borderRadius: style
      ? ((StyleSheet.flatten(style) || {}) as ViewStyle).borderRadius ||
      roundness
      : roundness,
  };

  const { color: customLabelColor, fontSize: customLabelSize } =
    StyleSheet.flatten(labelStyle) || {};

  const textStyle = { color: textColor, ...font };
  const iconStyle =
    StyleSheet.flatten(contentStyle)?.flexDirection === "row-reverse"
      ? styles.iconReverse
      : styles.icon;

  return (
    <Surface
      {...rest}
      style={[
        styles.button,
        { elevation },
        buttonStyle,
        { marginTop: mt, marginBottom: mb, width: wide ? "100%" : null },
        style,
      ]}
    >
      <TouchableRipple
        borderless
        delayPressIn={0}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityTraits={disabled ? ["button", "disabled"] : "button"}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessible={accessible}
        disabled={disabled}
        rippleColor={rippleColor}
        style={touchableStyle}
        testID={testID}
      >
        <View style={[styles.content, contentStyle]}>
          {/* {icon && loading !== true ? (
            <View style={iconStyle}>
              <Icon
                source={icon}
                size={customLabelSize ?? 16}
                color={
                  typeof customLabelColor === 'string'
                    ? customLabelColor
                    : textColor
                }
              />
            </View>
          ) : null} */}
          {loading ? (
            <ActivityIndicator
              size={customLabelSize ?? 16}
              color={
                typeof customLabelColor === "string"
                  ? customLabelColor
                  : textColor
              }
              style={iconStyle}
            />
          ) : null}
          <Text
            selectable={false}
            numberOfLines={1}
            style={[styles.label, textStyle, font, labelStyle]}
          >
            {children}
          </Text>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  button: {
    // minWidth: 64,
    borderStyle: "solid",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 18,
    marginRight: -16,
  },
  iconReverse: {
    marginRight: 12,
    marginLeft: -4,
  },
  label: {
    textAlign: "center",
    letterSpacing: 1,
    marginVertical: 16,
    marginHorizontal: 24,
  },
});

export default withTheme(Button);
