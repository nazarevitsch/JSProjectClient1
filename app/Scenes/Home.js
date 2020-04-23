import {View} from "react-native";
import React from "react";
import Logo from "./Logo";
import ListOfAll from "./ListOfAll";

export default function HomeScreen() {
    return (
        <View>
            <Logo/>
            <ListOfAll/>
        </View>
    );
}
