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
import Button from './src/components/Button';
import Menu from './src/components/Menu/Menu';
import SegmentedController from './src/components/SegmentedController/SegmentedController';

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

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <ThemeProvider>
      <SegmentedControllerExample />
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
