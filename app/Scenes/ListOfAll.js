import React, {useEffect, useState} from "react";
import {StyleSheet, View, ActivityIndicator, FlatList, Text, Image, AsyncStorage} from "react-native";

export default function ListOfAll() {
    const [data, setDate] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            fetch('http://192.168.0.105:8080', {
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
        <View>
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
                source={{uri: "http://192.168.0.105:8080" + title.mainPhoto}}
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
