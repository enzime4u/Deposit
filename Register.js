import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  function registerUser(user) {
    fetch("http://mvctest.staging.psw.ro/application/save-user", {
      method: "POST",
      body: JSON.stringify(user)
    })
      .then(reply => {
        setRegisterForm({
          name: "",
          email: "",
          password: ""
        });
      })
      .catch(error => {
        console.log("error:", error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Register your account</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="enter your name"
          placeholderTextColor="#003f5c"
          value={registerForm.name}
          onChangeText={value =>
            setRegisterForm({ ...registerForm, name: value })
          }
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="enter your email adress"
          placeholderTextColor="#003f5c"
          value={registerForm.email}
          onChangeText={value =>
            setRegisterForm({ ...registerForm, email: value })
          }
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="enter desired password"
          placeholderTextColor="#003f5c"
          value={registerForm.password}
          onChangeText={value =>
            setRegisterForm({ ...registerForm, password: value })
          }
        />
      </View>
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => registerUser(registerForm)}
      >
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "40%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white",
    fontSize: 26,
    textAlign: "center"
  },
  signupBtn: {
    width: "40%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10
  },
  signupText: {
    color: "white",
    fontSize: 30
  }
});
