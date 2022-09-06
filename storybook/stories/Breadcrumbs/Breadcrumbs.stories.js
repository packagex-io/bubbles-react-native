import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Breadcrumbs from '../../../src/components/Breadcrumbs/Breadcrumbs';
import Button from '../../../src/components/Button';
import CenterView from '../CenterView';

storiesOf('Breadcrumbs', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <>
      <Breadcrumbs />
    </>
  ));
