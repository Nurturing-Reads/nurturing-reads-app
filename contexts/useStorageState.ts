import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load the initial value from AsyncStorage
    const loadState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setState(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error(`Error loading key "${key}" from AsyncStorage:`, error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadState();
  }, [key]);

  const setStorageState = async (newValue: T) => {
    try {
      setState(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error saving key "${key}" to AsyncStorage:`, error);
    }
  };

  return [state, setStorageState, isLoaded] as const;
}