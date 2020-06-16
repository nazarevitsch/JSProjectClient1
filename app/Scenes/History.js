import {ActivityIndicator, FlatList, Text, View, Dimensions} from "react-native";
import React, {useEffect, useState} from "react";
import MainLink from "../MainLinks";
import getEmail from "../WorkWithStorage/ReadUsersEmail";

const hei = Dimensions.get('window').height;

export default function History() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        async function fetchData(){
        fetch(MainLink() + "user_orders", {
            method: 'GET',
            headers: {
                email: await getEmail()
            }
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson);
                setData(resJson)})
            .catch(error => console.log(error))
            .finally(() => {setLoading(true)})
    }
        fetchData();
    }, []);


    return (
        <View style={{paddingTop: 22}}>
            <Text style={{textAlign: 'center', fontSize: 33, fontStyle: 'italic'}}>Your Orders</Text>
            <View style={{
                height: 2,
                width: "100%",
                backgroundColor: "#CED0CE",
            }}
            />
            {!loading ? <ActivityIndicator/> :
                <FlatList
                    style={{height: hei}}
                    data={data}
                    extraData={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <ItemRender title={item}/>}
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

function ItemRender({title}) {
    return (
        <View>
            <Text style={{fontSize: 20, margin: 10}}>- {title.name}</Text>
            <Text style={{fontSize: 20}}>Time: {title.date.replace('T', ' ').slice(0, -8)}</Text>
        </View>
    );
}
