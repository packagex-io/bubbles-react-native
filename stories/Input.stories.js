import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import TextInput from "../src/components/Input/TextInput";
import { DefaultTheme, Menu, Provider, Text } from "../src";
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
  const items = [
    {
      title: "Old Man's War",
      author: "John Scalzi",
      tags: ["fiction"],
    },
    {
      title: "The Lock Artist",
      author: "Steve",
      tags: ["thriller"],
    },
  ];
  const searchResults = useFuse(value, items, {
    includeScore: true,
    // Search in `author` and in `title` fields
    keys: ["author", "title"],
  });
  React.useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      //If input value is same as first result, hide menu
      if (searchResults[0].item.title === value) setVisible(false);
      //Show menu whenever there are results
      else setVisible(true);
    }
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
                setValue(item.item.title);
                setVisible(false);
              }}
              title={
                <View style={{ margin: 0 }}>
                  <Text style={{ fontWeight: "bold" }} variant="Caption">
                    {item.item.title}
                  </Text>
                  <Text variant="XSmall">by {item.item.author}</Text>
                </View>
              }
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
Autocomplete.args = { label: "Book title" };
