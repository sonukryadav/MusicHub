import { Alert, View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Styles/Home';
import RNFS from 'react-native-fs';
import Fontisto from "react-native-vector-icons/Fontisto";
import { Loading1, SlideUpView } from '../Views';
import { requestStoragePermission, searchAllAudioFiles } from "../HelperFunctions";

export default function Home() {
    const [files, setFiles] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestStoragePermission(grantedPerms, deniedPerms);
    }, []);


    const grantedPerms = async () => {
        const audioFiles = await searchAllAudioFiles(RNFS.ExternalStorageDirectoryPath);
        setFiles(audioFiles);
    }

    const deniedPerms = async() => {
        Alert.alert("Permission denied");
    }

    if (files.length === 0) {
        return (
            <View style={styles.loadV1}>
                <Loading1 text={"Hold on, retrieving audio files..."} />
            </View>
        );
    }

    const showSlideUp = () => {
        setVisible((pre) => !pre);
    }


    return (
        <SafeAreaView style={styles.sav}>
            <View style={styles.v1}>
                    <FlatList
                        data={files}
                        renderItem={({item , index}) => {
                            return (
                                <View style={styles.v2}>
                                    <View>
                                        <TouchableOpacity>
                                            <View style={styles.v3}>
                                                <View style={styles.v4}>
                                                    <Fontisto name={"applemusic"} size={60} color={"black"} />
                                                </View>
                                                <View style={styles.v5}>
                                                        <Text style={styles.t1}>{item.name.length > 35 ? item.name.substring(0, 35) + "..." : item.name}</Text>
                                                    <Text style={styles.t2}>{"Artist name"}</Text>
                                                    <Text style={styles.t3}>{"2:15"}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={()=>showSlideUp(item)}>
                                            <View style={styles.v6}>
                                                <Fontisto name={"more-v-a"} size={18} color={"black"} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                    />
            </View>
            <SlideUpView visible={visible} setVisible={setVisible} slideHeight={250}>
                <View style={{ padding: 20 }}>
                    <Text style={{color:"red", fontSize:15, textAlign:"center"}}>This is the sliding view content.</Text>
                </View>
            </SlideUpView>
        </SafeAreaView>
    );
}
