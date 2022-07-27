import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Spinner from '../../../src/components/Spinner/Spinner';
import CenterView from '../CenterView';

storiesOf('Spinner', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <>
      <Spinner />
    </>
  ));
