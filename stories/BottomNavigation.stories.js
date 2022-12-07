import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "../src";
import BottomNavigation from "../src/components/BottomNavigation/BottomNavigation";
import Text from "../src/components/Typography/Text";

export default {
  title: "components/BottomNavigation",
  component: BottomNavigation,

  argTypes: {},
};

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const NavComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "music",
      title: "Favorites",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "albums", title: "Albums", focusedIcon: "album" },
    { key: "recents", title: "Recents", focusedIcon: "history" },
    {
      key: "notifications",
      title: "Notifications",
      focusedIcon: "bell",
      unfocusedIcon: "bell-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: "#fff" }}
      safeAreaInsets={{ bottom: 16 }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const Template = (args) => (
  <SafeAreaProvider>
    <Provider>
      <NavComponent />
    </Provider>
  </SafeAreaProvider>
);

export const Basic = Template.bind({});

Basic.args = {};
