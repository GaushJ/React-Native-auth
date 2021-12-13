import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import axios from "axios";

function LoginScreen({ navigation: { navigate } }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = (credentials) => {
    const url = "http://localhost:5000/user/signin";

    axios
      .post(url, credentials)
      .then((res) => {
        const result = res.data;
        const { message, status, data } = result;
        if (status !== "SUCCESS") {
          console.log("FAILED");
        } else {
          navigation.navigate("Home", { ...data[0] });
        }
      })
      .catch((err) => {
        console.log(err.JSON());
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate("Home")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
