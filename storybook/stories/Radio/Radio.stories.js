import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Checkbox from '../../../src/components/Checkbox/Checkbox';
import RadioButton from '../../../src/components/Radio';
import CenterView from '../CenterView';

const RadioGroupExample = () => {
  const [value, setValue] = React.useState('first');

  return (
    <RadioButton.Group
      onValueChange={(newValue) => setValue(newValue)}
      value={value}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton value="first" />
        <Text>First</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton value="second" />
        <Text>Second</Text>
      </View>
    </RadioButton.Group>
  );
};

storiesOf('Radio', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <>
      <RadioGroupExample />
    </>
  ));
