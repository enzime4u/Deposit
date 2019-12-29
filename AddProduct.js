import React, { useState } from "react";

import { View, Text, StyleSheet, Modal, Image } from "react-native";
import { Input, Button } from "react-native-elements";

// use it to bring state where you need it
import { useStore } from "./Provider";
import { sendProduct } from "./orders.js";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

// ======================== //
// Product => OBJECT:
// {
//  id
//  name
//  picture
//  quantity
// }
// ======================== //

export default function AddProduct() {
  const [state, dispatch] = useStore();
  const [form, setForm] = useState({
    name: "",
    picture: "",
    quantity: 0
  });
  const [image, setImage] = useState(null);

  function selectImage() {
    Permissions.askAsync(Permissions.CAMERA_ROLL).then(({ status }) => {
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        const options = {
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        };

        ImagePicker.launchImageLibraryAsync(options).then(result => {
          if (result.cancelled) {
            alert("you have canceled the action");
          } else {
            const image = {
              uri: result.uri,
              width: result.width,
              height: result.height,
              type: result.type
            };

            FileSystem.readAsStringAsync(image.uri, {
              encoding: FileSystem.EncodingType.Base64
            }).then(blob => {
              setImage(image);
              setForm({ ...form, picture: blob });
            });
          }
        });
      }
    });
  }

  return (
    <Modal visible={state.showAddProduct}>
      <View style={styles.container}>
        <Input
          placeholder="enter the product name"
          errorStyle={{ color: "red" }}
          errorMessage="product name is mandatory"
          value={form.name}
          onChangeText={value => setForm({ ...form, name: value })}
        />
        <Button title="add image" onPress={selectImage} />
        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              padding: 10,
              marginTop: 15
            }}
          />
        )}
        <Input
          placeholder="enter product quantity"
          value={String(form.quantity)}
          errorMessage="please provide a quantity for the product"
          onChangeText={value => setForm({ ...form, quantity: Number(value) })}
        />
        <Button
          title="Add Product"
          onPress={() =>
            sendProduct(form)
              .then(reply => {
                dispatch({ type: "product.add.hide" });
                setForm({
                  name: "",
                  picture: "",
                  quantity: 0
                });
              })
              .catch(err => {
                alert(err.message);
                console.log("err", err);
              })
          }
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    marginTop: "30%",
    alignSelf: "center"
  }
});
