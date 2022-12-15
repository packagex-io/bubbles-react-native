import React from "react";
import { View } from "react-native";
import { DefaultTheme, Provider } from "../src";
import Button from "../src/components/Button";
import { colors } from "../src/styles/tokens";

export default {
  title: "components/Button",
  component: Button,

  argTypes: {
    mode: {
      control: {
        type: "select",
      },
      options: ["contained", "outlined"],
    },
    onClick: {
      action: "clicked",
    },
    color: {
      control: {
        type: "color",
        presetColors: [
          { color: DefaultTheme.colors.primary.default, title: "primary" },
          { color: DefaultTheme.colors.secondary.default, title: "secondary" },
          { color: DefaultTheme.colors.success.default, title: "success" },
          { color: DefaultTheme.colors.warning.default, title: "warning" },
          { color: DefaultTheme.colors.error.default, title: "error" },
          { color: DefaultTheme.colors.info.default, title: "info" },
          { color: colors.gray400, title: "gray" },
          { color: colors.black, title: "black" },
        ],
      },
    },
  },
};

export const Large = (args) => (
  <Provider>
    <View style={{ margin: 8 }}>
      <Button {...args} onPress={() => console.log("press")}>
        {args.text}
      </Button>
    </View>
  </Provider>
);

Large.args = {
  loading: false,
  mode: "contained",
  text: "Hello",
  disabled: false,
};
