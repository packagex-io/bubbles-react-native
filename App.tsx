import React, { Dispatch, SetStateAction } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import Config from 'react-native-config';
import StorybookUI from './storybook';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider as ThemeProvider, useTheme, withTheme } from './src';
import Text from './src/components/Typography/Text';
import Portal from './src/components/Portal/Portal';
import Button from './src/components/Button';
import Menu from './src/components/Menu/Menu';
import SegmentedController from './src/components/SegmentedController/SegmentedController';
import Select from './src/components/Select';
import MessageModal from './src/components/Modal/MessageModal';

const MenuExample = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => {
    console.log('onDismiss', visible);
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<Button onPress={openMenu}>Show menu</Button>}
    >
      <Menu.Item onPress={() => {}} title="Item 1" />
      <Menu.Item onPress={() => {}} title="Item 2" />

      <Menu.Item onPress={() => {}} title="Item 3" />
    </Menu>
  );
};

const data = [
  { label: 'One', value: '1', description: 'This is some description' },
  { label: 'Two', value: '2', description: 'More description' },
  { label: 'Three', value: '3' },
  { label: 'Four', value: '4' },
  { label: 'Five', value: '5' },
];

const SelectComponent = () => {
  const [selected, setSelected] = React.useState(undefined);

  return (
    // <ThemeProvider>
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 16,
        justifyContent: 'center',
        paddingHorizontal: 16,
        position: 'relative',
      }}
    >
      <Select
        data={data}
        label={'Select Item'}
        onSelect={setSelected}
        selected={selected}
      />
    </View>
    // {/* </ThemeProvider> */}
  );
};

const ModalExample = ({}: {}) => {
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
        <Button mode="contained" style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button>
      </View>
    </>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <ThemeProvider>
      <MenuExample />
    </ThemeProvider>
  );
};

export default Config.LOAD_STORYBOOK === 'true' ? StorybookUI : App;
