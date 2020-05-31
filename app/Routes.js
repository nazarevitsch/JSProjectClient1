import React, {useEffect, useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";
import signedIN from "./WorkWithStorage/Account";
import MainScreen from "./Scenes/MainScreen";
import Loading from "./Scenes/Loading";
import {Button} from "react-native";

const Stack = createStackNavigator();

export default function Routes({navigation}) {

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
                    initialRouteName={data ? "MainScreen" : "SignIn"}
                >
                    <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false}} />
                    <Stack.Screen name="SignUP" component={SignUp} options={({navigation}) => ({
                        title: "Create new Account",
                        headerLeft: () => (
                            <Button onPress={() => navigation.goBack()}
                                    title="Back"
                                    color="black"
                            />),
                    })}/>
                    <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
                    <Stack.Screen name="ForgotPass" component={ForgotPassword} options={({navigation}) => ({
                        title: "Forgot Password",
                        headerLeft: () => (
                            <Button onPress={() => navigation.goBack()}
                                    title="Back"
                                    color="black"
                            />),
                    })}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}
