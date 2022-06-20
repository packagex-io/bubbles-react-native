import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Chip from '../../../src/components/Chip/Chip';
import CenterView from '../CenterView';

storiesOf('Chip', module)
  .addDecorator((getStory) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {getStory()}
    </View>
  ))
  .add('default', () => (
    <>
      <Chip>Primary</Chip>
      <View style={{ marginVertical: 16 }}>
        <Chip mode="outlined">Primary</Chip>
      </View>
    </>
  ));
