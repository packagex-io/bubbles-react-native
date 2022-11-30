# Getting started

To get all the dependencies run. Make sure you install the peer dependencies mentioned in the package.json separately with `yarn add <dependencies>`.

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

Then from open the app from the terminal or from the expo ui in ios or android.

# Updating stories on the device

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
