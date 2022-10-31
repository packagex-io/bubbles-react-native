import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Provider } from '../../../src';
import TextInput from '../../../src/components/Input/TextInput';
import CenterView from '../CenterView';

const MyComponent = () => {
  const [text, setText] = React.useState('');
  const [textArea, settextArea] = React.useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim'
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ width: '100%', padding: 16, flex: 1 }}
    >
      <TextInput
        label="Full Name"
        value={text}
        onChangeText={(text) => setText(text)}
        validation={{ required: true, min: 3 }}
      />
      <TextInput
        label="Textarea Input"
        value={textArea}
        onChangeText={(text) => settextArea(text)}
        multiline
        numberOfLines={7}
      />
      <TextInput label="Credit Card details" type="stripe-card" />
    </KeyboardAvoidingView>
  );
};

storiesOf('Input', module)
  .addDecorator((getStory) => <Provider>{getStory()}</Provider>)
  .add('Default', () => (
    <>
      <MyComponent />
    </>
  ));
