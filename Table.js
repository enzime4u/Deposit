import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";

export default function MyTable({ tableHead, tableData, widthArr }) {
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
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
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
