import * as React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import color from 'color';

import type { $RemoveChildren, Theme } from '../../types';
import Text from '../Typography/Text';
import { colors } from '../../styles/tokens';
import { withTheme } from '../../core/theming';

export type Props = $RemoveChildren<typeof View> & {
  /**
   * Custom color for the text.
   */
  color?: string;
  /**
   * Text for the title.
   */
  title: React.ReactNode;
  /**
   * Style for the title.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Reference for the title.
   */
  titleRef?: React.RefObject<Text>;
  /**
   * Text for the subtitle.
   */
  subtitle?: React.ReactNode;
  /**
   * Style for the subtitle.
   */
  subtitleStyle?: StyleProp<TextStyle>;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;

  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};

const HeaderContent = ({
  color: titleColor,
  subtitle,
  subtitleStyle,
  onPress,
  style,
  titleRef,
  titleStyle,
  theme,
  title,
  ...rest
}: Props) => {
  const titleTextColor = titleColor ? titleColor : colors.white;

  return (
    <TouchableWithoutFeedback
      accessibilityRole="button"
      onPress={onPress}
      disabled={!onPress}
    >
      <View
        pointerEvents="box-none"
        style={[styles.container, style]}
        {...rest}
      >
        <Text
          ref={titleRef}
          variant="Small"
          style={[
            {
              color: titleTextColor,
              ...(Platform.OS === 'ios'
                ? theme.fonts.regular
                : theme.fonts.medium),
            },

            titleStyle,
          ]}
          numberOfLines={1}
          accessible
          // @ts-ignore Type '"heading"' is not assignable to type ...
          accessibilityRole={Platform.OS === 'web' ? 'heading' : 'header'}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            variant="XSmall"
            style={[{ color: theme.colors.fg.subtle }, subtitleStyle]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

HeaderContent.displayName = 'Header.Content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  title: {
    fontSize: Platform.OS === 'ios' ? 17 : 20,
  },
  subtitle: {
    fontSize: Platform.OS === 'ios' ? 11 : 14,
  },
});

export default withTheme(HeaderContent);

// @component-docs ignore-next-line
const HeaderContentWithTheme = withTheme(HeaderContent);
// @component-docs ignore-next-line
export { HeaderContentWithTheme as HeaderContent };
