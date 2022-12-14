import React from "react";
import SegmentedController from "../src/components/SegmentedController/SegmentedController";

import { DefaultTheme } from "../src";
import { colors } from "../src/styles/tokens";

export default {
  title: "components/SegmentedController",
  component: SegmentedController,

  argTypes: {
    mode: {
      options: ["default", "line"],
      control: { type: "radio" },
    },
  },
};

// Other Avatar stories

const Template = (args) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <SegmentedController
      segments={[{ label: "First" }, { label: "Second" }, { label: "Third" }]}
      onChange={(index) => setTabIndex(index)}
      currentIndex={tabIndex}
      {...args}
    />
  );
};

export const Basic = Template.bind({});

Basic.args = { mode: "line" };
