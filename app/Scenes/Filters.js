import {ScrollView, Text, View, Switch, Button, Picker, TextInput, Dimensions, StyleSheet} from "react-native";
import React, {useState, Component} from "react";

const wid = Dimensions.get('window').width;

export default class FiltersScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            priceFrom: 0,
            priceTo: 0,
            selectedValue: "a1",
            selectedFilters: []
    }
    }
    // const [priceFrom, setPriceFrom] = useState(0);
    // const [priceTo, setPriceTo] = useState(0);
    // const [selectedValue, setSelectedValue] = useState("a1");


    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    render() {
    return (
        <ScrollView style={{paddingTop: 25}}>
            <View style={{flex: 1}}>
                {/*<View style={{flexDirection: "row", justifyContent: "space-between", margin: 15}}>*/}
                {/*    <Text style={{fontSize: 26}}>Наявність живої музики</Text>*/}
                {/*    <Switch*/}
                {/*        trackColor={{false: "#767577", true: "#0acf0d"}}*/}
                {/*        ios_backgroundColor="#3e3e3e"*/}
                {/*        onValueChange={toggleSwitch}*/}
                {/*        value={isEnabled}*/}
                {/*    />*/}
                {/*</View>*/}
                <View style={{flexDirection: "row"}}>
                    <View style={{width: ((wid * 40) / 100), height: 100}}>
                        <Picker
                            selectedValue={this.state.selectedValue}
                            style={{height: 50, width: 150}}
                            // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            onValueChange={(itemValue, itemIndex) => this.state.selectedValue.setState(itemValue)}
                        >
                            <Picker.Item label="Гарячі страви" value="a1"/>
                            <Picker.Item label="Паста" value="a2"/>
                            <Picker.Item label="Піца" value="a3"/>
                            <Picker.Item label="Суші" value="a4"/>
                            <Picker.Item label="Салати" value="a5"/>
                            <Picker.Item label="Закуски" value="a6"/>
                            <Picker.Item label="Бургери" value="a7"/>
                            <Picker.Item label="Мячні страви" value="a8"/>
                            <Picker.Item label="Рибні страви" value="a9"/>
                            <Picker.Item label="Гриль" value="a10"/>
                        </Picker>
                    </View>
                    <View style={{width: ((wid * 40) / 100)}}>
                        <Text style={styles.textStyle}>Price</Text>
                        <View>
                            <Text style={styles.textStyle}>From:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={"from:"}
                                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                                // onChangeText={text => setPriceFrom(Number(text))}
                                onChangeText={text => this.state.priceFrom.setState(Number(text))}
                            />
                        </View>
                        <View>
                            <Text style={styles.textStyle}>To:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={"to"}
                                placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
                                // onChangeText={text => setPriceTo(Number(text))}
                                onChangeText={text => this.state.priceTo.setState(Number(text))}
                            />
                        </View>
                    </View>
                    <View style={{width: ((wid * 20) / 100), backgroundColor: "#f194ff"}}>
                        <Button
                            title="Add"
                            onPress={()=> {
                                this.state.selectedFilters[this.state.selectedFilters.length] = (<View>
                                        <Text>Vasa</Text>
                                    <Button
                                        title="DELETE"
                                    onPress={this.state.selectedFilters.
                                    this.forceUpdate}
                                    />
                                </View>);
                                this.forceUpdate();
                                console.log(1);
                            }}
                        />
                    </View>
                </View>
            </View>
            <View>
                {this.state.selectedFilters}
            </View>
        </ScrollView>
    );}
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 25,
        fontStyle: "italic",
    },
    input:{
        width: ((wid*40)/100) - 30,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "rgba(180,180,180, 0.7)",
        color: "rgb(0,0,0)",
        paddingLeft: 45,
        marginHorizontal: 25,
    }
});
