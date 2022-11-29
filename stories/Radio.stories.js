import React from "react";
import { Provider } from "../src";
import RadioButton from "../src/components/Radio";
import { View } from "react-native";
import Text from "../src/components/Typography/Text";

export default {
  title: "components/Radio",
  component: RadioButton,
  argTypes: {
    onPress: { action: "pressed" },
  },
};

const RadioGroupExample = () => {
  const [value, setValue] = React.useState("first");

  return (
    <RadioButton.Group
      onValueChange={(newValue) => setValue(newValue)}
      value={value}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RadioButton value="first" />
        <Text>First</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <RadioButton value="second" />
        <Text>Second</Text>
      </View>
    </RadioButton.Group>
  );
};

export const Basic = (args) => (
  <Provider>
    <RadioGroupExample />
  </Provider>
);

Basic.args = {};
