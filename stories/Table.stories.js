import React from "react";

import { action } from "@storybook/addon-actions";
import { Provider } from "../src";
import Table from "../src/components/Table/Table";
import { Platform, View } from "react-native";
import { colors } from "../src/styles/tokens";
import DataTable from "../src/components/Table/DataTable";
import Header from "../src/components/Header/Header";
import HeaderBackAction from "../src/components/Header/HeaderBackAction";
import HeaderContent from "../src/components/Header/HeaderContent";
import Menu from "../src/components/Menu/Menu";
import HeaderAction from "../src/components/Header/HeaderAction";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "components/Table",
  component: Table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

const TableComponent = () => {
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: colors.gray200,
      }}
    >
      <Table>
        {[...Array(10).keys()].map(() => (
          <Table.Row>
            <Table.Cell
              img={{
                source: {
                  uri: "https://reactnative.dev/img/tiny_logo.png",
                },
              }}
            />
            <Table.Cell
              text="Pull-on Embellished Hem Ankle Jeggings"
              caption="SKU: 196532280963"
            />
            <Table.Cell
              chip={{ children: "VAS", mode: "outlined", color: colors.black }}
            />
            <Table.Cell
              iconButton={{
                icon: "chevron-right",
                onPress: () => {
                  console.log("iconButton pressed");
                },
              }}
            />
          </Table.Row>
        ))}
      </Table>
    </View>
  );
};

const DataTableComponent = () => {
  const [data, setData] = React.useState({
    count: 1154,
    next: "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20",
    previous: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    results: [
      {
        name: "spearow",
        url: "https://pokeapi.co/api/v2/pokemon/21/",
      },
      {
        name: "fearow",
        url: "https://pokeapi.co/api/v2/pokemon/22/",
      },
      {
        name: "ekans",
        url: "https://pokeapi.co/api/v2/pokemon/23/",
      },
      {
        name: "arbok",
        url: "https://pokeapi.co/api/v2/pokemon/24/",
      },
      {
        name: "pikachu",
        url: "https://pokeapi.co/api/v2/pokemon/25/",
      },
      {
        name: "raichu",
        url: "https://pokeapi.co/api/v2/pokemon/26/",
      },
      {
        name: "sandshrew",
        url: "https://pokeapi.co/api/v2/pokemon/27/",
      },
      {
        name: "sandslash",
        url: "https://pokeapi.co/api/v2/pokemon/28/",
      },
      {
        name: "nidoran-f",
        url: "https://pokeapi.co/api/v2/pokemon/29/",
      },
    ],
  });

  const [visible, setVisible] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectable, setSelectable] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const renderItem = ({ item }) => {
    return (
      <Table.Row>
        <Table.Cell
          img={{
            source: {
              uri: "https://reactnative.dev/img/tiny_logo.png",
            },
          }}
        />
        <Table.Cell text={item.name} caption="SKU: 196532280963" />
        <Table.Cell
          chip={{ children: "VAS", mode: "outlined", color: colors.black }}
        />
        <Table.Cell
          iconButton={{
            icon: "chevron-right",
            onPress: () => {
              console.log("iconButton pressed");
            },
          }}
        />
      </Table.Row>
    );
  };
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: colors.gray100,
      }}
    >
      <Header align="center">
        <HeaderBackAction />
        <HeaderContent title="Pokemon" subtitle="Demo" />
        <View style={{ flex: 0, flexBasis: "auto" }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<HeaderAction onPress={openMenu} icon="dots-vertical" />}
          >
            {selectable ? (
              <>
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    setSelectable(false);
                  }}
                  title="Action 1"
                />
              </>
            ) : (
              <>
                <Menu.Item
                  onPress={() => {
                    closeMenu();
                    setSelectable(true);
                  }}
                  title="Edit Table"
                />
                <Menu.Item onPress={() => {}} title="Filter" />
              </>
            )}
          </Menu>
        </View>
      </Header>
      <DataTable
        refreshing={refreshing}
        onRefresh={() => console.log("refresh")}
        selectable={selectable}
        data={data.results}
        renderItem={renderItem}
        onEndReached={(e) => {
          console.log(e);
          setRefreshing(true);
          setData({
            ...data,
            results: [
              ...data.results,
              {
                name: "nidorina",
                url: "https://pokeapi.co/api/v2/pokemon/30/",
              },
              {
                name: "nidoqueen",
                url: "https://pokeapi.co/api/v2/pokemon/31/",
              },
              {
                name: "nidoran-m",
                url: "https://pokeapi.co/api/v2/pokemon/32/",
              },
              {
                name: "nidorino",
                url: "https://pokeapi.co/api/v2/pokemon/33/",
              },
              {
                name: "nidoking",
                url: "https://pokeapi.co/api/v2/pokemon/34/",
              },
              {
                name: "clefairy",
                url: "https://pokeapi.co/api/v2/pokemon/35/",
              },
              {
                name: "clefable",
                url: "https://pokeapi.co/api/v2/pokemon/36/",
              },
              {
                name: "vulpix",
                url: "https://pokeapi.co/api/v2/pokemon/37/",
              },
              {
                name: "ninetales",
                url: "https://pokeapi.co/api/v2/pokemon/38/",
              },
              {
                name: "jigglypuff",
                url: "https://pokeapi.co/api/v2/pokemon/39/",
              },
              {
                name: "wigglytuff",
                url: "https://pokeapi.co/api/v2/pokemon/40/",
              },
            ],
          });

          setTimeout(function () {
            setRefreshing(false);
          }, 2000);
          console.log("load more");
        }}
        onEndReachedThreshold={0.1}
        searchbarOptions={{
          value: search,
          onChangeText: (text) => {
            console.log(text);
            setSearch(text);
          },
          onEndEditing: () => console.log("submit search"),
        }}
        onSelect={(selected) => console.log(selected.length, " selected items")}
      />
    </View>
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <Provider>
    <TableComponent />
  </Provider>
);

const DataTemplate = (args) => (
  <Provider>
    <DataTableComponent />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {};

export const DataTableTemplate = DataTemplate.bind({});
DataTableTemplate.args = {};
