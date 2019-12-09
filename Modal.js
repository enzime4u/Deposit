import React, { useState, Fragment } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button
} from "react-native";
import { useStore } from "./Provider";

export default function ShowModal(props) {
  const [state, dispatch] = useStore();
  const products = state.selected || [];

  return (
    <Modal visible={state.modalShow}>
      <View style={styles.container}>
        {products.map(product => (
          <View key={product.id} style={styles.itemsContainer}>
            <Text style={styles.product}>{product.name}</Text>
            <Text style={styles.quantity}>{product.quantity}</Text>
          </View>
        ))}
        {console.log(state.selected)}
        <Button
          title="Go Back"
          onPress={() => dispatch({ type: "order.deselect", data: null })}
          style={styles.goBack}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "35%",
    marginTop: "20%",
    alignSelf: "center",
    backgroundColor: "#f4f4f4",
    padding: 25
  },
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  goBack: {
    width: "50%",
    padding: 30
  }
});
