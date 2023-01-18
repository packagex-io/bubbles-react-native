import * as React from "react";
import {
  GestureResponderEvent,
  PanResponderGestureState,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import color from "color";

import { withTheme } from "../../core/theming";
import type { Theme } from "../../types";
import TouchableRipple from "../TouchableRipple/TouchableRipple.native";
import TableCell from "./TableCell";
import Checkbox from "../Checkbox/Checkbox";
import Swipeable from "./SwipeHandler";
import Text from "../Typography/Text";
import type { IconSource } from "../Icon";
import Icon from "../Icon";

type GestureButton = {
  onPress?: () => void;
  text: string;
  icon: IconSource;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};

export type Props = React.ComponentPropsWithRef<typeof TouchableRipple> & {
  /**
   * Content of the `DataTableHeader`.
   */
  children: React.ReactNode;
  /**
   * Styling the row to be filled (white background with no borders) or outlined.
   */
  mode?: "filled" | "outline";
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * @internal
   * Callback when the row is selected.
   */
  onSelect?: (selected: boolean) => void;
  /**
   * Whether the row is selected.
   */
  selected?: boolean;

  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
  /**
   * Actions to display when the row is swiped from right to left.
   */
  rightButtons?: [GestureButton, GestureButton];
  /**
   * Callback when the row is swiped farther than the activation threshold from right to left and then released.
   */
  onRightButtonsOverSwipeRelease?: (
    e?: GestureResponderEvent,
    gestureState?: PanResponderGestureState
  ) => void;
  /**
   * Actions to display when the row is swiped from left to right.
   */
  leftButtons?: [GestureButton, GestureButton];
  /**
   * Callback when the row is swiped farther than the activation threshold from left to right and then released.
   */
  onLeftButtonsOverSwipeRelease?: (
    e?: GestureResponderEvent,
    gestureState?: PanResponderGestureState
  ) => void;
};

const TableRow = ({
  children,
  style,
  mode = "filled",
  theme,
  onPress,
  onSelect,
  selected,
  rightButtons,
  leftButtons,
  onRightButtonsOverSwipeRelease,
  onLeftButtonsOverSwipeRelease,
  ...rest
}: Props) => {
  const rowStyle = mode === "filled" ? styles.rowFilled : styles.rowOutline;

  const rightButtonsJsx = rightButtons?.map((button, i) => {
    const { backgroundColor: customBackground }: ViewStyle = StyleSheet.flatten(
      button.style
    ) || {
      backgroundColor: i === 0 ? "pink" : "lightseagreen",
    };

    const iconColor = color(customBackground).isLight() ? "black" : "white";

    return (
      <TouchableOpacity
        onPress={button.onPress}
        style={[
          styles.rightSwipeItem,
          button.style,
          { backgroundColor: customBackground },
        ]}
      >
        <View style={[styles.actionButton]}>
          <Icon color={iconColor} source={button.icon} size={24} />
          <Text variant="Caption">{button.text}</Text>
        </View>
      </TouchableOpacity>
    );
  });

  const leftButtonsJsx = leftButtons?.map((button, i) => {
    const { backgroundColor: customBackground }: ViewStyle = StyleSheet.flatten(
      button.style
    ) || {
      backgroundColor: i === 0 ? "pink" : "lightseagreen",
    };
    const iconColor = color(customBackground).isLight() ? "black" : "white";
    return (
      <TouchableOpacity
        onPress={button.onPress}
        style={[
          styles.leftSwipeItem,
          button.style,
          { backgroundColor: customBackground },
        ]}
      >
        <View style={[styles.actionButton]}>
          <Icon color={iconColor} source={button.icon} size={24} />
          <Text variant="Caption">{button.text}</Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <Swipeable
      // onRightButtonsOpenComplete={() => {
      //   console.log("OpenComplete");
      // }}
      // onRightButtonsOpenRelease={() => {
      //   console.log("OpenRelease");
      // }}
      // onRightButtonsActivate={() => {
      //   console.log("Activate");
      // }}
      rightButtons={rightButtonsJsx}
      leftButtons={leftButtonsJsx}
      onRightButtonsOverSwipeRelease={(e, gestureState) => {
        onRightButtonsOverSwipeRelease &&
          onRightButtonsOverSwipeRelease(e, gestureState);
      }}
      onLeftButtonsOverSwipeRelease={(e, gestureState) => {
        onLeftButtonsOverSwipeRelease &&
          onLeftButtonsOverSwipeRelease(e, gestureState);
      }}
    >
      <TouchableRipple
        {...rest}
        onPress={
          typeof onSelect === "function"
            ? () => {
                if (onSelect) {
                  onSelect(!selected);
                }
                typeof onPress === "function" && onPress();
              }
            : undefined
        }
        style={[styles.row, rowStyle, style]}
      >
        <>
          {onSelect && (
            <TableCell>
              <Checkbox status={selected ? "checked" : "unchecked"} />
            </TableCell>
          )}
          {children}
        </>
      </TouchableRipple>
    </Swipeable>
  );
};

TableRow.displayName = "Table.Row";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: 64,
    padding: 8,
    borderRadius: 16,
    marginBottom: 8,
    paddingRight: 0, // doing this so we can have marginRight on the last cell and it'll appear like theres spacing only between the cells
  },
  rowFilled: {
    backgroundColor: "white",
  },
  rowOutline: {
    backgroundColor: "transparent",
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  leftSwipeItem: {
    height: 64,
    alignItems: "flex-end",
    justifyContent: "center",
    // paddingRight: 20,
    marginRight: 8,
  },
  rightSwipeItem: {
    height: 64,
    justifyContent: "flex-start",
    // paddingLeft: 20,
    marginLeft: 8,
  },
  actionButton: {
    alignItems: "center",
    width: 68,
    justifyContent: "center",
    height: 64,
  },
});

export default withTheme(TableRow);

// @component-docs ignore-next-line
export { TableRow };
