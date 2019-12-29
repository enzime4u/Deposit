import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Image } from "react-native";
import { Input, Button } from "react-native-elements";

export default function ForgotPassword({ userEmail }) {
  const [email, setEmail] = useState("");

  return (
    <View>
      <Input placeholder="please enter your email" />
    </View>
  );
}
