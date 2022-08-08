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

storiesOf('Header', module)
  .addDecorator((getStory) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#E5E5E5',
      }}
    >
      {getStory()}
    </View>
  ))
  .add('default', () => (
    <>
      <Header title="Header">
        <HeaderBackIcon size={24} />
        <HeaderCloseIcon size={18} />
      </Header>
    </>
  ));
