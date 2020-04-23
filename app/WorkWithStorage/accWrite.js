import React from "react";
import {AsyncStorage} from "react-native";

export default async function sign(key, value) {
    await AsyncStorage.setItem(key, value);
}
