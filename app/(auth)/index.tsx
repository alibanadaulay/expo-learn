import { Colors } from "@/constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import LoginThirdParty from "@/components/ui/LoginThirdParty";
import { router } from "expo-router";
import { useAsyncStorage } from "@/hooks/AsynStorage";
import { API_URL, STORAGE_KEYS } from "@/constants/constants";

export default function SingInScreen() {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const isButtonDisabled = !email.trim() || !password.trim();

  const handelEmailChange = (text: string) => {
    const email = text.trim();
    setEmail(email);
    setIsEmailEmpty(email.length === 0);
  };

  const handelPasswordChange = (text: string) => {
    const password = text.trim();
    setPassword(password);
    setIsPasswordEmpty(password.length === 0);
  };

  const handleLogin = async () => {
    if (email === "admin" && password === "admin") {
      const currentTimeMillis = Date.now();
      await useAsyncStorage()
        .setItem(STORAGE_KEYS.USER_LOGIN_AT, currentTimeMillis.toString())
        .then(() => {
          router.replace(`/(tabs)/`);
        })
        .catch(() => {
          alert("Something went wrong");
        });
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login ");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login");
  };

  return (
    <GestureHandlerRootView>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text
          style={[
            styles.titleText,
            { color: theme.text, fontSize: 32, marginTop: "15%" },
          ]}
        >
          Login in to MyApp
        </Text>
        <View />
        <View style={[styles.inputContainer, { marginTop: "10%" }]}>
          <Text style={[styles.titleText, { color: theme.text }]}>Email</Text>
          <TextInput
            style={[
              styles.textInput,
              {
                width: "100%",
                backgroundColor: theme.background,
                color: theme.text,
                borderWidth: 1,
              },
            ]}
            maxLength={32}
            placeholderTextColor={theme.text}
            value={email}
            returnKeyType="next"
            onChangeText={handelEmailChange}
            placeholder="Jhondhea@gmail.com"
            inputMode="email"
          />
          {isEmailEmpty ? (
            <Text style={styles.errorText}>{"Email cannot empty"}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.titleText, { color: theme.text }]}>
            Password
          </Text>
          <View
            style={[
              styles.inputPasswordContainer,
              { backgroundColor: theme.background },
            ]}
          >
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.background,
                  width: "90%",
                  color: theme.text,
                },
              ]}
              maxLength={32}
              value={password}
              onChangeText={handelPasswordChange}
              placeholder="Password"
              inputMode="text"
              returnKeyType="done"
              placeholderTextColor={theme.text}
              secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity
              style={styles.touchIcon}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            >
              <Ionicons
                name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
          {isPasswordEmpty ? (
            <Text style={styles.errorText}>{"Password cannot empty"}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.touchForgotPassword}>
          <Text style={[styles.titleText, { color: theme.textSecondary }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles.touchLogin,
            { backgroundColor: theme.buttonBackground },
            isButtonDisabled && { opacity: 0.5 },
          ]}
          disabled={isButtonDisabled}
        >
          <Text style={{ fontSize: 16 }}>Login</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: "10%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.line} />
          <Text style={{ color: theme.text }}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={{ marginTop: "10%" }}>
          <LoginThirdParty
            icon="logo-google"
            title="Google"
            onClick={handleGoogleLogin}
          />
          <LoginThirdParty
            icon="logo-facebook"
            title="Facebook"
            onClick={handleFacebookLogin}
          />
        </View>

        <Text style={[styles.titleText, { color: theme.textSecondary }]}></Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    height: "100%",
    flexDirection: "column",
  },
  textInput: {
    padding: 16,
    borderWidth: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#949494",
    fontSize: 16,
    outlineWidth: 0,
  },
  titleText: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginTop: 32,

    flexDirection: "column",
  },
  touchIcon: {
    width: "10%",
    borderRadius: 16,
    justifyContent: "center",
  },
  inputPasswordContainer: {
    width: "100%",
    marginTop: 8,
    borderColor: "#949494",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyItems: "center",
  },
  touchForgotPassword: {
    marginTop: 32,
    fontSize: 16,
  },
  touchLogin: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 32,
    flexDirection: "row",
    borderRadius: 8,
    justifyContent: "center",
  },
  line: {
    width: "45%",
    height: 1,
    backgroundColor: "#949494",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    gap: 8,
    marginStart: 8,
    marginTop: 5,
  },
});
