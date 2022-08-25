import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import Toast from '../../../src/components/Toast/Toast';
import Button from '../Button';
import CenterView from '../CenterView';

const ToastComponent = () => {
  const [visible, setVisible] = React.useState(true);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={{ flex: 1 }}>
      {/* <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button> */}
      <Toast
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
      >
        Your settings were successfully updated!
      </Toast>
    </View>
  );
};

storiesOf('Toast', module)
  .addDecorator((getStory) => <>{getStory()}</>)
  .add('default', () => (
    <>
      <ToastComponent />
    </>
  ));
