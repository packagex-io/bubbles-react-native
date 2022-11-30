import { theme } from "@storybook/react-native/dist/preview/components/Shared/theme";
import * as React from "react";
import {
  UseFormReturn,
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import {
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
  GestureResponderEvent,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { withTheme } from "../../core/theming";
import { Theme } from "../../types";
import Button from "../Button";
import Checkbox from "../Checkbox/Checkbox";
import { isInputValid } from "../Input/helpers";
import TextInput, { TextInputProps } from "../Input/TextInput";
import { ValidationType } from "../Input/types";
import RadioButton from "../Radio";
import RadioButtonGroup from "../Radio/RadioButtonGroup";
import Select from "../Select";
import Switch from "../Switch/Switch";
import TouchableRippleNative from "../TouchableRipple/TouchableRipple.native";
import Text from "../Typography/Text";

interface InputTypeProps extends Omit<TextInputProps, "type"> {
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "textarea"
    | "tel"
    | "phone"
    | "time";
}

type SwitchTypeProps = React.ComponentPropsWithoutRef<typeof Switch> & {
  type: "switch";
  label: string;
  desc?: string;
  defaultValue?: boolean;
};

type SelectTypeProps = React.ComponentPropsWithoutRef<typeof Select> & {
  type: "select";
};

type RadioTypeProps = React.ComponentPropsWithRef<typeof RadioButtonGroup> & {
  type: "radio" | "radio-group";
  options: { label: string; value: string }[];
  label?: string;
  desc?: string;
};

type CheckboxTypeProps = React.ComponentPropsWithRef<typeof Checkbox> & {
  type: "checkbox";
  label: string;
  desc?: string;
  defaultValue?: boolean;
}; //TODO labelled checkbox and checkbox group,divider

type ButtonTypeProps = React.ComponentPropsWithRef<typeof Button> & {
  type: "submit";
  /**
   *
   */
  onSubmit: (data: any, e?: any) => void;
  onError?: (errors: any, e?: any) => void;
  onPress?: (event: GestureResponderEvent) => void;
  label: string;
};

type CommonProps = {
  width: number | string;
  name: string;
  theme: Theme;
  defaultValue?: string;
};

type InputProps = (
  | InputTypeProps
  | SwitchTypeProps
  | SelectTypeProps
  | RadioTypeProps
  | ButtonTypeProps
  | CheckboxTypeProps
) &
  CommonProps;

export type Props = {
  /**
   * If you want to override useForm hook props from react-hook-form internally then pass them here.
   */
  useFormMethods?: UseFormReturn;
  /**
   * Array of inputs within the form. Each object will be passed as props to the type of input specified by the 'type' property.
   */
  inputs: Array<InputProps>;
  containerStyle?: StyleProp<ViewStyle>;
  theme: Theme;
};

const ControlledTextInput = (props: InputTypeProps & CommonProps) => {
  const { validation, ...rest } = props;
  const { control } = useFormContext();

  const getKeyboardTypeFromType = (type: string) => {
    switch (type) {
      case "email":
        return "email-address";
      case "number":
        return "numeric";
      case "tel":
      case "phone":
        return "phone-pad";
      case "date":
        return "default";
      case "time":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Controller
      control={control}
      defaultValue=""
      rules={{
        validate: (v) => isInputValid(v, validation),
      }}
      render={({
        field: { onChange, onBlur, value },
        formState: { errors },
      }) => (
        <TextInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          isInvalid={!!errors[props.name]}
          keyboardType={getKeyboardTypeFromType(props.type)}
          {...rest}
        />
      )}
      name={props.name}
    />
  );
};

// TODO : Validation for select, checkbox, switch
const ControlledSelect = (props: SelectTypeProps & CommonProps) => {
  const { ...rest } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      render={({
        field: { onChange, onBlur, value },
        formState: { errors },
      }) => <Select onSelect={onChange} {...rest} />}
      name={props.name}
    />
  );
};

//TODO: Move styling to RadioButtonGroup - make label clickable too
const ControlledRadio = (props: RadioTypeProps & CommonProps) => {
  const { theme } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={props.defaultValue}
      render={({
        field: { onChange, onBlur, value },
        formState: { errors },
      }) => (
        <View
          style={{
            width: "100%",
            backgroundColor: theme.colors.bg.canvas,
            paddingVertical: 16,
            paddingHorizontal: 8,
            borderRadius: 12,
            marginVertical: 8,
            flexDirection: "column",
          }}
        >
          {props.label && (
            <Text
              variant="Caption"
              style={{ fontWeight: "bold", paddingLeft: 8 }}
            >
              {props.label}
            </Text>
          )}
          {props.desc && (
            <Text style={{ marginBottom: 8, paddingLeft: 8 }} variant="XSmall">
              {props.desc}
            </Text>
          )}
          <RadioButton.Group onValueChange={onChange} value={value}>
            {props.options.map((option, i) => (
              <View
                key={i}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <RadioButton value={option.value} />
                <Text>{option.label}</Text>
              </View>
            ))}
          </RadioButton.Group>
        </View>
      )}
      name={props.name}
    />
  );
};

const ControlledSwitch = (props: SwitchTypeProps & CommonProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={false}
      render={({ field: { onChange, onBlur, value } }) => (
        // TODO: move to Labeled Switch component
        <View style={{ width: "100%", marginVertical: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: props.theme.colors.bg.canvas,
              width: "100%",
              borderRadius: 12,
              height: 80,
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ fontWeight: "bold" }} variant="Caption">
              {props.label}
            </Text>
            <Switch
              value={value}
              onValueChange={() => {
                onChange(!value);
              }}
              {...props}
            />
          </View>
          {props.desc && (
            <Text
              style={{
                marginLeft: 16,
                marginTop: 4,
                color: props.theme.colors.fg.subtle,
              }}
              variant="XSmall"
            >
              {props.desc}
            </Text>
          )}
        </View>
      )}
      name={props.name}
    />
  );
};

const ControlledCheckbox = (props: CheckboxTypeProps & CommonProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={props.defaultValue ?? false}
      render={({ field: { onChange, onBlur, value } }) => (
        // TODO: move to Labeled Checkbox component
        <TouchableWithoutFeedback
          style={{ width: "100%", marginVertical: 8 }}
          onPress={() => onChange(!value)}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              backgroundColor: props.theme.colors.bg.canvas,
              width: "100%",
              borderRadius: 12,

              paddingVertical: 16,
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{ fontWeight: "bold", marginBottom: 4 }}
              variant="Caption"
            >
              {props.label}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                onPress={() => onChange(!value)}
                status={value ? "checked" : "unchecked"}
              />
              {typeof props.desc === "string" ? (
                <Text
                  style={{
                    marginLeft: 4,
                    color: props.theme.colors.fg.subtle,
                  }}
                  variant="XSmall"
                >
                  {props.desc}
                </Text>
              ) : (
                props.desc && props.desc
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      name={props.name}
    />
  );
};

const Form = ({
  containerStyle,
  useFormMethods,
  theme,
  inputs,
  ...rest
}: Props) => {
  const internalMethods = useForm({ mode: "all" });
  const methods = useFormMethods ?? internalMethods;

  return (
    <FormProvider {...methods}>
      <ScrollView>
        <View style={[styles.container, containerStyle]}>
          {inputs.map((input, index) => {
            switch (input.type) {
              case "text":
              case "email":
              case "password":
              case "number":
              case "date":
              case "textarea":
              case "tel":
              case "phone":
              case "time":
                return (
                  <View key={index} style={[{ width: input.width ?? "100%" }]}>
                    <ControlledTextInput theme={theme} {...input} />
                  </View>
                );
              case "switch":
                return (
                  <View key={index} style={[{ width: input.width ?? "100%" }]}>
                    <ControlledSwitch theme={theme} {...input} />
                  </View>
                );
              case "select":
                return (
                  <View key={index} style={[{ width: input.width ?? "100%" }]}>
                    <ControlledSelect theme={theme} {...input} />
                  </View>
                );
              case "radio":
              case "radio-group":
                return (
                  <View key={index} style={[{ width: input.width ?? "100%" }]}>
                    <ControlledRadio theme={theme} {...input} />
                  </View>
                );
              case "checkbox":
                return (
                  <View key={index} style={[{ width: input.width ?? "100%" }]}>
                    <ControlledCheckbox theme={theme} {...input} />
                  </View>
                );
              case "submit":
                const { type, onSubmit, onError, onPress, ...rest } = input;
                return (
                  <View
                    key={index}
                    style={[
                      { width: input.width ?? "100%", marginVertical: 8 },
                    ]}
                  >
                    <Button
                      onPress={(e) => {
                        methods.handleSubmit(onSubmit, onError)(e);
                        typeof onPress === "function" && onPress(e);
                      }}
                      key={index}
                      {...rest}
                    >
                      {rest.label ?? rest.children ?? "Submit"}
                    </Button>
                  </View>
                );
            }
          })}
        </View>
      </ScrollView>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});

export default withTheme(Form);
