import React from "react";
import StorybookUIRoot from "./.ondevice/Storybook";
import { Platform, StatusBar, View } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "./src";
import { FormComponent } from "./stories/Form.stories";

export default () => {
  const [fontsLoaded] = useFonts({
    Inter: require("./src/assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("./src/assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("./src/assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <StorybookUIRoot />
    </View>
  );
};
