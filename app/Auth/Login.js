import React, {useState} from "react";
import {View, TextInput, Dimensions, StyleSheet, TouchableOpacity, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import sign from "../WorkWithStorage/accWrite";

const wid = Dimensions.get('window').width;

export default function Login({navigation}) {

    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");


    return (
        <View style={styles.container}>
            <View>
                <Ionicons name={"ios-person"} size={28} color={"tomato"}
                          style={styles.iconInput}/>
                <TextInput
                    style={styles.input}
                    placeholder={"UserName"}
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
                    fetch('http://192.168.0.105:8080/login', {
                        method: 'GET',
                        headers: {
                            Login: login,
                            Pass: pass,
                        }})
                        .then((resp) => resp.text())
                        .then(respText => {
                            if (respText === "Y") {
                                console.log("huina");
                                sign("User", "Yes");
                                navigation.navigate("MainScreen")
                            }})
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
                >Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonLogIn}
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
                onPress={() => {navigation.navigate("SignUP", {screen: "List"})}}
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
        justifyContent: "center",
        alignItems: "center"
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
    }
});
