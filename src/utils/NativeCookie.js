//src/utils/NativeCookie.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const setCookie = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        Alert.alert('setCookie error:', e)
    }
};

export const getCookie = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (e) {
        Alert.alert('getCookie error:', e)
    }
};

export const deleteCookie = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('deleteCookie error', e)
    }
}