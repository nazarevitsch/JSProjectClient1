import React from "react";
import Window from "./Window";
import OrderWindow from "./OrderWindow";
import RoutsForListFiltersSort from "./RoutsForListFiltersSort";
import Bar from "../BarStyle";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function HomeScreen() {
    return (
            <Stack.Navigator
                initialRouteName="Routs"
            >
                <Stack.Screen name="OrderWindow" component={OrderWindow}/>
                <Stack.Screen name="Routs" component={RoutsForListFiltersSort} options={{headerShown: false}}/>
                <Stack.Screen name="Window" component={Window}/>
            </Stack.Navigator>

    );
}
