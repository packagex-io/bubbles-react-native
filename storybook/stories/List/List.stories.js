import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text, View } from 'react-native';
import List from '../../../src/components/List';
import CenterView from '../CenterView';
import Icon from 'react-native-vector-icons/Feather';

storiesOf('List', module)
  .addDecorator((getStory) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      {getStory()}
    </View>
  ))
  .add('default', () => (
    <>
      <List.Item label="Label" text="John Smith" />
      <View style={{ marginTop: 8, width: '100%' }}>
        <List.Item label="Label" text="Some link" href="#" />
      </View>
      <View style={{ marginTop: 8, width: '100%' }}>
        <List.Item
          label="Label"
          text="Some link"
          right={(props) => <Icon size={18} {...props} name="trash-2" />}
        />
      </View>
    </>
  ));
