import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import MessageModal from '../../../src/components/Modal/MessageModal';
import Portal from '../../../src/components/Portal/Portal';
import Text from '../../../src/components/Typography/Text';
import Button from '../Button';
import CenterView from '../CenterView';
import {
  Provider as ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '../../../src/index';
import Modal from '../../../src/components/Modal/Modal';

const ModalComponent = () => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  return (
    <ThemeProvider>
      <Button style={{ marginTop: 30 }} onPress={showModal}>
        Show
      </Button>
      <Portal>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Modal
            visible={visible}
            contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
          >
            <Text variant="XSmall">This is a simple example</Text>
          </Modal>
          <Button style={{ marginTop: 30 }} onPress={showModal}>
            Show
          </Button>
        </View>
      </Portal>
    </ThemeProvider>
  );
};

storiesOf('Modal', module).add('Message', () => <ModalComponent />);
