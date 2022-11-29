import { View } from "react-native";
import React from "react";
import { DefaultTheme, Provider } from "../src";
import Select from "../src/components/Select";

export default {
  title: "components/Select",
  component: Select,
  argTypes: {
    onPress: { action: "pressed" },
  },
};

const data = [
  { label: "One", value: "1", description: "This is some description" },
  { label: "Two", value: "2", description: "More description" },
  { label: "Three", value: "3" },
  { label: "Four", value: "4" },
  { label: "Five", value: "5" },
];

export const Basic = (args) => {
  const [selected, setSelected] = React.useState(undefined);
  return (
    <Provider>
      <View
        style={{
          backgroundColor: DefaultTheme.colors.bg.canvas,
          justifyContent: "center",
          paddingTop: 0,
          padding: 16,
          flex: 1,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 420,
          }}
        >
          <Select data={data} label={"Select Item"} onSelect={setSelected} />
        </View>
      </View>
    </Provider>
  );
};

Basic.args = {
  // color: "purple",
};
