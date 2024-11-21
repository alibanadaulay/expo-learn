import { useAsyncStorage } from "../AsynStorage";
import { STORAGE_KEYS } from "@/constants/constants";

const validateLoginTime = async () => {
  const loginAt = await useAsyncStorage().getItem(STORAGE_KEYS.USER_LOGIN_AT);
  const expired = process.env.EXPO_PUBLIC_TIMEOUT_AUTH * 60 * 1000;

  if (loginAt) {
    const currentTimeMillis = Date.now();
    const diff = currentTimeMillis - parseInt(loginAt.toString());
    console.log("diff", diff);
    return diff < expired;
  }
  return false;
};

export default validateLoginTime;
