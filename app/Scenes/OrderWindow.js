import {View, Text, ScrollView, DatePickerIOS, TouchableOpacity, Dimensions, StyleSheet, Picker, Alert} from "react-native";
import React, {useState} from "react";
import MainLink from "../MainLinks";

const wid = Dimensions.get('window').width;

export default function OrderWindow({navigation, route}) {
    const {id} = route.params;
    const [date, setDate] = useState(new Date());
    const [peopleAmount, setPeopleAmount] = useState(0);

    return (
        <View>
            <View style={{alignItems: "center"}}>
            <Text style={{fontSize: 22}}>Choice Date</Text>
            </View>
            <DatePickerIOS
                date={date}
                onDateChange={(newDate) => {
                    setDate(newDate)
                }}
            />
            <View style={{alignItems: "center"}}>
            <Text style={{fontSize: 22}}>Choice Amount Of People</Text>
            </View>
            <Picker
                selectedValue={peopleAmount}
                onValueChange={(itemValue, itemIndex) => setPeopleAmount(itemValue)}
            >
                <Picker.Item label="1" value="1"/>
                <Picker.Item label="2" value="2"/>
                <Picker.Item label="3" value="3"/>
                <Picker.Item label="4" value="4"/>
                <Picker.Item label="5" value="5"/>
                <Picker.Item label="6" value="6"/>
            </Picker>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity
                    style={styles.buttonLogIn}
                    onPress={() => {
                        sendOrder({id, date, peopleAmount, navigation})
                    }}
                >
                    <Text style={{
                        textAlign: "center",
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: 16
                    }}
                    >Create Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function sendOrder({id, date, peopleAmount, navigation}) {
    fetch(MainLink() + "create_order", {
        headers: {
            id: id,
            date: date,
            peopleAmount: peopleAmount
        }})
        .then((res) => {
            console.log(res.status)
            if(res.status === 200) {createAlert({navigation})}
        })
};

function createAlert({navigation}) {
    Alert.alert(
        "Successful",
        "Your order is done!",
        [
            {text: "OK", onPress: () => {navigation.navigate("Window")}}
        ],
    );
};

const styles = StyleSheet.create({
    buttonLogIn: {
        width: wid - 55,
        height: 45,
        backgroundColor: "rgba(180,180,180, 0.7)",
        borderRadius: 25,
        justifyContent: "center"
    },
});
