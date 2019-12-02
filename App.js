import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import MyTable from "./Table";
import Provider, { useStore } from "./Provider";
import orders from "./orders.js";
// Add on the status Column a Button

// const datas = {
//   tableHead: ["ID Comanda", "Client", "Status"],
//   tableData: [
//     ["100", "PL 1", "trimisa", "lorem lipsum"],
//     ["100", "PL 1", "trimisa", "lorem lipsum"],
//     ["100", "PL 1", "trimisa", "lorem lipsum"],
//     ["100", "PL 1", "trimisa", "lorem lipsum"]
//   ],
//   widthArr: [140, 140, 260]
// };

function Main() {
  const [state, dispatch] = useStore();

  useEffect(() => {
    orders().then(orders => {
      dispatch({ type: "orders.update", data: orders });
    });
  }, []);

  console.log(state.orders);
  const ordersHeadersArray = ["ID Comanda", "Client", "Status"];
  const ordersDataArray = state.orders.map(({ id, client, status }) => [
    id,
    client,
    status
  ]);
  const widthArr = [400, 200, 400];
  return (
    <View style={{ flex: 1 }}>
      <MyTable
        tableHead={ordersHeadersArray}
        tableData={ordersDataArray}
        widthArr={widthArr}
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
