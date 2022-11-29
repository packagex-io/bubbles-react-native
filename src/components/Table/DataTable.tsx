import * as React from 'react';
import {StyleSheet, StyleProp, View, ViewStyle, FlatList} from 'react-native';
import {withTheme} from '../../core/theming';
import Searchbar from '../Searchbar';
import Table from './Table';
import TableCell from './TableCell';
import TableRow from './TableRow';

export type Props = React.ComponentPropsWithRef<typeof FlatList> & {
  /**
   * Searchbar props
   */
  searchbarOptions: React.ComponentPropsWithoutRef<typeof Searchbar>;
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
  searchbarOptions,
  renderItem,
  selectable,
  onSelect,
  ...rest
}: Props) => {
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    typeof onSelect === 'function' && onSelect(selected);
  }, [selected]);

  React.useEffect(() => {
    if (!selectable && selected.length > 0) {
      setSelected([]);
    }
  }, [selectable]);

  const renderSearchbar = () => {
    if (searchbarOptions) {
      return (
        <Searchbar
          placeholder="Search"
          {...searchbarOptions}
          style={[{marginBottom: 8}, searchbarOptions?.style]}
        />
      );
    }
  };
  return (
    <FlatList
      ListHeaderComponent={renderSearchbar()} //! do it like this to prevent the flatlist from re rendering every time the searchbar state changes
      contentOffset={{x: 0, y: 40}}
      style={[styles.container, style]}
      scrollToOverflowEnabled={true}
      keyExtractor={(item, index) => index.toString()}
      renderItem={data => {
        return React.cloneElement(
          //TODO do this only for Table.Row elements
          renderItem(data),
          selectable && {
            onSelect: (selected: boolean) => {
              selected //@ts-ignore callbacks are allowed with state hooks idk why it errors
                ? setSelected(prev => [
                    ...prev,
                    {...data.item, _index: data.index},
                  ])
                : setSelected(prev =>
                    prev.filter(item => item._index !== data.index),
                  );
            },
          },
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
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});

export default DataTable;
