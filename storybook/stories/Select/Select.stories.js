import React, { useState } from 'react';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react-native';
import {
  Provider as ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '../../../src/index';
import { Text } from 'react-native';
import Select from '../../../src/components/Select';
import CenterView from '../CenterView';

const data = [
  { label: 'One', value: '1', description: 'This is some description' },
  { label: 'Two', value: '2' },
  { label: 'Three', value: '3' },
  { label: 'Four', value: '4' },
  { label: 'Five', value: '5' },
];

const SelectComponent = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <ThemeProvider>
      <Select
        data={data}
        label={'Select Item'}
        onSelect={setSelected}
        selected={selected}
      />
    </ThemeProvider>
  );
};

storiesOf('Select', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <SelectComponent />);
