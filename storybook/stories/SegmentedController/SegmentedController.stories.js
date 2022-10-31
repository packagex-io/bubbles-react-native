import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import SegmentedController from '../../../src/components/SegmentedController/SegmentedController';
import CenterView from '../CenterView';
import { Provider as ThemeProvider, useTheme, withTheme } from '../../../src/';

const SegmentedControllerExample = ({ mode }) => {
  const theme = useTheme();
  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.bg.surface, padding: 8 }}
    >
      <SegmentedController
        mode={mode}
        segments={[
          {
            label: 'Segment1',
            onPress: () => {
              console.log('pressed');
            },
          },
          {
            label: 'Segment2',
            onPress: () => {
              console.log('pressed 2');
            },
          },
          {
            label: 'Segment3',
            onPress: () => {
              console.log('pressed 3');
            },
          },
        ]}
      />
    </View>
  );
};

storiesOf('Segmented Controller', module)
  .addDecorator((getStory) => <>{getStory()}</>)
  .add('default', () => (
    <ThemeProvider>
      <SegmentedControllerExample />
    </ThemeProvider>
  ))
  .add('line', () => (
    <ThemeProvider>
      <SegmentedControllerExample mode={'line'} />
    </ThemeProvider>
  ));
