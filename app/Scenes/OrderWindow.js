import {View, Text, DatePickerIOS, TouchableOpacity, Dimensions, StyleSheet, Picker, Alert} from "react-native";
import React, {useState} from "react";
import MainLink from "../MainLinks";
import getEmail from "../WorkWithStorage/ReadUsersEmail";
import DatePicker from 'react-native-datepicker'
import sign from "../WorkWithStorage/WriteUser";

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
            <View style={{alignItems: "center"}}>
            <DatePicker
                date={date}
                mode="datetime"
                format="MM-DD HH:MM"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {setDate(date)}}
            />
            </View>
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
                    style={styles.button}
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

async function sendOrder({id, date, peopleAmount, navigation}) {
    let em = await getEmail();
    fetch(MainLink() + "create_order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            date: (new Date().getFullYear()) + '-' + date,
            peopleAmount: peopleAmount,
            email: em})
    })
        .then((resp) => resp.text())
        .then(respText => {
            if (Number(respText) === 200) {
                createAlert({navigation})
            }
        })
        .catch((err) => {
            console.log(err);
        });
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
    button: {
        width: wid - 55,
        height: 45,
        backgroundColor: "rgba(180,180,180, 0.7)",
        borderRadius: 25,
        justifyContent: "center"
    },
});
