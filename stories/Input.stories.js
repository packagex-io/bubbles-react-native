import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import TextInput from "../src/components/Input/TextInput";
import { DefaultTheme } from "../src";

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
      width: "100%",
      padding: 16,
      flex: 1,
      alignItems: "flex-start",
      backgroundColor: DefaultTheme.colors.bg.canvas,
    }}
  >
    <TextInput {...args} />
  </KeyboardAvoidingView>
);

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = { label: "Full Name" };

export const TextArea = Template.bind({});
TextArea.args = {
  label: "Textarea Input",
  multiline: true,
  numberOfLines: 7,
};
