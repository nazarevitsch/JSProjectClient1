import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import SettingsScreen from "./Settings";
import MapScreen from "./Map";
import HomeScreen from "./Home";

const Tab = createBottomTabNavigator();

export default function MainScreen({navigation}) {
    return (
            <Tab.Navigator

                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if (route.name === 'List') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        }
                        if (route.name === 'Map') {
                            iconName = focused ? 'map' : 'map-o';
                        }

                        if (route.name === 'Settings') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        }
                        if (route.name === "Settings" || route.name === "List") {
                            return <Ionicons name={iconName} size={size} color={color}/>;
                        }
                        if (route.name === "Map") {
                            return <FontAwesome name={iconName} size={size} color={color}/>;
                        }
                    },
                })
                }
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
                initialRouteName="List"
            >
                <Tab.Screen name="List" component={HomeScreen}/>
                <Tab.Screen name="Map" component={MapScreen}/>
                <Tab.Screen name="Settings" component={SettingsScreen}/>
            </Tab.Navigator>
    );
}
