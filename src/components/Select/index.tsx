import React, { FC, useState } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { withTheme } from "../../core/theming";
import { colors, colors as Colors, typescale } from "../../styles/tokens";
import Divider from "../Divider/Divider";
import Icon from "../Icon";
import IconButton from "../IconButton/IconButton";
import Menu from "../Menu/Menu";
import OldMenu from "../Menu/OldMenu";

import Surface from "../Surface";

type Props = React.ComponentProps<typeof Surface> & {
  /**
   * The text to use for the floating label.
   */
  label: string;
  /**
   * If true, user won't be able to interact with the component.
   */
  disabled?: boolean;
  /**
   * Whether to style the Select component with error style.
   */
  error?: boolean;
  /**
   * The options that are shown when the select menu is open
   */
  data: Array<{ label: string; value?: string; description?: string }>;
  /**
   * Callback when an option is selected by the user. The selected item is an object passed as an argument to the callback handler.
   */
  onSelect: (item: {
    label: string;
    value?: string;
    description?: string;
  }) => void;
  /**
   * @optional
   */
  theme: PackageX.Theme;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

const Select: FC<Props> = ({ label, theme, onSelect, data, style }: Props) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [selected, setSelected] = useState(undefined);
  const [selectButtonWidth, setSelectButtonWidth] = useState(0);

  const DropdownButton = React.useRef();

  const font = theme.fonts.semiBold;

  const SelectButton = () => {
    return (
      <Surface
        style={[
          {
            width: "100%",
            borderRadius: 16,
            ...styles.outline,
            backgroundColor: theme.colors.bg.subtle,
          },
          visible
            ? {
                borderColor: theme.colors.primary.default,
                backgroundColor: theme.colors.bg.surface,
              }
            : {},
          Platform.OS === "web" && { elevation: 0 },
          style,
        ]}
        onLayout={(event) => {
          setSelectButtonWidth(event.nativeEvent.layout.width);
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setVisible(true);
          }}
          ref={DropdownButton}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.label, { ...font, flex: 1 }]}>{label}</Text>
            <Text style={{ flex: 1, color: Colors.black, ...font }}>
              {selected?.label || "None"}
            </Text>
          </View>
          <IconButton
            icon="chevron-down"
            iconColor={colors.black}
            size={20}
            onPress={() => setVisible(true)}
          />
        </TouchableOpacity>
      </Surface>
    );
  };

  const renderMenuItems = React.useMemo(() => {
    return (
      data &&
      data.map((item, i) => {
        return (
          <View key={i} style={{ width: selectButtonWidth }}>
            <Menu.Item
              style={[styles.item, { width: "100%" }]}
              onPress={() => {
                closeMenu();
                onSelect(item);
                setSelected(item);
              }}
              title={item.label}
              titleStyle={{ ...typescale.Caption, fontWeight: "700" }}
            />
            {i < data.length - 1 && <Divider />}
          </View>
        );
      })
    );
  }, [data, selectButtonWidth]);
  return (
    <Menu visible={visible} onDismiss={closeMenu} anchor={<SelectButton />}>
      {renderMenuItems}
    </Menu>
  );
};

const styles = StyleSheet.create({
  outline: {
    borderWidth: 2,
    borderColor: "transparent",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    // width: '100%',
    paddingHorizontal: 22,
    zIndex: 1,
    borderRadius: 16,
    position: "relative",
    justifyContent: "space-between",
  },
  divider: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#CCCDD3",
  },
  item: {
    paddingHorizontal: 19,

    height: 80,
    justifyContent: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  label: {
    // flex: 1,
    textAlign: "left",
    letterSpacing: 0.9,
    textTransform: "uppercase",
    fontSize: 10,
    top: 19,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    // height: 256,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 24,
    shadowColor: "rgba(48, 49, 51, 0.4)",
  },
});

export default withTheme(Select);
