import React from "react";
import {AsyncStorage} from "react-native";

export default async function getEmail() {
    let awt = await AsyncStorage.getItem("User");
    return awt;
}
