import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
  ScrollView,
} from 'react-native';
import TableCell from './TableCell';
import TableRow from './TableRow';

export type Props = React.ComponentPropsWithRef<typeof ScrollView> & {
  /**
   * Content of the `Table`.
   */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Table = ({ children, style, ...rest }: Props) => (
  <ScrollView {...rest} style={[styles.container, style]}>
    {children}
  </ScrollView>
);

// @component ./TableRow.tsx
Table.Row = TableRow;

// @component ./TableRow.tsx
Table.Cell = TableCell;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
});

export default Table;
