import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import MyTable from "./Table";
import Provider, { useStore } from "./Provider";
import { getOrders } from "./orders.js";

function Main() {
  const [state, dispatch] = useStore();

  useEffect(() => {
    getOrders().then(orders => {
      dispatch({ type: "orders.update", data: orders });
    });
  }, []);

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
