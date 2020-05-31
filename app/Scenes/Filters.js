import {
    Text,
    View,
    Button,
    Picker,
    TextInput,
    Dimensions,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Platform
} from "react-native";
import React, {useState, useEffect} from "react";
import MainLink from "../MainLinks";
import DismissKeyboard from "../SpecialComponents/DismissKeyboard";

const wid = Dimensions.get('window').width;
const selectedFilters = [{from: 0, to: 0, selected: "a"}];

export default function FiltersScreen({navigation}) {

    const [data, setData] = useState({});
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);
    const [selectedValue, setSelectedValue] = useState(1);
    const [rerender, setRerender] = useState(true);

    useEffect(() => {
        fetch(MainLink() + 'categories')
            .then((res) => res.json())
            .then((resJson) => {
                setData(resJson.data);
                setLoadingCategory(false);
            })
    }, []);

    const createPickerItem = () => {
        return (data.map((x, i) => {
            return (<Picker.Item label={x.name} key={x.category_id} value={x.category_id}/>)
        }));
    };

    const getCategoryName = (id) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category_id === id) {
                return data[i].name;
            }
        }
    };

    const check = (id) => {
        for (let i = 0; i < selectedFilters.length; i++) {
            if (selectedFilters[i].selected === id) {
                return true;
            }
        }
    };

    return (
        <DismissKeyboard>
            <View>
                <View>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <View style={{width: ((wid * 40) / 100), height: 200}}>
                                {loadingCategory ? <ActivityIndicator/> :
                                    <Picker
                                        selectedValue={selectedValue}
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    >
                                        {createPickerItem()}
                                    </Picker>
                                }
                            </View>
                            <View style={{width: ((wid * 40) / 100), alignItems: 'center'}}>
                                <Text style={styles.textStyle}>Price</Text>
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={"from"}
                                        keyboardType={"numeric"}
                                        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                                        onChangeText={text => setPriceFrom(Number(text))}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder={"to"}
                                        keyboardType={"numeric"}
                                        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                                        onChangeText={text => setPriceTo(Number(text))}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.buttonAdd}
                                title="Add"
                                onPress={() => {
                                    if (!check(selectedValue)) {
                                        selectedFilters.push({
                                            from: priceFrom,
                                            to: priceTo,
                                            selected: selectedValue,
                                            name: getCategoryName(selectedValue)
                                        });
                                        setRerender(!rerender);
                                    }
                                }}
                            >
                                <Text style={styles.textStyle}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={selectedFilters}
                        renderItem={({item}) => item.selected !== "a" ? <View style={styles.Container}>
                            <Text>For {item.name} from: {item.from}, to: {item.to}</Text>
                            <Button title="Delete"
                                    onPress={() => {
                                        for (let i = 0; i < selectedFilters.length; i++) {
                                            if (selectedFilters[i].selected === item.selected) {
                                                selectedFilters.splice(i, 1);
                                                break;
                                            }
                                            setRerender(!rerender);
                                        }
                                    }}/>
                        </View> : <View></View>}
                        keyExtractor={item => item.selected}
                        extraData={rerender}
                        ItemSeparatorComponent={() =>
                            <View style={{
                                height: 2,
                                width: "100%",
                                backgroundColor: "#CED0CE",
                            }}
                            />
                        }
                    />
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        style={styles.buttonSave}
                        onPress={() => {
                            sendFilters({navigation})
                        }}
                    >
                        <Text style={{
                            textAlign: "center",
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: 16
                        }}
                        >Save Filters</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DismissKeyboard>
    );
}

function sendFilters({navigation}) {
    console.log(selectedFilters);
    navigation.navigate("ListOfAll", {selectedFilters: selectedFilters, number: Math.floor(Math.random() * 899999) + 100000});
}

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 10,
        fontSize: 20,
        fontStyle: "italic",
    },
    input: {
        textAlign: 'center',
        width: ((wid * 40) / 100) - 30,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "rgba(180,180,180, 0.7)",
        color: "rgb(0,0,0)",
        marginHorizontal: 25,
        marginTop: 15
    },
    Container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    buttonSave: {
        width: wid - 55,
        height: 45,
        backgroundColor: "rgba(180,180,180, 0.7)",
        borderRadius: 25,
        justifyContent: "center"
    },
    buttonAdd: {
        width: ((wid * 20) / 100),
        backgroundColor: "rgba(180,180,180, 0.7)",
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 45,
    }
});
