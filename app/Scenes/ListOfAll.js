import React, {useEffect, useState} from "react";
import {StyleSheet, View, ActivityIndicator, FlatList, Text, Image, TouchableOpacity, RefreshControl} from "react-native";
import MainLink from "../MainLinks";
import DismissKeyboard from "../SpecialComponents/DismissKeyboard";


export default function ListOfAll({navigation, route}) {

    const {selectedFilters} = route.params;
    const {number} = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(MainLink() + "restaurants", {
            method: 'GET',
            headers: {
                Filters: FiltersToString(selectedFilters),
            }
        })
            .then((res) => res.json())
            .then((resJson) => setData(resJson.data))
            .catch(error => console.log(error))
            .finally(() => {
                setLoading(false)
            });
    }, [number]);

    return (
        <DismissKeyboard>
            <View>
                {loading ? <ActivityIndicator/> :
                    <FlatList
                        data={data}
                        extraData={data}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <ItemRender title={item} nav={navigation}/>}
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
        </DismissKeyboard>
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
                source={{uri: MainLink() + "img",
                    headers:{
                    name: title.image
                    }
                }}
            />
            <View>
                <Text>{title.name}</Text>
                <Text>{title.location}</Text>
                <Text>Work Time: {title.work_from} - {title.work_to}</Text>
                <Text style={styles.TTSM}>Tap to see more.</Text>
            </View>
        </TouchableOpacity>
    );
}

function FiltersToString(selectedFilters) {
    let line = "";
    for(let i = 1; i < selectedFilters.length; i++){
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
