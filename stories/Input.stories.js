import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import TextInput from "../src/components/Input/TextInput";
import { DefaultTheme, Menu, Provider } from "../src";
import { useFuse } from "../src/components/Input/useFuse";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/TextInput",
  component: TextInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: ["text", "text-area", "stripe-card"],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{
      flex: 1,
      padding: 16,
      height: 80,
      alignItems: "flex-start",
      backgroundColor: DefaultTheme.colors.bg.canvas,
      flexDirection: "row",
    }}
  >
    <TextInput {...args} />
  </KeyboardAvoidingView>
);

const AutocompleteExample = (args) => {
  const [value, setValue] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const options = ["Apple", "Banana", "Orange", "Pineapple", "Strawberry"];
  const searchResults = useFuse(value, options);
  React.useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      //If input value is same as first result, hide menu
      if (searchResults[0].item === value) setVisible(false);
      //Show menu whenever there are results
      else setVisible(true);
    }
    console.log(searchResults);
  }, [searchResults]);
  return (
    <Provider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          padding: 16,
          height: 80,
          alignItems: "flex-start",
          backgroundColor: DefaultTheme.colors.bg.canvas,
          flexDirection: "row",
        }}
      >
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={<TextInput value={value} onChangeText={setValue} {...args} />}
        >
          {searchResults.map((item, i) => (
            <Menu.Item
              onPress={() => {
                setValue(item.item);
                setVisible(false);
              }}
              title={item.item}
            />
          ))}
        </Menu>
      </KeyboardAvoidingView>
    </Provider>
  );
};

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = { label: "Full Name" };

export const TextArea = Template.bind({});
TextArea.args = {
  label: "Textarea Input",
  multiline: true,
  numberOfLines: 7,
};

export const Autocomplete = AutocompleteExample.bind({});
Autocomplete.args = { label: "Full Name" };
