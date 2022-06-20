import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Divider from '../../../src/components/Divider/Divider';
import CenterView from '../CenterView';

storiesOf('Divider', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <View style={{ width: '90%' }}>
      <Divider />
    </View>
  ))
  .add('with text', () => (
    <View style={{ width: '90%' }}>
      <Divider label="text in the middle" />
    </View>
  ));
