import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import CenterView from '../CenterView';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../../src/components/Header/Header';
import HeaderBackIcon from '../../../src/components/Header/BackIcon';
import HeaderCloseIcon from '../../../src/components/Header/CloseIcon';
import { Provider } from '../../../src';

storiesOf('Header', module)
  .addDecorator((getStory) => <>{getStory()}</>)
  .add('default', () => (
    <Provider>
      <Header title="Header">
        <HeaderBackIcon size={24} />
        <HeaderCloseIcon size={18} />
      </Header>
    </Provider>
  ));
