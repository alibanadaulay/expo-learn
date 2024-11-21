import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  title: string;
  icon: string;
  onClick: () => void;
}

const LoginThirdParty = ({ icon, title, onClick }: Props) => {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touch} onPress={onClick}>
        <Ionicons name={icon} color={theme.icon} size={24} />
        <View style={{ flex: 1 }} />
        <Text style={[styles.text, { color: theme.text }]}>
          {"Continue with " + title}
        </Text>
        <View style={{ flex: 1 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderColor: "#949494",
    borderRadius: 8,
    borderWidth: 1,
  },
  touch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default LoginThirdParty;
