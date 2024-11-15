import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { STORAGE_KEYS } from "./async_key";

export default function Index() {
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGINED_IN);
      const savedTimestamp = await AsyncStorage.getItem(
        STORAGE_KEYS.SAVED_TIMESTAMP
      );
      if (!isLoggedIn || savedTimestamp === null) {
        router.push("/login");
        return;
      } else {
        router.push("/home");
        return;
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Link href="/login" style={styles.button}>
          <Text>Go to Logins screen</Text>
        </Link>
      </View>
      <View>
        <Link href="/create_account" style={styles.button}>
          <Text>Go to Create Account screen</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  title: {
    color: "#000",
  },
  text: {
    color: "#fff",
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
