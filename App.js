import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import MyTable from "./Table";
import Provider, { useStore } from "./Provider";
import orders from "./orders.js";
// Add on the status Column a Button

const datas = {
  tableHead: ["ID Comanda", "Client", "Status"],
  tableData: [
    ["100", "PL 1", "trimisa", "lorem lipsum"],
    ["100", "PL 1", "trimisa", "lorem lipsum"],
    ["100", "PL 1", "trimisa", "lorem lipsum"],
    ["100", "PL 1", "trimisa", "lorem lipsum"]
  ],
  widthArr: [380, 140, 260]
};

function Main() {
  const [state, dispatch] = useStore();

  useEffect(() => {
    orders().then(orders => {
      dispatch({ type: "orders.update", data: orders });
    });
  }, []);
  console.log(state.orders);
  const tableHead = ["ID Comanda", "Client", "Status"];
  return (
    <View>
      <MyTable
        tableHead={tableHead}
        tableData={state.orders}
        widthArr={datas.widthArr}
      />
    </View>
  );
}

export default function App() {
  return (
    <Provider>
      <Main />
    </Provider>
  );
}
