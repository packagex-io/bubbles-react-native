import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../../src/components/Button';
import CenterView from '../CenterView';

storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <>
      <Button onPress={action('clicked-text')}>
        <Text> {text('Button text', 'Button')}</Text>
      </Button>
      <Button mt={24} mode="outlined" onPress={action('clicked-text')}>
        <Text> {text('Button text', 'Button')}</Text>
      </Button>
    </>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>😀 😎 👍 💯</Button>
  ));
