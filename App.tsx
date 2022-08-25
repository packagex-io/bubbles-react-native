/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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
import MessageModal from './src/components/Modal/MessageModal';
import Modal from './src/components/Modal/Modal';
import Button from './src/components/Button';
import Menu from './src/components/Menu/Menu';
import SegmentedController from './src/components/SegmentedController/SegmentedController';
import Pagination from './src/components/Pagination/Pagination';

const ModalExample = ({}: {}) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  return (
    <>
      <Portal>
        <Modal
          onDismiss={() => {
            setVisible(false);
          }}
          visible={visible}
          contentContainerStyle={{
            backgroundColor: 'red',
            padding: 20,
            minHeight: 24,
          }}
        >
          <Text variant="XSmall">This is a simple example</Text>
        </Modal>
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

const numberOfItemsPerPageList = [1, 2, 3, 4];

const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
  {
    key: 4,
    name: 'Page 4',
  },
  {
    key: 5,
    name: 'Page 5',
  },
];

const PaginationExample = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <View style={{ flex: 1 }}>
      <Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={'Rows per page'}
      />
    </View>
  );
};

const MenuExample = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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

const SegmentedControllerExample = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 8 }}>
      <SegmentedController
        // mode="line"
        segments={[
          {
            label: 'Segment1',
            onPress: () => {
              console.log('pressed');
            },
          },
          {
            label: 'Segment2',
            onPress: () => {
              console.log('pressed 2');
            },
          },
          {
            label: 'Segment3',
            onPress: () => {
              console.log('pressed 3');
            },
          },
        ]}
      />
    </View>
  );
};

const ButtonExample = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <View style={{ padding: 8 }}>
        <Button
          onPress={() => {
            console.log('pressed');
          }}
        >
          Button text
        </Button>
      </View>
      <View>
        <Button
          mode="outlined"
          onPress={() => {
            console.log('pressed');
          }}
        >
          Button text
        </Button>
      </View>
    </View>
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
      <ButtonExample />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Config.LOAD_STORYBOOK === 'true' ? StorybookUI : App;
