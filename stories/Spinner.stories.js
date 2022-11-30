import React from "react";
import { DefaultTheme } from "../src";
import Spinner from "../src/components/Spinner/Spinner";
import { colors } from "../src/styles/tokens";

export default {
  title: "components/Spinner",
  component: Spinner,

  argTypes: {},
};

// Other Avatar stories

const Template = (args) => <Spinner {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  size: 24,
  color: DefaultTheme.colors.primary.default,
};
