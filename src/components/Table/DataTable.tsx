import * as React from "react";
import {
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
  FlatList,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { withTheme } from "../../core/theming";
import { HEADER_HEIGHT, useHeader } from "../Header/HeaderContext";
import Searchbar from "../Searchbar";
import Table from "./Table";
import TableCell from "./TableCell";
import TableRow from "./TableRow";

export type Props = React.ComponentPropsWithRef<typeof FlatList> & {
  /**
   * Puts the table in selectable mode by adding a checkbox to every row.
   */
  selectable?: boolean;
  /**
   * Show loading skeleton
   */
  loading?: boolean;
  /**
   *
   */
  renderItem: (item: any) => React.ReactNode;
  /**
   * Callback with an array of selected data items
   */
  onSelect?: (items: any) => void;
  style?: StyleProp<ViewStyle>;
};

const DataTable = ({
  children,
  style,
  renderItem,
  selectable,
  onSelect,
  ...rest
}: Props) => {
  const { options, setOptions } = useHeader();
  const [selected, setSelected] = React.useState([]);
  const flatListRef = React.useRef(null);

  React.useEffect(() => {
    setOptions((options) => ({
      ...options,
      animate: true,
      showSearchbar: true,
    }));
  }, []);

  React.useEffect(() => {
    typeof onSelect === "function" && onSelect(selected);
  }, [selected]);

  React.useEffect(() => {
    if (!selectable && selected.length > 0) {
      setSelected([]);
    }
    setOptions((options) => ({
      ...options,
      title: selectable
        ? selected.length > 0
          ? `${selected.length} selected`
          : "Select Items"
        : undefined,
    }));
  }, [selectable, selected]);

  const onScrollEndSnapToEdge = (event) => {
    let y = event.nativeEvent.contentOffset.y;
    y = Platform.OS === "ios" ? y + HEADER_HEIGHT : y;
    setTimeout(
      () => {
        if (0 < y && y < HEADER_HEIGHT / 2) {
          if (flatListRef.current) {
            flatListRef.current?.scrollToOffset({
              offset: Platform.OS === "ios" ? -HEADER_HEIGHT : 0,
              animation: Platform.OS === "ios" ? true : false,
            });
          }
        } else if (HEADER_HEIGHT / 2 <= y && y < HEADER_HEIGHT) {
          if (flatListRef.current) {
            flatListRef.current?.scrollToOffset({
              offset: Platform.OS === "ios" ? 0 : HEADER_HEIGHT,
              animation: Platform.OS === "ios" ? true : false,
            });
          }
        }
      },
      Platform.OS === "ios" ? 16 : 0
    );
  };

  const decelerationRate = options.scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, 0.98],
    extrapolate: "clamp",
  });

  return (
    <Animated.FlatList
      decelerationRate={decelerationRate}
      ref={flatListRef}
      scrollEventThrottle={16}
      contentContainerStyle={{
        paddingTop: Platform.OS === "android" ? HEADER_HEIGHT : 0,
      }}
      contentInset={{ top: HEADER_HEIGHT }}
      contentOffset={{
        y: Platform.OS === "ios" ? -HEADER_HEIGHT : 0,
        x: 0,
      }}
      onScrollBeginDrag={(event) => {
        Platform.OS === "ios" && options.scrollY.setOffset(HEADER_HEIGHT);
      }}
      progressViewOffset={HEADER_HEIGHT}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: options.scrollY,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      style={[styles.container, style]}
      scrollToOverflowEnabled={true}
      keyExtractor={(item, index) => index.toString()}
      onScrollEndDrag={onScrollEndSnapToEdge}
      onMomentumScrollEnd={(e) =>
        Platform.OS === "android" && onScrollEndSnapToEdge(e)
      }
      renderItem={(data) => {
        return React.cloneElement(
          //TODO do this only for Table.Row elements
          renderItem(data),
          selectable && {
            onSelect: (selected: boolean) => {
              selected //@ts-ignore callbacks are allowed with state hooks idk why it errors
                ? setSelected((prev) => [
                    ...prev,
                    { ...data.item, _index: data.index },
                  ])
                : setSelected((prev) =>
                    prev.filter((item) => item._index !== data.index)
                  );
            },
            selected: selected.some((item) => item._index === data.index),
          }
        );
      }}
      {...rest}
    />
  );
};

// @component ./TableRow.tsx
DataTable.Row = TableRow;

// @component ./TableRow.tsx
DataTable.Cell = TableCell;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
    paddingBottom: 56,
  },
});

export default DataTable;
