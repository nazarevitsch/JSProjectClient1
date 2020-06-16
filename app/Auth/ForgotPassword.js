import React, {useState} from "react";
import {Dimensions} from "react-native";
import {View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {TextInput} from "react-native";
import {TouchableOpacity} from "react-native";
import {Text} from "react-native";
import {StyleSheet} from "react-native";
import {Alert} from "react-native";
import MainLink from "../MainLinks.js";
import DismissKeyboard from "../SpecialComponents/DismissKeyboard";
import Warning from "../SpecialComponents/Warning,js";

const wid = Dimensions.get('window').width;

export default function ForgotPasswordScene({navigation}) {

    const [email, setEmail] = useState("");
    const [code, setCode] = useState(0);
    const [ready, setReady] = useState(false);
    const [loginValidation, setLoginValidation] = useState(false);
    const [pressed, setPressed] = useState(false);

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={{paddingLeft: 40, paddingRight: 40}}>
                    <Text style={{fontSize: 16}}>Enter your Email of your Account and
                        press the button "Receive Code", in few Seconds you will receive a mail with code. You need to
                        enter this code in
                        field "Code" below and tap on button "Receive new Password".</Text>
                </View>
                {!loginValidation && pressed ?
                    <Warning text={"Email Field should not be empty and must be a valid Email!"}/> : <View></View>}
                <View style={{marginTop: 8}}>
                    <Ionicons name={"ios-mail"} size={28} color={"tomato"}
                              style={styles.iconInput}/>
                    <View style={styles.input}>
                        <TextInput
                            style={{width: wid - 55, height: 45}}
                            placeholder={"User Email"}
                            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                </View>
                <View style={{marginTop: 8}}>
                    <Ionicons name={"ios-lock"} size={28} color={"tomato"}
                              style={styles.iconInput}/>
                    <View style={styles.input}>
                        <TextInput
                            style={{width: wid - 55, height: 45}}
                            placeholder={"Security Code"}
                            keyboardType="numeric"
                            maxLength={6}
                            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                            onChangeText={text => setCode(Number(text))}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.buttonLogIn}
                    onPress={() => {
                        setLoginValidation(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
                        setPressed(true);
                        if (pressed && loginValidation) {
                        if (!ready) {

                                fetch(MainLink() + "ForgotPass1", {
                                    method: 'GET',
                                    headers: {
                                        email: email,
                                    }
                                })
                                    .then((resp) => resp.text())
                                    .then(respText => {
                                        if (respText === "Y") {
                                            setReady(true);
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }
                         else {
                            fetch(MainLink() + "ForgotPass2", {
                                method: 'GET',
                                headers: {
                                    email: email,
                                    code: code
                                }
                            })
                                .then((resp) => resp.text())
                                .then(respText => {
                                    if (Number(respText) === 200) {
                                        Alert.alert(
                                            "Confirm",
                                            "We send you new password!",
                                            [
                                                {
                                                    text: "Ok",
                                                    onPress: () => {
                                                        navigation.navigate("SignIn")
                                                    },
                                                    style: "cancel"
                                                },
                                            ],
                                        );
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }}
                    }}>
                    <Text style={{
                        textAlign: "center",
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: 16
                    }}
                    >{ready ? "Receive new Password" : "Receive Code"}</Text>
                </TouchableOpacity>
            </View>
        </DismissKeyboard>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
        alignItems: "center",
        paddingTop: 25
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
