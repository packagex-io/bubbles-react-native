import * as React from 'react';
import color from 'color';
import { StyleSheet, View, ViewStyle, StyleProp, Text } from 'react-native';
import { withTheme } from '../../core/theming';
import { colors as Colors } from '../../styles/tokens';
import type { $RemoveChildren } from '../../types';

type Props = $RemoveChildren<typeof View> & {
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: PackageX.Theme;
  /**
   * If there is a label, text will show up in the middle of the line.
   */
  label?: string;
};

const Divider = ({ style, theme, label, ...rest }: Props) => {
  return (
    <>
      {label ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.divider, { flex: 1, alignSelf: 'center' }]} />
          <Text style={[styles.label]}>{label}</Text>
          <View style={[styles.divider, { flex: 1, alignSelf: 'center' }]} />
        </View>
      ) : (
        <View {...rest} style={[styles.divider, style]} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#CCCDD3',
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
  label: {
    fontSize: 14,
    alignSelf: 'center',
    paddingHorizontal: 24,
    textTransform: 'uppercase',
    color: '#0D0D0E',
  },
});

export default withTheme(Divider);
