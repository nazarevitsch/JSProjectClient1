import React from "react";
import {AsyncStorage} from "react-native";

export default async function del(key) {
    await AsyncStorage.removeItem(key);
    console.log(await AsyncStorage.getAllKeys());
}
