//TODO: Rework this to make web compatible. Don't use masked views.

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
import type Surface from "../Surface";
import Text from "../Typography/Text";
import TouchableRipple from "../TouchableRipple/TouchableRipple.native";
import { withTheme } from "../../core/theming";
import type { Theme } from "../../types";
import { colors } from "../../styles/tokens";
import MaskedView from "@react-native-masked-view/masked-view";

type Segment = {
  /**
   * Label of the segment
   */
  label: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
};

export type Props = React.ComponentProps<typeof Surface> & {
  /**
   * Mode of the group
   */
  mode?: "line" | "default";
  /**
   * Array of properties for each segment in the controller
   */
  segments: Array<Segment>;
  /**
   * @optional
   */
  theme: Theme;
  /**
   * Styling of the wrapping View
   */
  style?: StyleProp<ViewStyle>;
};

const SegmentedController = ({
  mode = "default",
  segments,
  theme,
  style,
  ...rest
}: Props) => {
  const [prevSelectedIndex, setPrevSelectedIndex] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selectedPanelLeft = React.useRef(new Animated.Value(0));

  const widthSize = 100 / segments.length;

  const interpolatedValuesInput = segments.map((_, i) => {
    return widthSize * i;
  });

  const interpolatedValuesOutput = segments.map((_, i) => {
    return `${widthSize * i}%`;
  });

  React.useEffect(() => {
    const left = widthSize * selectedIndex;

    Animated.timing(selectedPanelLeft.current, {
      toValue: left,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      //reset index after animation is done
      setPrevSelectedIndex(selectedIndex);
    });
  }, [widthSize, selectedPanelLeft, selectedIndex]);

  const maxIndex =
    selectedIndex > prevSelectedIndex ? selectedIndex : prevSelectedIndex;
  const minIndex =
    selectedIndex > prevSelectedIndex ? prevSelectedIndex : selectedIndex;

  const highlightMask = {
    backgroundColor:
      mode === "default" ? theme.colors.bg.surface : "transparent",
  };

  const highlightText = {
    color: theme.colors.fg.default,
  };

  const inactiveText = {
    color: theme.colors.fg.disabled,
  };

  const inactiveBackground = {
    backgroundColor: theme.dark
      ? mode === "line"
        ? theme.colors.bg.surface
        : theme.colors.bg.subtle
      : "transparent",
  };

  /**
   * For whatever reason, the `zIndex: -1` on Text works on Android, but does not work
   * on iOS. However, when we can get away with only removing the Text from zIndex,
   * the ripple effect continues to work on Android. As such, we conditionally
   * apply the logic for Android vs iOS
   */
  const inactiveContainerIOS = Platform.OS === "ios" ? { zIndex: -1 } : {};

  return (
    <View
      style={[
        styles.container,
        mode === "line" && {
          ...styles.lineContainer,
          borderBottomColor: theme.colors.fg.subtle,
        },
        mode === "default" && {
          backgroundColor: theme.colors.bg.canvas,
        },
        style,
      ]}
      accessible
      accessibilityRole="radiogroup"
    >
      <MaskedView
        importantForAccessibility={"no-hide-descendants"}
        accessibilityElementsHidden={true}
        key={selectedIndex}
        style={styles.maskViewContainer}
        androidRenderingMode={"software"}
        maskElement={
          <Animated.View
            style={[
              styles.maskContainer,
              {
                width: `${widthSize}%`,
                left: selectedPanelLeft.current.interpolate({
                  inputRange: interpolatedValuesInput,
                  outputRange: interpolatedValuesOutput,
                }),
              },
              mode === "line" && { borderRadius: 0 },
            ]}
          />
        }
      >
        <View
          style={[
            styles.baseButtonContainer,
            highlightMask,
            mode === "line" && styles.lineBaseButtonContainer,
            mode === "line" && { borderBottomColor: theme.colors.fg.default },
          ]}
        >
          {segments.map((segment, i) => (
            <TouchableRipple
              key={i}
              onPress={() => {
                setPrevSelectedIndex(selectedIndex);
                setSelectedIndex(i);
                if (typeof segment.onPress === "function") segment.onPress();
              }}
              style={styles.baseTouchableRipple}
            >
              <Text
                style={[
                  styles.baseButtonText,
                  styles.highlightText,

                  highlightText,
                ]}
                numberOfLines={1}
              >
                {segment.label}
              </Text>
            </TouchableRipple>
          ))}
        </View>
      </MaskedView>
      <View
        style={[
          styles.baseButtonContainer,
          styles.inactiveButtonContainer,
          inactiveContainerIOS,
          mode === "line" && { paddingBottom: 1, left: 0 },
        ]}
      >
        {segments.map((segment, i) => (
          <TouchableRipple
            accessibilityRole="radio"
            accessibilityState={{ checked: selectedIndex === i }}
            accessibilityLiveRegion="polite"
            key={i}
            style={[
              styles.baseTouchableRipple,
              {
                zIndex: minIndex <= i && maxIndex >= i ? -1 : 0,
              },
              inactiveBackground,
            ]}
            onPress={() => {
              setPrevSelectedIndex(selectedIndex);
              setSelectedIndex(i);
              if (typeof segment.onPress === "function") segment.onPress();
            }}
          >
            <Text
              style={[styles.baseButtonText, inactiveText]}
              numberOfLines={1}
            >
              {segment.label}
            </Text>
          </TouchableRipple>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    position: "relative",
    padding: 4,
    borderRadius: 12,
  },
  lineContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    padding: 0,
    paddingTop: 4,
    marginHorizontal: 4,
    borderRadius: 0,
  },
  maskViewContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  maskContainer: {
    position: "absolute",
    backgroundColor: "black",
    borderRadius: 10,
    height: "100%",
    left: 0,
    top: 0,
  },
  baseButtonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  lineBaseButtonContainer: { borderBottomWidth: 1 },
  inactiveButtonContainer: {
    position: "absolute",
    top: 4,
    left: 4,
    width: "100%",
    height: "100%",
  },
  baseTouchableRipple: {
    height: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  baseButtonText: {
    paddingHorizontal: 16,
  },
  highlightText: {
    zIndex: 1,
  },
});

export default withTheme(SegmentedController);
