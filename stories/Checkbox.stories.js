import React from "react";
import { Provider } from "../src";
import Checkbox from "../src/components/Checkbox/Checkbox";

export default {
  title: "components/Checkbox",
  component: Checkbox,
  argTypes: {
    onPress: { action: "pressed" },
  },
};

const ControlledCheckbox = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      onPress={() => {
        setChecked(!checked);
      }}
      status={checked ? "checked" : "unchecked"}
    />
  );
};

export const Basic = (args) => (
  <Provider>
    <ControlledCheckbox />
  </Provider>
);

Basic.args = {};
