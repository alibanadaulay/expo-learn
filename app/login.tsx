import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GestureHandlerRootView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { router } from "expo-router";
import { STORAGE_KEYS } from "./async_key";
export default function Login() {
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleUserChange = (text: string) => {
    setUserValue(text);
  };

  const handlePassChange = (text: string) => {
    setPassValue(text);
  };

  const createAccount = () => {
    router.replace("/create_account");
  };

  const saveCurrentTimeStamp = async () => {
    try {
      const currentTimestamp = Date.now().toString();
      await AsyncStorage.setItem(
        STORAGE_KEYS.SAVED_TIMESTAMP,
        currentTimestamp
      );
      console.log("Timestamp saved successfully.");
    } catch (error) {
      console.error("Error saving timestamp:", error);
    }
  };

  const handleButtonPress = async () => {
    const trimmedUserValue = userValue.trim();
    const trimmedPassValue = passValue.trim();
    if (trimmedUserValue === "" || trimmedPassValue === "") {
      alert("User and Password cannot be empty");
      return;
    }
    if (userValue.trim() === "admin" && passValue.trim() === "admin") {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await saveCurrentTimeStamp();
      handlePassChange("");
      handleUserChange("");
      router.replace("/home");
      return;
    }
    alert("User or Password is incorrect");
  };
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <Text style={styles.helloLogin}>Login</Text>
        <View style={{ width: "100%", justifyContent: "center", margin: 32 }}>
          <TextInput
            placeholder="Username"
            onChangeText={handleUserChange}
            style={{
              padding: 16,
              backgroundColor: "#fff",
              borderRadius: 8,
              fontSize: 18,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              backgroundColor: "#fff",
              marginTop: 32,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                width: "90%",
                padding: 16,
                fontSize: 18,
                borderRadius: 8,
              }}
              placeholder="Password"
              value={passValue}
              maxLength={32}
              secureTextEntry={!showPassword}
              onChangeText={handlePassChange}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 8,
              marginBottom: 8,
              alignItems: "center",
            }}
            onPress={handleButtonPress}
          >
            <Text style={{ fontSize: 18, textTransform: "uppercase" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={createAccount}>
          <Text style={{ fontSize: 16, color: "#fff" }}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  helloLogin: {
    textAlign: "center",
    fontSize: 36,
    color: "#fff",
    fontFamily: "serif",
    fontWeight: "bold",
  },
});
