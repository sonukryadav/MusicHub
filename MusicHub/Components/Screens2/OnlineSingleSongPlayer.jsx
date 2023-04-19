import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from '../Styles/OnlineSingleSongPlayer';
import { useRoute } from "@react-navigation/native";


export default function OnlineSingleSongPlayer() {
    const route = useRoute();
    const { songDetail } = route.params;
    console.log(songDetail);
    return (
        <SafeAreaView style={styles.sav}>
            <ScrollView contentContainerStyle={styles.scrollV}>
                <View style={styles.v1}>
                    <Image source={{ uri: songDetail.posterUrl }} resizeMode='contain' style={styles.img1} />
                </View>
                <View style={styles.v2}>
                    <Text style={styles.t1}>{"Title/album"}</Text>
                    <Text style={styles.t2}>{songDetail["album/movie"]}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}





// OnlineSingleSongPlayer