import { useArgs } from "@storybook/client-api";
import React from "react";
import { View } from "react-native";
import { DefaultTheme } from "../src";
import Switch from "../src/components/Switch/Switch";
import Text from "../src/components/Typography/Text";

import { colors } from "../src/styles/tokens";

export default {
  title: "components/Switch",
  component: Switch,

  argTypes: {
    onValueChange: {
      action: "clicked",
    },
  },
};

const Template = (args) => {
  const [{ value: valueArg }, updateArgs] = useArgs();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  React.useEffect(() => {
    setIsSwitchOn(valueArg);
  }, [valueArg]);

  const onToggleSwitch = () => {
    updateArgs({ value: !isSwitchOn });
    setIsSwitchOn(!isSwitchOn);
  };
  return (
    <View style={{ width: "100%", marginVertical: 8 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: DefaultTheme.colors.bg.canvas,
          width: "100%",
          borderRadius: 12,
          height: 80,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontWeight: "bold" }} variant="Caption">
          {args.label}
        </Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      {args.desc && (
        <Text
          style={{
            marginLeft: 16,
            marginTop: 4,
            color: DefaultTheme.colors.fg.subtle,
          }}
          variant="XSmall"
        >
          {args.desc}
        </Text>
      )}
    </View>
  );
};

export const Basic = Template.bind({});
/*
 * More on args at:
 * https://storybook.js.org/docs/react/writing-stories/args
 */
Basic.args = {
  value: true,
  label: "Email Updates",
  desc: "Let us know if you want to receive email updates",
};
