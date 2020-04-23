import {Dimensions, StyleSheet, Text, View} from "react-native";
import React from "react";

const wid = Dimensions.get('window').width;

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
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
    }
});
