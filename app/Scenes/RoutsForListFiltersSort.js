import React from "react";
import Filters from "./Filters";
import ListOfAll from "./ListOfAll";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Constants from "expo-constants";

const Tab = createMaterialTopTabNavigator();

export default function RoutsForListFiltersSort() {
    return (
        <Tab.Navigator
            initialRouteName={"ListOfAll"}
            style={{paddingTop: Constants.statusBarHeight}}
        >
            <Tab.Screen name="ListOfAll" component={ListOfAll} initialParams={{selectedFilters: []}}/>
            <Tab.Screen name="Filters" component={Filters}/>
        </Tab.Navigator>
    );
}
