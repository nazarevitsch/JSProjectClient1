import React, {useState} from "react";
import {View, TextInput, Dimensions, StyleSheet, TouchableOpacity, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import sign from "../WorkWithStorage/accWrite";
import Bar from "../BarStyle";
import MainLink from "../MainLinks.js";
import {Base64} from 'js-base64'

const wid = Dimensions.get('window').width;

export default function SignIn({navigation}) {

    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    return (
        <View style={styles.container}>
            <Bar/>
            <Text style={styles.logo}>Logo Eat</Text>
            <View style={{marginTop: 30}}>
                <Ionicons name={"ios-person"} size={28} color={"tomato"}
                          style={styles.iconInput}/>
                <TextInput
                    style={styles.input}
                    placeholder={"User Name"}
                    placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    onChangeText={text => setLogin(text)}
                />
            </View>
            <View style={{marginTop: 8}}>
                <Ionicons name={"ios-lock"} size={28} color={"tomato"}
                          style={styles.iconInput}/>
                <TextInput
                    style={styles.input}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                    onChangeText={text => setPass(text)}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonLogIn}
                onPress={() => {
                    fetch(MainLink() + "signIn", {
                        method: 'GET',
                        headers: {
                            Login: login,
                            Pass: pass,
                        }
                    })
                        .then((resp) => resp.text())
                        .then(respText => {
                            if (respText === "Y") {
                                sign("User", "Yes");
                                navigation.navigate("MainScreen")
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }}
            >
                <Text style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: 16
                }}
                >Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonLogIn}
                onPress={() => {
                    navigation.navigate("ForgotPass")
                }}
            >
                <Text style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: 16
                }}
                >Forgot Pass</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonLogIn}
                onPress={() => {
                    navigation.navigate("SignUP")
                }}
            >
                <Text style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: 16
                }}
                >New Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        // justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
    },
    input:{
        width: wid - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "rgba(180,180,180, 0.7)",
        color: "rgb(0,0,0)",
        paddingLeft: 45,
        marginHorizontal: 25,
    },
    iconInput: {
        position: "absolute",
        top: 8,
        left: 37
    },
    buttonLogIn: {
        width: wid - 55,
        height: 45,
        backgroundColor: "rgba(180,180,180, 0.7)",
        borderRadius: 25,
        marginTop: 8,
        justifyContent: "center"
    },
    logo: {
        textAlign: "center",
        fontSize: 55,
        fontStyle: "italic",
    }
});
