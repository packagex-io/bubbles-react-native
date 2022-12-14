# Getting started

## Installation

Run the following command in your project's folder -

```
yarn add react-native-bubbles
```

or

```
npm i react-native-bubbles
```

At the moment the library uses [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) so make sure you install it by following the instructions in their repository.

For ios you will need to link the native parts of the library by running

```
npx pod-install
```

## Usage

It is necessary to wrap your root component with the `Provider` from the library. Here is an example of how you might do that in your `App.js` file:

```
import * as React from 'react';
import { Provider as ThemeProvider } from 'react-native-bubbles';

export default function App() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
```

# Development

To get all the dependencies run.

```
yarn install
```

To run on the web use

```
yarn storybook
```

To run on ios or android

```
yarn start
```

Then open the app from the terminal or from the expo ui in ios or android.

## Updating stories on the device

If you add new stories on the native (ondevice version) you either need to have the watcher running or run the stories loader

To update the stories one time

```
yarn update-stories
```

To watch the stories files

```
yarn storybook-watcher
```

Note that this is only necessary for when you add or remove a story file.

# Credits

I would like to give credit where due to other open source projects that helped me make this. Here are some that I can remember:
- [react-native-paper](https://github.com/callstack/react-native-paper)
- [react-native-indicators](https://github.com/n4kz/react-native-indicators)
- [react-native-mask-input](https://github.com/CaioQuirinoMedeiros/react-native-mask-input)
- And of course the svelte counterpart - [Bubbles](https://github.com/vpanyushenko/bubbles)
