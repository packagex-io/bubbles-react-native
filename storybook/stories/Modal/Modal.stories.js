import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import MessageModal from '../../../src/components/Modal/MessageModal';
import Portal from '../../../src/components/Portal/Portal';
import Text from '../../../src/components/Typography/Text';
import CenterView from '../CenterView';
import {
  Provider as ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from '../../../src/index';
import Modal from '../../../src/components/Modal/Modal';
import Button from '../../../src/components/Button';

const ModalExample = () => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  return (
    <>
      <Portal>
        <MessageModal
          title="Message modal"
          onDismiss={() => {
            setVisible(false);
          }}
          visible={visible}
        >
          <View
            style={{
              backgroundColor: '#D9D9D9',
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              height: 168,
            }}
          >
            <Text variant="XSmall">Slot</Text>
          </View>
        </MessageModal>
      </Portal>
      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Button style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button>
      </View>
    </>
  );
};

storiesOf('Modal', module).add('Message', () => (
  <ThemeProvider>
    <ModalExample />
  </ThemeProvider>
));
