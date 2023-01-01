import * as colors from './styles/tokens';

export { colors };

export { useTheme, withTheme, ThemeProvider } from './core/theming';

export { default as Provider } from './core/Provider';
export { default as DefaultTheme } from './styles/DefaultTheme';
export { default as DarkTheme } from './styles/DarkTheme';
export { default as shadow } from './styles/shadow';
export { default as configureFonts } from './styles/fonts';

export { default as Badge } from './components/Badge';
export { default as ActivityIndicator } from './components/ActivityIndicator';
export { default as BottomNavigation } from './components/BottomNavigation/BottomNavigation';
export { default as Button } from './components/Button';
export { default as Checkbox } from './components/Checkbox/Checkbox';
export { default as Chip } from './components/Chip/Chip';
export { default as DataTable } from './components/Table/DataTable';
export { default as Table } from './components/Table/Table';
export { default as Divider } from './components/Divider/Divider';
export { default as IconButton } from './components/IconButton/IconButton';
export { default as Menu } from './components/Menu/Menu';
export { default as Modal } from './components/Modal/Modal';
export { default as Portal } from './components/Portal/Portal';
export { default as RadioButton } from './components/Radio';
export { default as Searchbar } from './components/Searchbar';
export { default as Toast } from './components/Toast/Toast';
export { default as Surface } from './components/Surface';
export { default as Switch } from './components/Switch/Switch';
export { default as Header } from './components/Header/Header';
export { default as TouchableRipple } from './components/TouchableRipple/TouchableRipple.native';
export { default as TextInput } from './components/Input/TextInput';
export { default as Form } from './components/Form/Form';
export { default as Text } from './components/Typography/Text';
export { default as SegmentedController } from './components/SegmentedController/SegmentedController';

// TODO: Types

export type { Theme } from './types';
