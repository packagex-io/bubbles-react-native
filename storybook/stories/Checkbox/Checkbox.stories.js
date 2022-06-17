import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Checkbox from '../../../src/components/Checkbox/Checkbox';
import CenterView from '../CenterView';

const ControlledCheckbox = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      onPress={() => {
        setChecked(!checked);
      }}
      status={checked ? 'checked' : 'unchecked'}
    />
  );
};

storiesOf('Checkbox', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <>
      <ControlledCheckbox />
    </>
  ));
