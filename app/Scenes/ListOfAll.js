import React, {useEffect, useState} from "react";
import {StyleSheet, View, ActivityIndicator, FlatList, Text, Image, AsyncStorage} from "react-native";
import Constants from "expo-constants";
import MainLink from "../MainLinks";

export default function ListOfAll() {
    const [data, setDate] = useState([]);
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
                .then((respJson) => {setDate(respJson)})
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        }
    });

    return (
        <View style={{paddingTop: Constants.statusBarHeight}}>
            {loading ? <ActivityIndicator/> : <Text>{data.name}</Text>}
            <FlatList
                data={data}
                renderItem={({item}) =><ItemRender title={item}/>}
                ItemSeparatorComponent={()=>
                    <View style={{
                        height: 2,
                        width: "100%",
                        backgroundColor: "#CED0CE",
                    }}
                    />
                }
            />
        </View>
    );
}

function ItemRender({ title }) {
    return (
        <View style={styles.Container}>
            <Image
                style={styles.MP}
                source={{uri: MainLink() + title.mainPhoto}}
            />
            <View>
                <Text>{title.name}</Text>
                <Text>{title.location}</Text>
                <Text style={styles.TTSM}>Tap to see more.</Text>
            </View>
        </View>
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
