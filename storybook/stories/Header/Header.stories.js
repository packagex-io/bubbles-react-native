import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import CenterView from '../CenterView';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../../src/components/Header/Header';

import HeaderCloseIcon from '../../../src/components/Header/CloseIcon';
import { Provider } from '../../../src';
import HeaderBackAction from '../../../src/components/Header/HeaderBackAction';
import HeaderAction from '../../../src/components/Header/HeaderAction';

storiesOf('Header', module)
  .addDecorator((getStory) => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>{getStory()}</View>
  ))
  .add('default', () => (
    <Provider>
      <Header title="Page Title" subtitle="12 Routes - Estimated Time 7h 30m">
        <HeaderBackAction
          onPress={() => {
            console.log('back');
          }}
          size={24}
        />
        <HeaderAction
          size={18}
          icon={'close'}
          onPress={() => {
            console.log('action');
          }}
        />
      </Header>
    </Provider>
  ));
