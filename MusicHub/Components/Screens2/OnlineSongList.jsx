import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import styles from '../Styles/OnlineSongList';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Loading1 } from '../Views';

export default function OnlineSongList() {
    const [songs, setSongs] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const { songListUrl } = route.params;
    console.log(songListUrl);

    useEffect(() => {
        (() => {
            fetch(`${songListUrl}`)
                .then(data => data.json()).then(data1 => setSongs(data1));
        })();
    }, []);


    if (songs.length === 0) {
        return (
            <View style={styles.loadV1}>
                <Loading1 text={"Fetching data..."} />
            </View>
        );
    }



    const renderHeader = () => (
        <>
            <View style={styles.v1}>
                <Text style={styles.t1}>{"Bollywood Songs"} </Text>
            </View>
        </>
    );


    const Cards = ({ item, index }) => {
        return (
            <>
                <View style={styles.v2}>
                    <TouchableOpacity>
                        <Image source={{ uri: `${item.item.posterUrl}` }} resizeMode='contain' style={styles.posterImage} />
                    </TouchableOpacity>
                    <Text style={styles.t2}>{item.item.songName}</Text>
                </View>
            </>
        );
    }

    const renderFooter = () => (
        <>
            {/* <View style={{ height: 300, backgroundColor: "red" }}></View>
            <View style={{ height: 300, backgroundColor: "green" }}></View> */}
        </>
    )


    return (
        <SafeAreaView style={styles.sav}>
            <FlatList
                data={songs}
                keyExtractor={item => item.id}
                renderItem={(item, index) => (<Cards item={item} index={index} />)}
                numColumns={2}
                columnWrapperStyle={styles.flatListRow}
                horizontal={false}
                contentContainerStyle={styles.flatList1}
                ListHeaderComponent={renderHeader}
                ListHeaderComponentStyle={styles.flatListHeader}
                ListFooterComponent={renderFooter}
                ListFooterComponentStyle={styles.flatListFooter}
            />
        </SafeAreaView>
    )
}

