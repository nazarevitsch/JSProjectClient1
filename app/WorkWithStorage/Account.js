import React from "react";
import {AsyncStorage} from "react-native";

export default async function signedIN() {
    let awt = await AsyncStorage.getItem("User");
    if (awt !== null) return true;
    else return false;
}
