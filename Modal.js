import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";

export default function Modal({ product }) {
  return (
    <Modal>
      <View>
        <Text>{product.name}</Text>
      </View>
    </Modal>
  );
}
