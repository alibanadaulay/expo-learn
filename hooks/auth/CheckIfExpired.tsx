import { router } from "expo-router";
import { useAsyncStorage } from "../AsynStorage";
import { STORAGE_KEYS } from "@/constants/constants";
import validateLoginTime from "./ValidateLoginTIme";

const CheckIfExpired = async () => {
  const result = await validateLoginTime();
  if (!result) {
    await useAsyncStorage().removeItem(STORAGE_KEYS.USER_LOGIN_AT);
    alert("Session expired.");
    router.push(`/(auth)/`);
    router.dismissAll();
  }
};

export default CheckIfExpired;
