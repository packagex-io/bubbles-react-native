import React, { useState } from 'react';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react-native';
import {
  Provider as ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '../../../src/index';
import { Text, View } from 'react-native';
import Select from '../../../src/components/Select';
import CenterView from '../CenterView';

const data = [
  { label: 'One', value: '1', description: 'This is some description' },
  { label: 'Two', value: '2', description: 'More description' },
  { label: 'Three', value: '3' },
  { label: 'Four', value: '4' },
  { label: 'Five', value: '5' },
];

const SelectComponent = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <ThemeProvider>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',

          justifyContent: 'center',

          position: 'relative',
          paddingTop: 180,
        }}
      >
        <Select
          data={data}
          label={'Select Item'}
          onSelect={setSelected}
          selected={selected}
        />
      </View>
    </ThemeProvider>
  );
};

storiesOf('Select', module)
  .addDecorator((getStory) => <>{getStory()}</>)
  .add('default', () => <SelectComponent />);
