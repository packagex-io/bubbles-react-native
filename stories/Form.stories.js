import React from "react";
import { View, SafeAreaView } from "react-native";

import { Provider } from "../src";
import Form from "../src/components/Form/Form";

export default {
  title: "components/Form",
  component: Form,
  argTypes: {
    onPress: { action: "pressed" },
  },
};

const FormComponent = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 8,
        marginHorizontal: 8,
      }}
    >
      <Form
        inputs={[
          {
            type: "text",
            name: "name",
            label: "Your Name",
            desc: "You'll be able to change this name later", //TODO
            error: "A name is required",
            validation: { string:true, required: true, min: 3, max: 20 },
          },
          {
            type: "email",
            name: "email",
            label: "Your Email",
            desc: "You'll be able to change this name later",
            error: "Valid email is required",
            validation: { email: true, required: true },
          },
          {
            type: "date",
            name: "date",
            label: "Date",
            error: "Valid date is required",
            validation: { required: true, date: true },
          },
          {
            type: "time",
            name: "time",
            label: "time",
            error: "This field is required",
            validation: { required: true },
          },
          {
            type: "switch",
            name: "preferences.email",
            label: "Email Updates",

            desc: "Let us know if you want to receive email updates",
            disabled: false,
            error: "An error occurred",
          },
          {
            type: "textarea", //the textarea / text field input
            name: "description",
            label: "Your Address",
            error: "Address is required",
            desc: "Type your address",
            numberOfLines: 8,
            multiline: true,
            validation: { required: true },
          },
          {
            type: "select",
            name: "role",
            label: "Select Your Role",
            desc: null,
            data: [
              {
                label: "Owner",
                description: "This is the highest position",
                value: "owner",
              },

              {
                label: "Collaborator",
                value: "collaborator",
              },
              {
                label: "User",
                value: "user",
              },
            ],
          },
          {
            type: "radio",
            name: "radio",
            label: "Select your bread",
            desc: "Let us know what type of bread you want",
            defaultValue: "plain",
            options: [
              {
                label: "Plain",
                value: "plain",
              },
              {
                label: "Whole Wheat",
                value: "whole_wheat",
              },
              {
                label: "Spinach",
                value: "spinach",
              },
            ],
          },
          {
            type: "checkbox",
            name: "terms",
            label: "Terms and conditions",

            desc: "By submitting this form you agree to our terms. ",
          },
          {
            type: "submit", //The form must have a submit button
            label: "Submit Form", //The label for the submit button,
            onSubmit: (data, _e) => {
              console.log(data);
            },
            onError: (error, _e) => {
              console.log(error);
            },
          },
        ]}
      />
    </SafeAreaView>
  );
};

export const Basic = (args) => (
  <Provider>
    <FormComponent />
  </Provider>
);

Basic.args = {};
