import { Alert, View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Styles/LocalAudioFiles';
import Fontisto from "react-native-vector-icons/Fontisto";
import { Loading1, SlideUpView } from '../Views';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function LocalAudioFiles() {
    const [files, setFiles] = useState([]);
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const { localAudios } = useSelector((state) => state.localAudio);

    useEffect(() => {
        setFiles(pre => localAudios);
    }, []);


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

    console.log(files[0]);

    const singleBlock = (item, index) => {
        navigation.navigate("singleaudio", {title : item.title, url : item.url, index1 : index});
    }

    return (
        <SafeAreaView style={styles.sav}>
            <View style={styles.v1}>
                <FlatList
                    data={files}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.v2}>
                                <View style={styles.v3}>
                                    <TouchableOpacity onPress={()=>singleBlock(item, index)}>
                                        <View style={styles.v3i}>
                                            <View style={styles.v4}>
                                                <Fontisto name={"applemusic"} size={60} color={"black"} />
                                            </View>
                                            <View style={styles.v5}>
                                                <Text style={styles.t1}>{item.title.length > 35 ? item.title.substring(0, 35) + "..." : item.title}</Text>
                                                <Text style={styles.t2}>{"Artist name"}</Text>
                                                <Text style={styles.t3}>{"2:15"}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.v6}>
                                    <TouchableOpacity onPress={() => showSlideUp(item)}>
                                        <View style={styles.v6i}>
                                            <Fontisto name={"more-v-a"} size={18} color={"black"} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index)=> index.toString()}
                />
            </View>
            <SlideUpView visible={visible} setVisible={setVisible} slideHeight={250}>
                <View style={{ padding: 20 }}>
                    <Text style={{ color: "red", fontSize: 15, textAlign: "center" }}>This is the sliding view content.</Text>
                </View>
            </SlideUpView>
        </SafeAreaView>
    );
}
