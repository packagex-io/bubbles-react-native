import React from "react";

import { Platform, View } from "react-native";

import { Provider as ThemeProvider, Text, useTheme } from "../src";
import Modal from "../src/components/Modal/Modal";
import Portal from "../src/components/Portal/Portal";
import MessageModal from "../src/components/Modal/MessageModal";

import Button from "../src/components/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Modal",
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

const ModalExample = ({}) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  return (
    <>
      <Portal>
        <MessageModal
          title="Message modal"
          onDismiss={() => {
            setVisible(false);
          }}
          visible={visible}
        >
          <View
            style={{
              backgroundColor: "#D9D9D9",
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              height: 168,
            }}
          >
            <Text variant="XSmall">Slot</Text>
          </View>
        </MessageModal>
      </Portal>
      <View
        style={{
          backgroundColor: "transparent",
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Button mode="contained" style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button>
      </View>
    </>
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <>
    <ThemeProvider>
      <ModalExample />
    </ThemeProvider>
  </>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
