import React from "react";
import ListOfAll from "./ListOfAll";
import Window from "./Window";
import OrderWindow from "./OrderWindow";
import Bar from "../BarStyle";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function HomeScreen() {
    return (
            <Stack.Navigator
                initialRouteName="ListOfAll"
            >
                <Stack.Screen name="OrderWindow" component={OrderWindow}/>
                <Stack.Screen name="ListOfAll" component={ListOfAll} options={{headerShown: false}}/>
                <Stack.Screen name="Window" component={Window}/>
            </Stack.Navigator>
    );
}
