import React from "react";
import Header from "../Header/Header";

import { Provider, Searchbar } from "../..";
import HeaderBackAction from "../Header/HeaderBackAction";
import HeaderAction from "../Header/HeaderAction";
import HeaderContent from "../Header/HeaderContent";
import { View, ViewStyle, StyleProp, ViewProps, TextStyle } from "react-native";
import { colors } from "../../styles/tokens";

type options = React.ComponentPropsWithRef<typeof HeaderAction> & {
  isShow: Boolean,
  icon: String,
  isIcone: Boolean,
  text: string,
  textStyle: StyleProp<TextStyle>,
  onPress: () => void,
  size: Number,
}
export type Props = {
  title?: String,
  subTitle?: String,
  option?: options,
  optionTwo?: options,
  titlePrpos?: React.ComponentPropsWithRef<typeof Text> & { asd: string },
  subTitleProps?: React.ComponentPropsWithRef<typeof Text>,
  centerProps?: React.ComponentPropsWithRef<typeof HeaderBackAction>,
  rightOption?: React.ComponentPropsWithRef<typeof HeaderAction>,
  searchBarShow: Boolean,
  searchbarProps: React.ComponentPropsWithRef<typeof Searchbar>,
  optionTwoPropos: React.ComponentPropsWithRef<typeof HeaderAction>,
  optionOnePropos: React.ComponentPropsWithRef<typeof HeaderAction>,
  leftIcon: String | any | undefined | null
  style: StyleProp<ViewStyle>,

  /**
   * Styling the row to be filled (white background with no borders) or outlined.
   */
  // mode?: "filled" | "outline";
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  onPressLeft?: () => void;
  onPressOptionTwo?: () => void;
  onPressOptionOne?: () => void;
  onPressPrimaryOption?: () => void;
  titleStyle: StyleProp<TextStyle>,
  subtitleStyle: StyleProp<TextStyle>,
  /**
   * @internal
   * Callback when the row is selected.
   */
  // onSelect?: () => void;
  /**
   * Whether the row is selected.
   */
  // selected?: boolean;

  // style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
};



const Template = ({
  title,
  titleStyle,
  subtitleStyle,
  onPressLeft,
  onPressPrimaryOption,
  rightOptionPropos,
  searchbarProps,
  onPress,
  style,
  titlePrpos,
  subTitleProps,
  searchBarShow,
  titleRef,
  subTitle,
  searchbar,
  option,
  leftIcon,
  optionTwo,
  centerProps,
  ...args
}: Props) => {
  const [search, setSearch] = React.useState("");
  return (
    <Provider>
      <View style={[{ flexDirection: 'row', alignItems: 'center' }, style && style]}>
        <HeaderBackAction onPress={onPress} {...args} />
        <HeaderContent
          {...centerProps}
          titleRef={args?.titleRef}
          title={title}
          subtitle={subTitle}
          subtitleStyle={subtitleStyle}
          titleStyle={titleStyle}
        />
        <View style={{ flexDirection: 'row', backgroundColor: 'blue' }}>
          {optionTwo?.icon && < HeaderAction {...optionTwo} />}
          {option?.icon && <HeaderAction {...option} />}
        </View>
      </View>
      {
        searchBarShow ? <Searchbar
          {...searchbarProps}
        /> : null
      }
    </Provider >
  );
};
Template.args = {
  title: "Header",
  onPressLeft: () => console.log('props back'),
  rightOptionPropos: {},
  option: {
    isShow: false,
    icon: null,
    isIcone: false,
    text: '',
    textStyle: null,
    size: 20
  },
  searchbarProps: {},
  style: {},
  titlePrpos: {},
  subTitleProps: {},
  titleRef: {},
  title: '',
  subTitle: '',
};

export default Template;

// @component-docs ignore-next-line


