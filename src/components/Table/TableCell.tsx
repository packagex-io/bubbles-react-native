import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  ImageSourcePropType,
  ImagePropTypes,
  Image,
  Platform,
} from 'react-native';

import type {$RemoveChildren, Theme} from '../../types';
import Text from '../Typography/Text';
import IconButton from '../IconButton/IconButton';
import Chip from '../Chip/Chip';
import {withTheme} from '../../core/theming';

export type Props = $RemoveChildren<typeof View> & {
  /**
   * Content of the `DataTableCell`.
   */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * This will add a string of text to the cell
   */
  text?: string;
  /**
   * This will add a second line of text below the text from the tex prop
   */
  caption?: string;
  /**
   * By default the text in the cell is left aligned, but you can change that to "right"
   */
  align?: 'left' | 'right';
  /**
   * If you pass in an img, Bubbles will assume you want to add an image to the cell, like someone's profile picture. The image will be added and all text properties will be ignored.
   */
  img?: React.ComponentProps<typeof Image>;
  /**
   * Add an IconButton to the cell.
   */
  iconButton?: React.ComponentPropsWithoutRef<typeof IconButton>;
  chip?: React.ComponentPropsWithoutRef<typeof Chip>;
  /**
   * Text content style of the `DataTableCell`.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

const TableCell = ({
  children,
  textStyle,
  style,
  align = 'left',
  text,
  caption,
  img,
  iconButton,
  chip,
  theme,
  ...rest
}: Props) => {
  let _type = null;
  if (children)
    return (
      <View
        {...rest}
        style={[
          styles.container,
          Platform.OS === 'web' && {flex: '0 auto'},
          style,
        ]}
      >
        {children}
      </View>
    );

  let containerStyle = {};
  let cellContent = null;
  if (text) {
    _type = 'text';
    containerStyle = {
      alignItems: align === 'left' && 'flex-start',
      flex: 1,
    };
    cellContent = (
      <>
        <Text numberOfLines={1} style={styles.text} variant="Caption">
          {text}
        </Text>
        {caption && (
          <Text
            style={[styles.caption, {color: theme.colors.fg.subtle}]}
            variant="XSmall"
            numberOfLines={1}
          >
            {caption}
          </Text>
        )}
      </>
    );
  } else if (img) {
    _type = 'image';
    containerStyle = {justifyContent: 'center', alignItems: 'center'};
    cellContent = (
      <>
        <Image style={styles.img} {...img} />
      </>
    );
  } else if (chip) {
    _type = 'chip';
    containerStyle = {justifyContent: 'center', alignItems: 'center'};
    cellContent = <Chip {...chip} />;
  } else if (iconButton) {
    _type = 'button';
    containerStyle = {justifyContent: 'center', alignItems: 'center'};
    cellContent = (
      <>
        <IconButton {...iconButton} />
      </>
    );
  } else {
    return null;
  }

  return (
    <View
      {...rest}
      style={[
        styles.container,
        Platform.OS === 'web' && {flex: '0 auto'},
        containerStyle,
        style,
      ]}
    >
      {cellContent}
    </View>
  );
};

TableCell.displayName = 'Table.Cell';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', //TODO make start instead should depend on align prop
    flex: 0,
    marginRight: 8,
  },
  text: {
    fontWeight: 'bold',
  },
  caption: {
    fontWeight: 'bold',
  },
  img: {
    aspectRatio: 1,
    height: '100%',
    borderRadius: 12,
  },
});

export default withTheme(TableCell);
