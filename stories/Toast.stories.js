import { useArgs } from "@storybook/client-api";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../src/components/Button";
import Toast from "../src/components/Toast/Toast";

export default {
  title: "components/Toast",
  component: Toast,

  argTypes: {},
};

const Template = (args) => {
  const [{ visible: visibleArg }, updateArgs] = useArgs();
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    setVisible(visibleArg);
  }, [visibleArg]);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => {
    updateArgs({ visible: false });
    setVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button onPress={() => setVisible(true)}>Show Toast</Button>
      <View style={{ width: "100%", maxWidth: 420, alignItems: "flex-end" }}>
        <Toast
          visible={visible}
          onDismiss={onDismissSnackBar}
          color={args.color}
        >
          {args.text}
        </Toast>
      </View>
    </SafeAreaView>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  text: "Your settings were successfully updated!",
  action: {
    label: "Close",
    onPress: () => {
      // Do something
    },
  },
  visible: true,
  onDismiss: () => {},
  color: "dark",
};
