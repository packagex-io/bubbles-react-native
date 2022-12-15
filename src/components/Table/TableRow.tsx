import * as React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import color from "color";

import { withTheme } from "../../core/theming";
import type { Theme } from "../../types";
import TouchableRipple from "../TouchableRipple/TouchableRipple.native";
import TableCell from "./TableCell";
import Checkbox from "../Checkbox/Checkbox";

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
  onSelect?: () => void;
  /**
   * Whether the row is selected.
   */
  selected?: boolean;

  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

const TableRow = ({
  children,
  style,
  mode = "filled",
  theme,
  onPress,
  onSelect,
  selected,
  ...rest
}: Props) => {
  const rowStyle = mode === "filled" ? styles.rowFilled : styles.rowOutline;

  return (
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
          : null
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
});

export default withTheme(TableRow);

// @component-docs ignore-next-line
export { TableRow };
