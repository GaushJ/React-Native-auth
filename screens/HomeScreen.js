import React from "react";
import { StyleSheet, Button, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation: { navigate } }) => {
  const navigation = useNavigation();

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login")
  //     })
  //     .catch(error => alert(error.message))
  // }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          width: "60%",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
