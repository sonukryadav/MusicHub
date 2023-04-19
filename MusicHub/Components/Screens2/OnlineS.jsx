import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList} from 'react-native'
import React,{ useEffect, useState } from 'react';
import styles from '../Styles/OnlineS';
import { Loading1 } from '../Views';
import { useNavigation } from '@react-navigation/native';

export default function OnlineS() {
    const [poster, setPoster] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        (() => {
            fetch(`https://firebasestorage.googleapis.com/v0/b/musichub2.appspot.com/o/MusicHub%2FAllJsonFile%2FmusicPosterCategories.json?alt=media&token=ae3665ea-a3d8-4c02-935f-f435fa15616d`)
                .then(data => data.json()).then(data1 => setPoster(data1));
        })();
    }, []);


    if (poster.length === 0) {
        return (
            <View style={styles.loadV1}>
                <Loading1 text={"Fetching data..."} />
            </View>
        );
    }

    const moveTo = () => {
        navigation.navigate("onlinesonglist", { songListUrl: "https://firebasestorage.googleapis.com/v0/b/musichub2.appspot.com/o/MusicHub%2FAllJsonFile%2FbollywoodMusic.json?alt=media&token=416bb829-797e-40c9-bcfb-e7908482ecfb"});
    }

    const Cards = ({ item, index }) => {
        return (
            <>
                <View style={styles.v2}>
                    <TouchableOpacity onPress={moveTo}>
                        <Image source={{ uri: `${item.item.posterUrl}`}} resizeMode='contain'  style={styles.posterImage} />
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    const renderHeader = () => (
        <>
            <View style={styles.v1}>
                <Text style={styles.t1}>Songs categories </Text>
            </View>
        </>
    );

    const renderFooter = () => (
        <>
            {/* <View style={{ height: 300, backgroundColor: "red" }}></View>
            <View style={{ height: 300, backgroundColor: "green" }}></View> */}
        </>
    )


    return (
        <SafeAreaView style={styles.sav}>
                <FlatList
                data={poster}
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