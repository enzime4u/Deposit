import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";

import MyTable from "./Table";
import Provider, { useStore } from "./Provider";
import { getOrders } from "./orders.js";
import AddProduct from "./AddProduct";
import Login from "./Login";
import Register from "./Register";

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
    <SafeAreaView style={{ flex: 1 }}>
      <MyTable
        tableHead={ordersHeadersArray}
        tableData={ordersDataArray}
        widthArr={widthArr}
      />
      <Button
        title="add new product"
        onPress={() => dispatch({ type: "product.add.show", data: null })}
      />
      <AddProduct />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider>
      <Register />
    </Provider>
  );
}
