import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import TextInput from '../../../src/components/Input/TextInput';
import CenterView from '../CenterView';

const MyComponent = () => {
  const [text, setText] = React.useState('');

  return (
    <View style={{ width: '100%', padding: 16 }}>
      <TextInput
        label="Full Name"
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
};

storiesOf('Input', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => (
    <>
      <MyComponent />
    </>
  ));
