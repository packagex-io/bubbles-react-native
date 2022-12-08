import React from "react";
import {
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Animated,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import { withTheme } from "../../core/theming";
import type { Theme } from "src/types";
import Text from "../Typography/Text";

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

interface SegmentedControlProps {
  /**
   * Mode of the group
   */
  mode?: "line" | "default"; //TODO line mode
  /**
   * Array of properties for each segment in the controller
   */
  segments: Array<Segment>;
  /**
   * The Current Active Segment Index
   */
  currentIndex: number;
  /**
   * A callback onPress of a Segment
   */
  onChange: (index: number) => void;
  /**
   * Active Segment Text Style
   */
  activeTextStyle?: TextStyle;
  /**
   * InActive Segment Text Style
   */
  inactiveTextStyle?: TextStyle;
  /**
   * Segment Container Styles
   */
  segmentedControlWrapper?: ViewStyle;
  /**
   * Pressable Container Styles
   */
  pressableWrapper?: ViewStyle;
  /**
   * The moving Tile Container Styles
   */
  tileStyle?: ViewStyle;
  /**
   * @optional
   */
  theme: Theme;
  /**
   * Styling of the wrapping View
   */
  style?: StyleProp<ViewStyle>;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  currentIndex,
  onChange,
  theme,
  activeTextStyle,
  inactiveTextStyle,
  segmentedControlWrapper,
  pressableWrapper,
  tileStyle,
}: SegmentedControlProps) => {
  const [controllerWidth, setControllerWidth] = React.useState(0);
  const widthSize = 100 / segments.length;
  const interpolatedValuesInput = segments.map((_, i) => {
    return widthSize * i;
  });

  const interpolatedValuesOutput = segments.map((_, i) => {
    return `${widthSize * i}%`;
  });

  const tabTranslateValue = React.useRef(new Animated.Value(0));

  // useCallBack with an empty array as input, which will call inner lambda only once and memoize the reference for future calls
  const memoizedTabPressCallback = React.useCallback(
    (index: any) => {
      onChange(index);
    },
    [onChange]
  );

  React.useEffect(() => {
    const left = widthSize * currentIndex;

    Animated.timing(tabTranslateValue.current, {
      toValue: left,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      //reset index after animation is done
      //   setPrevSelectedIndex(selectedIndex);
    });
  }, [widthSize, tabTranslateValue, currentIndex]);

  const finalisedActiveTextStyle: TextStyle = {
    fontWeight: "700",
    textAlign: "center",
    color: theme.colors.fg.default,
    ...activeTextStyle,
  };

  const finalisedInActiveTextStyle: TextStyle = {
    fontWeight: "700",
    textAlign: "center",
    color: theme.colors.fg.disabled,
    ...inactiveTextStyle,
  };

  return (
    <Animated.View
      style={[
        { backgroundColor: theme.colors.bg.subtle },
        styles.defaultSegmentedControlWrapper,
        segmentedControlWrapper,
      ]}
      onLayout={(event) => {
        setControllerWidth(event.nativeEvent.layout.width);
      }}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.movingSegmentStyle,
          tileStyle,
          {
            maxWidth: controllerWidth / segments.length - 8,
            left: tabTranslateValue.current.interpolate({
              inputRange: interpolatedValuesInput,
              outputRange: interpolatedValuesOutput,
            }),
          },
        ]}
      />
      {segments.map((segment, index) => {
        return (
          <TouchableOpacity
            onPress={() => memoizedTabPressCallback(index)}
            key={index}
            style={[styles.touchableContainer, pressableWrapper]}
          >
            <View style={styles.textWrapper}>
              <Text
                variant="Caption"
                style={[
                  currentIndex === index
                    ? finalisedActiveTextStyle
                    : finalisedInActiveTextStyle,
                ]}
              >
                {segment.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  defaultSegmentedControlWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    height: 48,
  },
  touchableContainer: {
    flex: 1,
    paddingVertical: 12,
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  movingSegmentStyle: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    height: 32,
    top: 8,
    marginLeft: 4,
  },
});

export default withTheme(SegmentedControl);
