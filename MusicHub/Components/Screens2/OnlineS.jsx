import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList} from 'react-native'
import React,{ useEffect, useState } from 'react';
import stylesT from '../Styles/OnlineS';
import { Loading1 } from '../Views';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSelector } from "react-redux";

export default function OnlineS() {
    const [poster, setPoster] = useState([]);
    const navigation = useNavigation();
    const { theme } = useSelector(state=>state.theme);
    const styles = stylesT(theme);


    useEffect(() => {
        (async() => {
            const user = auth().currentUser;
            const user1 = await firestore().collection('users').doc(user?.uid).get();

            if (user && user1._data) {
                navigation.navigate("stackHome");
                return;
            } else if (user && !user1._data) {
                navigation.navigate("userdetailform");
                return;
            } else if (!user && !user1._data) {
                navigation.navigate("signup");
                return;
            } else {
                navigation.navigate("signup");
                return;
            }
        })();
    })

    useEffect(() => {
        (() => {
            fetch(`https://firebasestorage.googleapis.com/v0/b/musichub2.appspot.com/o/MusicHub%2FAllJsonFile%2FmusicPosterCategories.json?alt=media&token=304df257-d53b-4968-8e9a-5db0b8f3add7`)
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
                        <Image source={{ uri: `${item.item.posterUrl}`}} resizeMode='contain' style={styles.posterImage} />
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