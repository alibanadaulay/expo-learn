import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconHidePass from "./icon/hide_pass";
import IconShowPass from "./icon/show_pass";
import LoginThirdParty from "./components/login_third_party";

export default function CrateAccount() {
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

  const handleButtonPress = async () => {
    const trimmedUserValue = userValue.trim();
    const trimmedPassValue = passValue.trim();
    if (trimmedUserValue === "" || trimmedPassValue === "") {
      alert("User and Password cannot be empty");
    }
    if (userValue.trim() === "admin" && passValue.trim() === "admin") {
      await AsyncStorage.setItem("isLoggedIn", "true");
      router.replace("/login");
      return;
    }
    alert("User or Password is incorrect");
  };

  const handleLoginThirdParty = (provide: String) => {
    alert("Login By " + provide);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create an account</Text>
        </View>
        <View style={styles.rowContainer}></View>
        <View style={{ flex: 1 }} />
        <View style={{ width: "100%", margin: 32 }}>
          <TextInput
            style={{
              padding: 16,
              backgroundColor: "#fff",
              borderRadius: 8,
              fontSize: 18,
            }}
            placeholder="Email address"
            value={userValue}
            inputMode="email"
            maxLength={32}
            onChangeText={handleUserChange}
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
            <TouchableOpacity onPress={togglePasswordVisibility}>
              {showPassword ? <IconShowPass /> : <IconHidePass />}
            </TouchableOpacity>
          </View>
        </View>

        <LoginThirdParty
          onLoginClick={(provider) => {
            handleLoginThirdParty(provider);
          }}
        />
        <View style={{ flex: 1 }} />

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
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Already have an account? </Text>
        <Link style={styles.textLink} href={"/login"}>
          <Text>Login</Text>
        </Link>
      </View>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#25292e",
    alignItems: "center",
    fontSize: 20,
    padding: 16,
  },

  imageContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 36,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  textLink: {
    fontStyle: "italic",
    color: "#fff",
    fontSize: 18,
  },
  rowContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  touchableIcon: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
