import React from "react";
import { Provider } from "../src";
import Checkbox from "../src/components/Checkbox/Checkbox";
import { useArgs } from "@storybook/client-api";
import { action } from "@storybook/addon-actions";

export default {
  title: "components/Checkbox",
  component: Checkbox,
  argTypes: {
    status: {
      control: {
        type: "select",
      },
      options: ["checked", "unchecked"],
    },
    onPress: {
      action: "clicked",
    },
  },
};

const Template = (args) => {
  const [checked, setChecked] = React.useState(false);
  const [{ status }, updateArgs] = useArgs();

  React.useEffect(() => {
    updateArgs({ status: checked ? "checked" : "unchecked" });
  }, [checked]);

  return (
    <Provider>
      <Checkbox
        {...args}
        onPress={(e) => {
          action("click")(e);
          setChecked(!checked);
        }}
        status={checked ? "checked" : "unchecked"}
      />
    </Provider>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  status: "unchecked",
};
