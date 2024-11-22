import validateLoginTime from "@/hooks/auth/ValidateLoginTIme";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    validateLoginTime().then((result) => {
      if (!result) {
        router.replace(`/(auth)/`);
        router.dismissAll();
      }
    });
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
