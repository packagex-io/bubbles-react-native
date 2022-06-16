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
import { black } from '../../styles/colors';
import Surface from '../Surface';

type Props = React.ComponentProps<typeof Surface> & {
  label: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
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

  const font = theme.fonts.semiBold;

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h + 8);
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
    <TouchableOpacity
      style={
        index == data.length - 1
          ? { ...styles.item, borderBottomWidth: 0 }
          : styles.item
      }
      onPress={() => onItemPress(item)}
    >
      <Text style={{ ...font, color: black }}>{item.label}</Text>
      {item.description && <Text>{item.description}</Text>}
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <Surface style={{ width: '100%', borderRadius: 16 }}>
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    width: '90%',
    paddingHorizontal: 22,
    zIndex: 1,
    borderRadius: 16,
  },
  item: {
    paddingHorizontal: 19,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#CCCDD3',
    height: 80,
    justifyContent: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
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
  },
});

export default withTheme(Select);
