import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import validateLoginTime from "@/hooks/auth/ValidateLoginTIme";

export default function IndexScreen() {
  const router = useRouter();
  useEffect(() => {
    validateLoginTime()
      .then((result) => {
        if (result) {
          router.replace(`/(tabs)/`);
        } else {
          router.replace(`/(auth)/`);
        }
      })
      .catch(() => {
        router.replace(`/(auth)/`);
      });
  });

  return (
    <View>
      <Text>Index</Text>
    </View>
  );
}
