import React, {useEffect, useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import signedIN from "./WorkWithStorage/Account";
import MainScreen from "./Scenes/MainScreen";
import {NavigationContainer} from "@react-navigation/native";
import Loading from "./Scenes/Loading";

const Stack = createStackNavigator();

export default function Routes() {

    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        signedIN().then((answer) => {
            setData(answer);
            setIsLoading(false)
        })
    });


    return (
        isLoading ? <Loading/> :
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={data ? "MainScreen" : "Login"}
                >
                    <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="SignUP" component={SignUp}/>
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}
