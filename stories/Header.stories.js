import React from "react";
import Header from "../src/components/Header/Header";
import { Provider } from "../src";
import HeaderBackAction from "../src/components/Header/HeaderBackAction";
import HeaderAction from "../src/components/Header/HeaderAction";
import HeaderContent from "../src/components/Header/HeaderContent";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Header",
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <Provider>
    <Header align="center">
      <HeaderBackAction
        onPress={() => {
          console.log("back");
        }}
        size={24}
      />
      <HeaderContent
        title="Page Title"
        subtitle="12 Routes - Estimated Time 7h 30m"
      />
      <HeaderAction
        size={18}
        icon={"image-filter-center-focus"}
        onPress={() => {
          console.log("action");
        }}
      />
      <HeaderAction
        size={18}
        icon={"close"}
        onPress={() => {
          console.log("action");
        }}
      />
    </Header>
  </Provider>
);

export const Basic = Template.bind({});
Basic.args = {
  title: "Header",
};
