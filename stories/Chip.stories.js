import React from "react";
import { View } from "react-native";

import { colors } from "../src/styles/tokens";

import { DefaultTheme } from "../src";
import Chip from "../src/components/Chip/Chip";

export default {
  title: "components/Chip",
  component: Chip,
  argTypes: {
    mode: {
      control: {
        type: "select",
      },
      options: ["flat", "outlined"],
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

export const Basic = (args) => (
  <View style={{ alignItems: "flex-start" }}>
    <Chip textStyle={{ fontFamily: "Inter", fontWeight: "700" }} {...args}>
      {args.text}
    </Chip>
  </View>
);

Basic.args = {
  mode: "flat",
  text: "Primary",
};
