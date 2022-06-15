import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import TextInput from '../../../src/components/Input/TextInput';
import CenterView from '../CenterView';

const MyComponent = () => {
  const [text, setText] = React.useState('');
  const [textArea, settextArea] = React.useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim'
  );

  return (
    <View style={{ width: '100%', padding: 16 }}>
      <TextInput
        label="Full Name"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TextInput
        label="Textarea Input"
        value={textArea}
        onChangeText={(text) => settextArea(text)}
        multiline
        numberOfLines={7}
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
