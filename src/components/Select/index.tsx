import React, { FC, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { withTheme } from '../../core/theming';
import { black, transparent } from '../../styles/colors';
import Surface from '../Surface';

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
};

const Select: FC<Props> = ({ label, theme, onSelect, data }: Props) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);

  const DropdownButton = React.useRef();
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  const font = theme.fonts.semiBold;

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h + 8);
      setDropdownWidth(_w);
    });
    setVisible(true);
  };

  const onItemPress = (item): void => {
    console.log(item);
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item, index }) => (
    <>
      <TouchableOpacity style={[styles.item]} onPress={() => onItemPress(item)}>
        <Text
          style={[
            { ...font },
            selected?.label === item.label
              ? { color: theme.colors.primary }
              : { color: black },
          ]}
        >
          {item.label}
        </Text>
        {item.description && <Text>{item.description}</Text>}
      </TouchableOpacity>
      {index !== data.length - 1 && (
        <View pointerEvents="none" style={styles.divider} />
      )}
    </>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <Surface
            style={[
              styles.dropdown,
              { top: dropdownTop, width: dropdownWidth },
            ]}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </Surface>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <Surface
      style={[
        { width: '100%', borderRadius: 16, ...styles.outline },
        visible ? { borderColor: theme.colors.primary } : {},
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
        ref={DropdownButton}
      >
        {renderDropdown()}
        <View style={{ flexDirection: 'column' }}>
          <Text style={[styles.label, { ...font, flex: 1 }]}>{label}</Text>
          <Text style={{ flex: 1, color: black, ...font }}>
            {selected?.label || 'None'}
          </Text>
        </View>
        {/* <Icon type='font-awesome' name='chevron-down'/> */}
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  outline: {
    borderWidth: 2,
    borderColor: 'transparent',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    width: '100%',
    paddingHorizontal: 22,
    zIndex: 1,
    borderRadius: 16,
    position: 'relative',
  },
  divider: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#CCCDD3',
  },
  item: {
    paddingHorizontal: 19,

    flex: 1,
    height: 100,
    justifyContent: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  label: {
    // flex: 1,
    textAlign: 'left',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    fontSize: 10,
    top: 19,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    height: 256,
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 24,
    shadowColor: 'rgba(48, 49, 51, 0.4)',
  },
});

export default withTheme(Select);
