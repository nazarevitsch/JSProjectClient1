import React, {useEffect, useState} from "react";
import {StyleSheet, View, ActivityIndicator, FlatList, Text, Image, TouchableOpacity, RefreshControl} from "react-native";
import MainLink from "../MainLinks";


export default function ListOfAll({navigation, route}) {

    const {selectedFilters} = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
            fetch(MainLink(), {
                method: 'GET',
                headers: {
                    Filters: FiltersToString(selectedFilters),
                }
            })
                .then((res) => res.json())
                .then((respJson) => {
                    setData(respJson);
                })
                .catch(error => console.log(error))
                .finally(()=> {
                    setLoading(false)});
    }, [selectedFilters]);

    return (
        <View>
            {loading ? <ActivityIndicator/> :
            <FlatList
                data={data}
                extraData={data}
                keyExtractor={item => item.id}
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
};


function ItemRender({title, nav}) {
    return (
         <TouchableOpacity
            style={styles.Container}
            onPress={()=>{
                nav.navigate("Window", {id: title.id})}}
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

function FiltersToString(selectedFilters) {
    let line = "";
    console.log(selectedFilters[0]);
    for(let i = 0; i < selectedFilters.length; i++){
        line += selectedFilters[i].from + "_" + selectedFilters[i].selected + "_" + selectedFilters[i].to + "|";
    }
    console.log(line);
    return line;
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
