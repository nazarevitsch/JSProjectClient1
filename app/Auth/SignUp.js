import React, {useState} from "react";
import {View, TextInput, Dimensions, StyleSheet, TouchableOpacity, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";


const wid = Dimensions.get('window').width;

export default function SignUp({navigation}) {

    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    const onPress = () => {
        fetch('http://192.168.0.105:8080/login', {
            method: 'GET',
            headers: {
                Login: login,
                Pass: pass,
            }})
            .then((resp) => resp.text())
            .then(respText => {
                if (respText === "Y") {
                }})
            .catch((err) => {
                console.log(err);
            });
    };

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
                onPress={() => {navigation.goBack()}}
            >
                <Text style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: 16
                }}
                >Sign UP</Text>
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
