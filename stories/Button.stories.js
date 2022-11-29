import React from "react";
import { Provider } from "../src";
import Button from "../src/components/Button";

export default {
  title: "components/Button",
  component: Button,
  argTypes: {
    onPress: { action: "pressed" },
  },
};

export const Basic = (args) => (
  <Provider>
    <Button {...args}>{args.text}</Button>
  </Provider>
);

Basic.args = {
  text: "Hello",
  // color: "purple",
};
