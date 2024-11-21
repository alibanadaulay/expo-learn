import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const useAsyncStorage = () => {
  return {
    getItem: async (key: string) => {
      try {
        return await AsyncStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },

    setItem: async (
      key: string,
      value: string
    ): Promise<boolean | undefined> => {
      try {
        if (!value) {
          throw new Error("No value provided");
        }
        await AsyncStorage.setItem(key, value).finally(() => {
          return true;
        });
      } catch (error) {
        return false;
      }
    },

    removeItem: async (key: string): Promise<boolean | undefined> => {
      try {
        await AsyncStorage.removeItem(key).finally(() => {
          return true;
        });
      } catch (error) {
        return false;
      }
    },
  };
};
