import React, {useState} from "react";
import {View, TextInput, Dimensions, StyleSheet, TouchableOpacity, Text, Alert, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import MainLink from "../MainLinks";
import sign from "../WorkWithStorage/accWrite";
import DismissKeyboard from "../SpecialComponents/DismissKeyboard";
import Warning from "../SpecialComponents/Warning,js";

const wid = Dimensions.get('window').width;

export default function SignUp({navigation}) {

    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loginValidation, setLoginValidation] = useState(false);
    const [passValidation, setPassValidation] = useState(false);
    const [nameValidation, setNameValidation] = useState(false);
    const [phoneValidation, setPhoneValidation] = useState(false);
    const [pressed, setPressed] = useState(false);


    return (
        <DismissKeyboard>
            <View style={styles.container}>
                {!loginValidation && pressed ?
                    <Warning text={"Email Field should not be empty and must be a valid Email!"}/> : <View></View>}
                <View>
                    <Ionicons name={"ios-mail"} size={28} color={"tomato"}
                              style={styles.iconInput}/>
                    <View style={styles.input}>
                        <TextInput
                            style={{width: wid - 55, height: 45}}
                            placeholder={"User Email"}
                            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                            onChangeText={text => setLogin(text)}
                        />
                    </View>
                </View>
                {!passValidation && pressed ?
                    <Warning text={"Password Field should not be empty and must be at least 8 symbols long!"}/> :
                    <View></View>}
                <View style={{marginTop: 8}}>
                    <Ionicons name={"ios-lock"} size={28} color={"tomato"}
                              style={styles.iconInput}/>
                    <View style={styles.input}>
                        <TextInput
                            style={{width: wid - 55, height: 45}}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                            onChangeText={text => setPass(text)}
                        />
                    </View>
                </View>
                {!passValidation && pressed ?
                    <Warning text={"Name Field should not be empty and must not contain numbers!"}/> : <View></View>}
                <View style={{marginTop: 8}}>
                    <Ionicons name={"ios-person"} size={28} color={"tomato"}
                              style={styles.iconInput}/>
                    <View style={styles.input}>
                        <TextInput
                            style={{width: wid - 55, height: 45}}
                            placeholder={"User Name"}
                            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                </View>
                {!passValidation && pressed ? <Warning text={"Password Field should not be empty, " +
                "must be at least 10 symbols long and must contain only numbers!"}/> : <View></View>}
                <View style={{marginTop: 8}}>
                    <Ionicons name={"ios-person"} size={28} color={"tomato"}
                              style={styles.iconInput}/>
                    <View style={styles.input}>
                        <TextInput
                            style={{width: wid - 55, height: 45}}
                            keyboardType={"numeric"}
                            placeholder={"User Phone Number"}
                            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                            onChangeText={text => setPhone(text)}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.buttonLogIn}
                    onPress={() => {
                        setPressed(true);
                        setPassValidation(pass.length >= 8);
                        setLoginValidation(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login));
                        setPhoneValidation(/^\d{10,}$/.test(phone));
                        setNameValidation(/^\D+$/.test(name));
                        if (passValidation && loginValidation && nameValidation && phoneValidation) {
                            fetch(MainLink() + "signUp", {
                                method: 'GET',
                                headers: {
                                    login: login,
                                    pass: pass,
                                    name: name,
                                    phone: phone
                                }
                            })
                                .then((resp) => resp.text())
                                .then(respText => {
                                    if (respText === "Y") {
                                        sign("User", login);
                                        navigation.navigate("MainScreen");
                                    } else {
                                        Alert.alert(
                                            "ERROR",
                                            "This email or phone number is already used!",
                                            [
                                                {
                                                    text: "Ok",
                                                    style: "cancel"
                                                },
                                            ],
                                        );
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    }}
                >
                    <Text style={{
                        textAlign: "center",
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: 16
                    }}
                    >Sign UP</Text>
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
        paddingTop: 80
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
