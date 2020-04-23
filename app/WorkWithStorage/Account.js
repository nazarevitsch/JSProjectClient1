import React from "react";
import {AsyncStorage} from "react-native";

export default async function signedIN() {
    let awt = await AsyncStorage.getItem("User");
    console.log("awt: ", awt);
    if (awt === "Yes") return true;
    else return false;
}
