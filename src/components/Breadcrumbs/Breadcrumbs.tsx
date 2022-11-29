import * as React from 'react';
import type { Theme } from '../../types';
import Text from '../Typography/Text';
import { withTheme } from '../../core/theming';
import { View } from 'react-native';

export type Breadcrumb = {
  label: string;
  href?: string;
};

type Props = {
  /**
   * Array of breadcrumb objects to be displayed
   */
  breadcrumbs: Breadcrumb[];
  theme: Theme;
  /**
   * An array of string to overwrite the labels for breadcrumbs.
   */
  breadcrumb_labels: string[];
};

const Breadcrumbs = ({
  breadcrumbs = [
    { label: 'Hello' },
    { label: 'World' },
    { label: 'Breadcrumb' },
  ],
  breadcrumb_labels = [],
  theme,
  ...rest
}: Props) => {
  const labels =
    breadcrumb_labels.length > 0
      ? [
          ...breadcrumb_labels.slice(0, breadcrumbs.length),
          ...breadcrumbs
            .map((breadcrumb) => breadcrumb.label)
            .slice(breadcrumb_labels.length, breadcrumbs.length),
        ]
      : breadcrumbs.map((breadcrumb) => breadcrumb.label);

  return (
    <View style={{ flexDirection: 'row' }}>
      {labels.map((label, i) => (
        <Text key={label + '-' + i} variant="Caption">
          {label}
          {i < labels.length - 1 ? ' / ' : null}
        </Text>
      ))}
    </View>
  );
};
export default withTheme(Breadcrumbs);
