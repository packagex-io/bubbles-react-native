import color from 'color';
import * as React from 'react';
import {
  Alert,
  Linking,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import TouchableRipple from '../TouchableRipple/TouchableRipple.native';
import Text from '../Typography/Text';
import {withTheme} from '../../core/theming';
import type {$RemoveChildren, EllipsizeProp} from '../../types';
import {colors as Colors} from '../../styles/tokens';

type Label =
  | React.ReactNode
  | ((props: {
      selectable: boolean;
      ellipsizeMode: EllipsizeProp | undefined;
      color: string;
      fontSize: number;
    }) => React.ReactNode);

type tText =
  | React.ReactNode
  | ((props: {
      selectable: boolean;
      ellipsizeMode: EllipsizeProp | undefined;
      color: string;
      fontSize: number;
    }) => React.ReactNode);

type Props = $RemoveChildren<typeof TouchableRipple> & {
  /**
   * Label text for the list item.
   */
  label: Label;
  /**
   * Text for the list item or callback which returns a React element to display the text.
   */
  text?: tText;
  /**
   *
   */
  href?: string;
  /**
   * Callback which returns a React element to display on the left side.
   */
  left?: (props: {
    color: string;
    style: {
      marginLeft: number;
      marginRight: number;
      marginVertical?: number;
    };
  }) => React.ReactNode;
  /**
   * Callback which returns a React element to display on the right side.
   */
  right?: (props: {
    color: string;
    style?: {
      marginRight: number;
      marginVertical?: number;
    };
  }) => React.ReactNode;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * @optional
   */
  theme: PackageX.Theme;
  /**
   * Style that is passed to the wrapping TouchableRipple element.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style that is passed to Label element.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Style that is passed to Description element.
   */
  descriptionStyle?: StyleProp<TextStyle>;
  /**
   * Truncate Title text such that the total number of lines does not
   * exceed this number.
   */
  titleNumberOfLines?: number;
  /**
   * Truncate Description text such that the total number of lines does not
   * exceed this number.
   */
  descriptionNumberOfLines?: number;
  /**
   * Ellipsize Mode for the Title.  One of `'head'`, `'middle'`, `'tail'`, `'clip'`.
   *
   * See [`ellipsizeMode`](https://reactnative.dev/docs/text#ellipsizemode)
   */
  titleEllipsizeMode?: EllipsizeProp;
  /**
   * Ellipsize Mode for the Description.  One of `'head'`, `'middle'`, `'tail'`, `'clip'`.
   *
   * See [`ellipsizeMode`](https://reactnative.dev/docs/text#ellipsizemode)
   */
  descriptionEllipsizeMode?: EllipsizeProp;
};

const ListItem = ({
  right,
  label,
  href,
  text: itemText,
  onPress,
  theme,
  style,
  labelStyle,
  titleNumberOfLines = 1,
  descriptionNumberOfLines = 2,
  titleEllipsizeMode,
  descriptionEllipsizeMode,
  descriptionStyle,
  ...rest
}: Props) => {
  const renderDescription = (textColor: string, description?: tText | null) => {
    const handlePress = React.useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(href);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(href);
      } else {
        Alert.alert(`Don't know how to open this URL: ${href}`);
      }
    }, [href]);

    return typeof description === 'function' ? (
      description({
        selectable: false,
        ellipsizeMode: descriptionEllipsizeMode,
        color: textColor,
        fontSize: styles.description.fontSize,
      })
    ) : href ? (
      <TouchableRipple
        rippleColor="#355DFF"
        onPress={handlePress}
        style={{marginRight: 24}}
      >
        <Text
          selectable={false}
          numberOfLines={descriptionNumberOfLines}
          ellipsizeMode={descriptionEllipsizeMode}
          style={[
            styles.description,
            {color: '#355DFF', ...theme.fonts.semiBold},
            descriptionStyle,
            Platform.OS === 'web' && {fontFamily: 'Inter', fontWeight: 700},
          ]}
        >
          {description}
        </Text>
      </TouchableRipple>
    ) : (
      <Text
        selectable={false}
        numberOfLines={descriptionNumberOfLines}
        ellipsizeMode={descriptionEllipsizeMode}
        style={[
          styles.description,
          {color: textColor, ...theme.fonts.semiBold},
          descriptionStyle,
          Platform.OS === 'web' && {fontFamily: 'Inter', fontWeight: 700},
        ]}
      >
        {description}
      </Text>
    );
  };

  const renderTitle = () => {
    const titleColor = '#CCCDD3';

    return typeof label === 'function' ? (
      label({
        selectable: false,
        ellipsizeMode: titleEllipsizeMode,
        color: titleColor,
        fontSize: styles.label.fontSize,
      })
    ) : (
      <Text
        selectable={false}
        ellipsizeMode={titleEllipsizeMode}
        numberOfLines={titleNumberOfLines}
        style={[
          styles.label,
          {...theme.fonts.semiBold},
          labelStyle,
          Platform.OS === 'web' && {fontFamily: 'Inter'},
        ]}
      >
        {label}
      </Text>
    );
  };

  const textColor = color(theme.colors.text).alpha(0.54).rgb().string();

  return (
    <TouchableRipple
      {...rest}
      style={[styles.container, style]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <View style={[styles.item, styles.content]}>
          {renderTitle()}

          {itemText ? renderDescription(Colors.black, itemText) : null}
        </View>
        {right
          ? right({
              color: textColor,
              style: itemText
                ? styles.iconMarginRight
                : {
                    ...styles.iconMarginRight,
                    ...styles.marginVerticalNone,
                  },
            })
          : null}
      </View>
    </TouchableRipple>
  );
};

ListItem.displayName = 'List.Item';

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth * 2,
    width: '100%',
    borderRadius: 16,
    borderColor: '#CCCDD3',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 24,
  },
  label: {
    fontSize: 10,
    color: '#CCCDD3',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
  },
  marginVerticalNone: {marginVertical: 0},
  iconMarginRight: {marginRight: 0},
  item: {
    marginVertical: 16,
    paddingLeft: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default withTheme(ListItem);
