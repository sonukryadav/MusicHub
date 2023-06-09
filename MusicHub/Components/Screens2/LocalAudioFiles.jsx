import { Alert, View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import stylesT from '../Styles/LocalAudioFiles';
import Fontisto from "react-native-vector-icons/Fontisto";
import { Loading1, SlideUpView } from '../Views';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import TrackPlayer, { RepeatMode, State, usePlaybackState, useProgress } from 'react-native-track-player';



export default function LocalAudioFiles() {
    const [files, setFiles] = useState([]);
    const [visible, setVisible] = useState(false);
    const [more, setMore] = useState("");
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const { localAudios } = useSelector((state) => state.localAudio);
    const { theme } = useSelector(state => state.theme);
    const styles = stylesT(theme);

    useEffect(() => {
        (() => {
            setFiles(localAudios);
        })();
    }, [files]);

    if (isFocused) {
        (async () => {
            await TrackPlayer.reset();
            await TrackPlayer.add(localAudios);
        })();
    }


    if (files.length === 0) {
        return (
            <View style={styles.loadV1}>
                <Loading1 text={"searching files..."} />
            </View>
        );
    }

    const showSlideUp = (item) => {
        setVisible((pre) => !pre);
        setMore(item);
    }

    const singleBlock = (item, index) => {
        navigation.navigate("singleaudio", {title : item.title, url : item.url, index1 : index});
    }


    const SongBlock = ({ item, index }) => {
        return (
            <>
                <View style={styles.v2}>
                    <View style={styles.v3}>
                        <TouchableOpacity onPress={() => singleBlock(item, index)}>
                            <View style={styles.v3i}>
                                <View style={styles.v4}>
                                    <Fontisto name={"applemusic"} size={60} color={"black"} />
                                </View>
                                <View style={styles.v5}>
                                    {/* <Text style={styles.t1}>{item.title.length > 35 ? item.title.substring(0, 35) + "..." : item.title}</Text> */}
                                    <Text style={styles.t1}>{item.title}</Text>
                                    <Text style={styles.t2}>{""}</Text>
                                    <Text style={styles.t3}>{(item.duration).toFixed(3)} MB</Text>
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
            </>
        )
    };

    return (
        <SafeAreaView style={styles.sav}>
            <View style={styles.v1}>
                <FlatList
                    data={files}
                    renderItem={({ item, index }) => (<SongBlock item={item} index={ index} />)}
                    keyExtractor={(item, index)=> index.toString()}
                />
            </View>
            <SlideUpView visible={visible} setVisible={setVisible} slideHeight={250}>
                <View style={{ padding: 20 }}>
                    <Text style={{ color: "red", fontSize: 25, textAlign: "center" }}>{more.title}</Text>
                    <Loading1 text={"Trying to restore other data"} />
                </View>
            </SlideUpView>
        </SafeAreaView>
    );
}
