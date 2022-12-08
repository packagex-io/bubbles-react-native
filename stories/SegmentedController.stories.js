import React from "react";
import SegmentedControl from "../src/components/SegmentedController/NewSegmentedController";

import { DefaultTheme } from "../src";
import { colors } from "../src/styles/tokens";

export default {
  title: "components/SegmentedController",
  //   component: SegmentedControl,

  argTypes: {},
};

// Other Avatar stories

const Template = (args) => {
  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <SegmentedControl
      segments={[{ label: "First" }, { label: "Second" }, { label: "Third" }]}
      onChange={(index) => setTabIndex(index)}
      currentIndex={tabIndex}
    />
  );
};

export const Basic = Template.bind({});

Basic.args = {};
