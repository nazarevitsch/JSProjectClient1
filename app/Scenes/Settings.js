import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import del from "../WorkWithStorage/accDelete";

const wid = Dimensions.get('window').width;

export default function SettingsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonLogIn}
                onPress={() => {
                    del("User");
                    navigation.navigate("SignIn")}}
            >
                <Text style={{
                    textAlign: "center",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: 16
                }}
                >Sign OUT</Text>
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
    buttonLogIn: {
        width: wid - 55,
        height: 45,
        backgroundColor: "rgba(180,180,180, 0.7)",
        borderRadius: 25,
        marginTop: 8,
        justifyContent: "center"
    }
});
