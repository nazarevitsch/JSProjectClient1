import React, {useEffect, useState} from "react";
import {StyleSheet, View, ActivityIndicator, FlatList, Text, Image, TouchableOpacity} from "react-native";
import Constants from "expo-constants";
import MainLink from "../MainLinks";

export default function ListOfAll({navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            fetch(MainLink(), {
                method: 'GET',
                headers: {
                    Filters: "ABCD",
                }
            })
                .then((res) => res.json())
                .then((respJson) => {
                    setData(respJson)
                })
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        }
    });

    return (
        <View>
            {loading ? <ActivityIndicator/> :
            <FlatList
                data={data}
                renderItem={({item}) =><ItemRender title={item} nav={navigation}/>}
                ItemSeparatorComponent={() =>
                    <View style={{
                        height: 2,
                        width: "100%",
                        backgroundColor: "#CED0CE",
                    }}
                    />
                }
            />}
        </View>
    );
}

function ItemRender({title, nav}) {
    return (
         <TouchableOpacity
            style={styles.Container}
            onPress={()=>{nav.navigate("Window", {id: title.id})}}
        >
            <Image
                style={styles.MP}
                source={{uri: MainLink() + title.image}}
            />
            <View>
                <Text>{title.name}</Text>
                <Text>{title.location}</Text>
                <Text>Work Time: {title.From} - {title.To}</Text>
                <Text style={styles.TTSM}>Tap to see more.</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    TTSM: {
        color: "rgb(179, 173, 171)"
    },
    MP: {
        height: 90,
        width: 90
    }
});
