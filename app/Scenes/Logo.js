import React from "react";
import {View, StyleSheet, Text} from "react-native";

export default function Logo() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Logo</Text>
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
       height: 80,
       backgroundColor: "tomato",
   },
   text: {
       paddingTop: 20,
       textAlign: "center",
       fontSize: 30,
       fontStyle: "italic"
   }
});
