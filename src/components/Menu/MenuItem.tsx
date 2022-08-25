import * as React from 'react';
import color from 'color';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Icon, { IconSource } from '../Icon';
import TouchableRipple from '../TouchableRipple/TouchableRipple.native';
import Text from '../Typography/Text';
import { withTheme } from '../../core/theming';
import type { Theme } from '../../types';
import { colors } from '../../styles/tokens';

export const MIN_WIDTH = 112;
export const MAX_WIDTH = 280;

type Props = {
  /**
   * Title text for the `MenuItem`.
   */
  title: React.ReactNode;
  /**
   * Whether the 'item' is disabled. A disabled 'item' is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * @optional
   */
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  /**
   * @optional
   */
  theme: Theme;
  /**
   * TestID used for testing purposes
   */
  testID?: string;
  /**
   * Accessibility label for the Touchable. This is read by the screen reader when the user taps the component.
   */
  accessibilityLabel?: string;
};

const MenuItem = ({
  title,
  disabled,
  onPress,
  style,
  contentStyle,
  testID,
  titleStyle,
  accessibilityLabel,
  theme,
}: Props) => {
  const titleColor = disabled
    ? color(colors.black).alpha(0.32).rgb().string()
    : colors.black;
  const underlayColor = color(theme.colors.primary.default)
    .alpha(0.12)
    .rgb()
    .string();

  const containerPadding = 12;

  const minWidth = MIN_WIDTH - 12;

  const maxWidth = MAX_WIDTH - 12;

  return (
    <TouchableRipple
      style={[styles.container, { paddingHorizontal: containerPadding }, style]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled }}
      underlayColor={underlayColor}
    >
      <View style={styles.row}>
        <View
          style={[
            styles.content,
            { minWidth, maxWidth },

            styles.md3WithoutLeadingIcon,
            contentStyle,
          ]}
          pointerEvents="none"
        >
          <Text
            variant="Body"
            selectable={false}
            numberOfLines={1}
            style={[{ color: titleColor }, titleStyle, theme.fonts.semiBold]}
          >
            {title}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

MenuItem.displayName = 'Menu.Item';

const styles = StyleSheet.create({
  container: {
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH,
    height: 48,
    justifyContent: 'center',
  },
  md3DenseContainer: {
    height: 32,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  item: {
    marginHorizontal: 8,
  },
  content: {
    justifyContent: 'center',
  },
  md3LeadingIcon: {
    marginLeft: 12,
  },
  md3WithoutLeadingIcon: {
    marginLeft: 4,
  },
});

export default withTheme(MenuItem);
