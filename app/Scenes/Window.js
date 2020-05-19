import {
    Image,
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView
} from "react-native";
import React, {useEffect, useState} from "react";
import {AntDesign} from '@expo/vector-icons';
import MainLink from "../MainLinks";

const heig = Dimensions.get('window').height;
const wid = Dimensions.get('window').width;

export default function Window({navigation, route}) {
    const {id} = route.params;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [hideImages, setHideImages] = useState(true);
    const [hideDescription, setHideDescription] = useState(true);
    const [hideMenu, setHideMenu] = useState(true);

    useEffect(() => {
        if (loading) {
            fetch(MainLink() + "item", {
                method: 'GET',
                headers: {
                    ID: {id},
                }
            })
                .then((res) => res.json())
                .then((respJson) => {
                    setData(respJson)
                    console.log(data[0].images);
                })
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        }
    });

    return (
        <View>
            <ScrollView>
            {loading ? <ActivityIndicator/> :
                <View>
                    <View style={styles.Container}>
                        <Image
                            style={styles.MP}
                            source={{uri: MainLink() + data[0].mainImage}}
                        />
                        <View>
                            <Text>{data[0].name}</Text>
                            <Text>{data[0].location}</Text>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{navigation.navigate("OrderWindow", {id: data[0].id})}}
                            >
                                <Text style={{fontSize: 26,}}>Order Table</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.showHide}
                            onPress={() => {
                                setHideDescription(!hideDescription)
                            }}
                        >
                            {hideDescription ?
                                <View style={styles.Container}>
                                    <AntDesign name={"down"} size={28} color={"tomato"}
                                               style={styles.iconInput}/>
                                    <Text>Show Description</Text>
                                </View>
                                :
                                <View style={styles.Container}>
                                    <AntDesign name={"up"} size={28} color={"tomato"}
                                               style={styles.iconInput}/>
                                    <Text>Hide Description</Text>
                                </View>
                            }
                        </TouchableOpacity>
                        {!hideDescription ? <ShowDescription desk={data[0].description}/> : <View></View>}

                        <TouchableOpacity
                            style={styles.showHide}
                            onPress={() => {
                                setHideMenu(!hideMenu)
                            }}
                        >
                            {hideMenu ?
                                <View style={styles.Container}>
                                    <AntDesign name={"down"} size={28} color={"tomato"}
                                               style={styles.iconInput}/>
                                    <Text>Show Menu</Text>
                                </View>
                                :
                                <View style={styles.Container}>
                                    <AntDesign name={"up"} size={28} color={"tomato"}
                                               style={styles.iconInput}/>
                                    <Text>Hide Menu</Text>
                                </View>
                            }
                        </TouchableOpacity>
                        {!hideMenu ? <ShowMenu menu={data[0].menu}/> : <View></View>}

                        <TouchableOpacity
                            style={styles.showHide}
                            onPress={() => {
                                setHideImages(!hideImages)
                            }}
                        >
                            {hideImages ?
                                <View style={styles.Container}>
                                    <AntDesign name={"down"} size={28} color={"tomato"}
                                               style={styles.iconInput}/>
                                    <Text>Show Images</Text>
                                </View>
                                :
                                <View style={styles.Container}>
                                    <AntDesign name={"up"} size={28} color={"tomato"}
                                               style={styles.iconInput}/>
                                    <Text>Hide Images</Text>
                                </View>
                            }
                        </TouchableOpacity>
                        {!hideImages ? <ShowImages images={data[0].images}/> : <View></View>}
                    </View>
                </View>
            }
            </ScrollView>
        </View>
    );
}

function ShowMenu({menu}) {
    return(
        <View>
            <FlatList
                data={menu}
                horizontal={true}
                renderItem={({item}) =><MenuRender menu2={item} />}
                ItemSeparatorComponent={() =>
                    <View style={{height: (heig/2), width: 2, backgroundColor: 'white'}}/>
                }
            />
        </View>
    );
}

function MenuRender({menu2}) {
    return(
        <View>
            <Text style={{fontSize: 22}}>{menu2[0]}</Text>
            <FlatList
                data={menu2.slice(1)}
                renderItem={({item}) =>
                    <View>
                        <Text>{item[0]}    {item[1]} грн.</Text>
                    </View>
                }
            />
        </View>
    );
}

function ShowDescription({desk}) {
    return(
        <View>
            <Text style={{fontSize: 20}}>Description</Text>
            <Text>{desk}</Text>
        </View>
    );
}

function ShowImages({images}){
    return(
        <View style={styles.Container}>
            <FlatList
                data={images}
                horizontal={true}
                renderItem={({item}) =><ImageRender image={item} />}
                ItemSeparatorComponent={() =>
                    <View style={{height: (heig/2), width: 2, backgroundColor: 'white'}}/>
                }
            />
        </View>
    );
}

function ImageRender({image}) {
    return (
        <Image
            style={styles.normalImage}
            source={{uri: MainLink() + image}}
        />
    );
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    MP: {
        height: 90,
        width: 90
    },
    normalImage: {
        height: (heig/2),
        width: (wid * 40)/100,
    },
    showHide: {
        backgroundColor: "#bec1be"
    },
    button: {
        height: 35,
        width: wid/2,
        borderRadius: 25,
        backgroundColor: "#001fff",
        alignItems: "center",
        marginLeft: 20
    }
});
