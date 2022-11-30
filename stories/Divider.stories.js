import React from "react";
import Divider from "../src/components/Divider/Divider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Divider",
  component: Divider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Divider {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const Label = Template.bind({});
Label.args = {
  label: "text in the middle",
};
