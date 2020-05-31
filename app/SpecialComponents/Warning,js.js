import {Text, View} from "react-native";
import React from "react";


export default function Warning({text}){
    return(
        <View style={{paddingLeft: 40, paddingRight: 40, marginTop: 8}}>
            <Text style={{fontSize: 16, color: 'red'}}>{text}</Text>
        </View>
    );
}
