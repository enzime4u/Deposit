import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { Table, Row } from "react-native-table-component";
import Modal from "./Modal";
import { useStore, dispatch } from "./Provider";
import { getOrderProducts } from "./orders";

export default function MyTable({ tableHead, tableData, widthArr }) {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <Modal product={selected} onClose={() => setSelected(null)} />;
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {tableData.map((order, index) => (
                <Row
                  onPress={() => {
                    dispatch({ type: "order.select", data: order });

                    getOrderProducts(order.id).then(products => {
                      dispatch({
                        type: "order.select.products",
                        data: products
                      });
                      console.log(products);
                    });
                    console.log(products);
                  }}
                  key={index}
                  data={order}
                  widthArr={widthArr}
                  style={styles.row}
                  textStyle={styles.textRow}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 30,
    backgroundColor: "#fff"
  },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "normal", color: "#fff" },
  dataWrapper: { marginTop: -1 },
  row: {
    height: 50,
    backgroundColor: "#E7E6E1"
  },
  textRow: { color: "#000", textAlign: "center" }
});
