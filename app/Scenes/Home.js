import {View} from "react-native";
import React from "react";
import ListOfAll from "./ListOfAll";
import Bar from "../BarStyle";

export default function HomeScreen() {
    return (
        <View>
            <Bar/>
            <ListOfAll/>
        </View>
    );
}
