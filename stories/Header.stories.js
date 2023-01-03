import React, { useState } from "react";
import { Provider, Searchbar, Text } from "../src";
import Header from "../src/components/AllHeader/Header";

import { View, ViewStyle, StyleProp, ViewProps } from "react-native";
import { colors, fontSizes } from "../src/styles/tokens";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Header",
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};
const Template = ({

  title = "Header",
  // rightOption = true,
  // onPressLeft = () => console.log('props back'),
  // // onPressPrimaryOption: () => console.log('props back'),
  // // onPressPrimaryOption: () => console.log('props back'),
  // // rightOptionPropos: {},
  // SearchbarProps: {},
  // style: {},
  // titlePrpos: {},
  // subTitleProps: {},
  // titleRef: {},
  // title: '',
  // subTitle: '',
  ...args
}) => {
  const [search, setSearch] = React.useState("");
  return (
    <Provider>
      <Header
        searchBarShow={true}
        title={'args?.title'}
        // titleStyle={ }
        subTitle="sadfasd"
        onPress={() => console.log('asdsa')}
        // icon = {'back'}
        // leftIcon={{ uri: 'https://images.pexels.com/photos/4946956/pexels-photo-4946956.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' }}
        // leftIcon={require('./pexels-photo-4946956.jpeg')}
        searchbarProps={{
          value: search,
          onChangeText: setSearch,
          icon: 'close',

          style: { backgroundColor: '#f1f1f1', width: '80%', alignSelf: 'center', marginTop: 10 }
        }}
        option={{
          icon: "cross",
          size: 20,
          // style: { fontSizes: 10, margin: 0, },
          iconColor: 'green',
          // onPress: () => console.log('optionOne')
        }}
        optionTwo={{
          icon: "cross",
          size: 20,
          // iconColor: 'green',
          // style: { fontSizes: 10, margin: 0, },
          // onPress: () => console.log('optionOne')
        }}
        centerProps={{
          style: { backgroundColor: 'red', width: 20 },
        }}
      />
    </Provider>
  );
};
export const Basic = Template.bind({});
Basic.args = {
  title: "Header",
  // rightOption: true,
  // onPressLeft: () => console.log('props back'),
  // onPressPrimaryOption: () => console.log('props back'),
  // onPressPrimaryOption: () => console.log('props back'),
  // rightOptionPropos: {},
  // SearchbarProps: {},
  // style: {},
  // titlePrpos: {},
  // subTitleProps: {},
  // titleRef: {},
  // title: '',
  // subTitle: '',
};
