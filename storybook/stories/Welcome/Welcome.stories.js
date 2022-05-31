import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react-native';
import Welcome from '.';
import {
  Provider as ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '../../../src/index';

storiesOf('Welcome', module).add('to Storybook', () => (
  <ThemeProvider>
    <Welcome showApp={linkTo('Button')} />
  </ThemeProvider>
));
