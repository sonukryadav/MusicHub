import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, PermissionsAndroid, Platform, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Styles/Home';
import { audioDocumentPicker } from '../HelperFunctions';


export default function Home() {

    const getFiles = () => {
    }


    return (
        <SafeAreaView style={styles.sav}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.v1}>
                    <Text style={styles.t1}>
                        { "HOME" }
                    </Text>

                    <TouchableOpacity onPress={getFiles}>
                        <Text style={styles.t2}>Get the audio files</Text>
                    </TouchableOpacity>

                    <Image style={styles.img1} source={{ uri:"https://easydrawingguides.com/wp-content/uploads/2017/02/How-to-draw-a-cartoon-tree-20.png" }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

//----------react-native-fs-----------