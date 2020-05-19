import React from "react";
import Filters from "./Filters";
import ListOfAll from "./ListOfAll";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";

const Tab = createMaterialTopTabNavigator();

export default function RoutsForListFiltersSort() {
    return (
        <Tab.Navigator
            style={{paddingTop: Constants.statusBarHeight}}
        >
            <Tab.Screen name="ListOfAll" component={ListOfAll}/>
            <Tab.Screen name="Filters" component={Filters}/>
        </Tab.Navigator>
    );
}
