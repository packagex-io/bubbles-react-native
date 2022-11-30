import * as React from "react";
import {
  Animated,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Easing,
} from "react-native";

import Button from "../Button";
import Surface from "../Surface";
import Text from "../Typography/Text";
import { withTheme } from "../../core/theming";
import type { Theme } from "../../types";
import { colors } from "../../styles/tokens";
import IconButton from "../IconButton/IconButton";
import color from "color";

export type ToastProps = React.ComponentProps<typeof Surface> & {
  /**
   * Whether the Snackbar is currently visible.
   */
  visible: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * The duration for which the Snackbar is shown.
   */
  duration?: number;
  /**
   * Callback called when Snackbar is dismissed. The `visible` prop needs to be updated when this is called.
   */
  onDismiss: () => void;
  /**
   * Text content of the Snackbar.
   */
  children: React.ReactNode;
  /**
   * Style for the wrapper of the snackbar
   */
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  /**
   * Background color of the toast
   */
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "light"
    | "dark";
  /**
   * @optional
   */
  theme: Theme;
};

const DURATION_SHORT = 4000;
const DURATION_MEDIUM = 7000;
const DURATION_LONG = 10000;

const Toast = ({
  visible,
  onPress: onPressAction,
  duration = DURATION_MEDIUM,
  onDismiss,
  children,
  wrapperStyle,
  style,
  theme,
  ...rest
}: ToastProps) => {
  const { current: opacity } = React.useRef<Animated.Value>(
    new Animated.Value(0.0)
  );
  const [hidden, setHidden] = React.useState<boolean>(!visible);

  const hideTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const { scale } = theme.animation;

  React.useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  React.useLayoutEffect(() => {
    if (visible) {
      // show
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setHidden(false);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200 * scale,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const isInfinity =
            duration === Number.POSITIVE_INFINITY ||
            duration === Number.NEGATIVE_INFINITY;

          if (finished && !isInfinity) {
            hideTimeout.current = setTimeout(
              onDismiss,
              duration
            ) as unknown as NodeJS.Timeout;
          }
        }
      });
    } else {
      // hide
      if (hideTimeout.current) clearTimeout(hideTimeout.current);

      Animated.timing(opacity, {
        toValue: 0,
        duration: 100 * scale,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setHidden(true);
      });
    }
  }, [visible, duration, opacity, scale, onDismiss]);

  if (hidden) return null;

  const marginRight = 16;
  const textColor = colors.white;

  const getColorForToast = () => {
    switch (rest.color) {
      case "primary":
        return theme.colors.primary.default;
      case "secondary":
        return theme.colors.secondary.default;
      case "success":
        return theme.colors.success.default;
      case "warning":
        return theme.colors.warning.default;
      case "error":
        return theme.colors.error.default;
      case "info":
        return theme.colors.info.default;
      case "light":
        return colors.gray100;
      case "dark":
        return colors.gray800;

      default:
        return theme.colors.primary.default;
    }
  };
  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={[styles.wrapper, wrapperStyle]}
    >
      <Surface
        pointerEvents="box-none"
        accessibilityLiveRegion="polite"
        style={
          [
            styles.elevation,
            styles.container,
            {
              borderRadius: 8,
              opacity: opacity,
              transform: [
                {
                  scale: visible
                    ? opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                      })
                    : 1,
                },
              ],
            },
            { backgroundColor: getColorForToast() },
            style,
          ] as StyleProp<ViewStyle>
        }
        {...{ elevation: 2 }}
        {...rest}
      >
        <Text style={[styles.content, { marginRight, color: colors.white }]}>
          {children}
        </Text>
        <IconButton
          icon="close"
          iconColor={color(getColorForToast()).isDark() ? "white" : "black"}
          size={20}
          onPress={onDismiss}
          containerColor="transparent"
        />
        {typeof onPressAction === "function" ? (
          <Button
            // onPress={() => {
            //   onPressAction?.();
            //   onDismiss();
            // }}
            style={[styles.button]}
            textColor={textColor}
            compact
            mode="text"
          >
            Close
          </Button>
        ) : null}
      </Surface>
    </SafeAreaView>
  );
};

/**
 * Show the Toast for a short duration.
 */
Toast.DURATION_SHORT = DURATION_SHORT;

/**
 * Show the Toast for a medium duration.
 */
Toast.DURATION_MEDIUM = DURATION_MEDIUM;

/**
 * Show the Toast for a long duration.
 */
Toast.DURATION_LONG = DURATION_LONG;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 8,
    borderRadius: 4,
  },
  content: {
    marginLeft: 16,
    marginVertical: 14,
    flexWrap: "wrap",
    flex: 1,
  },
  button: {
    marginHorizontal: 8,
    marginVertical: 6,
  },
  elevation: {
    elevation: 6,
  },
});

export default withTheme(Toast);
