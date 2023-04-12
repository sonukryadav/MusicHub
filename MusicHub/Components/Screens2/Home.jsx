import { View, Text, SafeAreaView, Image, Animated, Alert, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents} from 'react-native-track-player';
import styles from '../Styles/Home';
import RollingText from "react-native-rolling-text";
import Slider from '@react-native-community/slider';
import Ionicons from "react-native-vector-icons/Ionicons";
import RNFS from 'react-native-fs';
import { Loading1 } from '../Views';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { requestStoragePermission, searchAllAudioFiles } from "../HelperFunctions";



const screenWidth = Dimensions.get("window").width;

// const setUpPlayer1 = async (array) => {
//     try {
//         await TrackPlayer.setupPlayer();
//         await TrackPlayer.add(array);
//     } catch (error) {
//         console.log(error);
//     }
// }

// const togglePlayBack = async (playbackState) => {
//     const currentTrack = await TrackPlayer.getCurrentTrack();
//     if (currentTrack !== null) {
//         if (playbackState == State.Paused) {
//             await TrackPlayer.play();
//         } else {
//             await TrackPlayer.pause();
//         }
//     }
//     console.log("toggle");
// }




export default function Home() {
    const [files, setFiles] = useState([]);
    const [songIndex, setSongIndex] = useState(0);
    const playBackState = usePlaybackState();
    const [currentSong, setCurrentSong] = useState(0)


    const ar = [
        {
            id: 1,
            url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            title: 'song 1',
            artist: 'deadmau1',
            artwork: "https://static.toiimg.com/photo/98658252/size-133239/98658252.jpg",
            duration: 411
        },
        {
            id: 2,
            url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav',
            title: 'Ice Age2',
            artist: 'deadmau2',
            title: 'song2 slj akjd sldj komds o ads asldjpk kjdsfkjdsjfoksdj koasodj',
            artwork: "https://i.ytimg.com/vi/GLGuLXKT9Ng/maxresdefault.jpg",
            duration: 411
        },
        {
            id: 3,
            url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            title: 'song3 sdf adslk  jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
            artist: 'deadmau3',
            artwork: "https://static.toiimg.com/thumb/msid-96416857,width-1280,resizemode-4/96416857.jpg",
            duration: 411
        },
        {
            id: 4,
            url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            title: 'song2 slj akjd sldj komds o ads asldjpk kjdsfkjdsjfoksdj koasodj',
            artist: 'deadmau4',
            artwork: "https://i.ytimg.com/vi/GLGuLXKT9Ng/maxresdefault.jpg",
            duration: 411
        },

    ]

    const scrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef(null);

    useEffect(() => {
        // setUpPlayer1(ar);
        scrollX.addListener(({ value }) => {
            const index = Math.round(value / screenWidth)
            setSongIndex(index);
        });
    },[]);

    useEffect(() => {
        requestStoragePermission(grantedPerms, deniedPerms);
    }, []);

    const grantedPerms = async () => {
        const audioFiles = await searchAllAudioFiles(RNFS.ExternalStorageDirectoryPath);
        setFiles(audioFiles);
    }

    const deniedPerms = async () => {
        Alert.alert("Permission denied");
    }

    if (files.length === 0) {
        return (
            <View style={styles.loadV1}>
                <Loading1 text={"Hold on, retrieving audio files..."} />
            </View>
        );
    }

    const fun = () => {
        Alert.alert("Icon");
    }


    const singleSong = (item) => {
        return (
            <View style={styles.v4}>
                <Image source={{ uri: item.artwork }} resizeMode='contain' style={styles.img1} />
            </View>
        );
    }

    console.log(playBackState);
    const iconSize = 45;
    const iconColor = "black";


    const prev = () => {
        // if (currentSong > 0) {
        //     setSongIndex(pre => pre - 1);
        // }
        // console.log("prev");
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
    }

    const next = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
        // if (ar.length -1 > currentSong) {
        //     setSongIndex(pre => pre + 1);
        // }
        // console.log("next");
    }

    const playPause = () => {
    }

    const shuffle = () => {
    }

    const repeat = () => {
    }

    return (
        <SafeAreaView style={styles.sav1}>
            <ScrollView contentContainerStyle={styles.scv}>
                <View style={styles.v1}>
                    <View style={styles.v2}>
                        <View style={styles.v3}>
                            <View style={styles.flatListView}>
                                <Animated.FlatList
                                    data={ar}
                                    horizontal
                                    renderItem={({ item }) => (singleSong(item))}
                                    keyExtractor={(item, index) => index.toString()}
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    onScroll={Animated.event(
                                        [
                                            {
                                                nativeEvent: {
                                                    contentOffset: {x : scrollX}
                                                },
                                            },
                                        ],
                                        {
                                            useNativeDriver:true,
                                        }
                                    )}
                                />
                            </View>
                            <View style={styles.v5}>
                                <View style={{ width: "100%", overflow: 'hidden' }}>
                                    <RollingText style={styles.t1}>
                                        {ar[songIndex].title}
                                    </RollingText>
                                </View>
                                <Text style={styles.t2}>{ar[songIndex].artist}</Text>
                            </View>
                            <View style={styles.v6}>
                                <View style={styles.v7}>
                                    <Slider
                                        style={styles.slider}
                                        // value={10}
                                        minimumValue={0}
                                        maximumValue={100}
                                        minimumTrackTintColor="black"
                                        maximumTrackTintColor="#000000"
                                        thumbTintColor="#135763"
                                        onSlidingComplete={() => { }}
                                    />
                                </View>
                                <View style={styles.v8}>
                                    <Text style={styles.time}>{"00:00"}</Text>
                                    <Text style={styles.time}>{"05:30"}</Text>
                                </View>
                            </View>
                            <View style={styles.v9}>
                                <TouchableOpacity onPress={() => shuffle()}>
                                    <Ionicons name={"md-shuffle-sharp"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => prev()}>
                                    <Ionicons name={"md-play-skip-back-circle"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => playPause()}>
                                    <Ionicons name={playBackState === State.Playing ? "md-pause-circle" : "md-play-circle"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => next()}>
                                    <Ionicons name={"md-play-skip-forward-circle-sharp"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => repeat()}>
                                    <Ionicons name={true ? "repeat" : "repeat-one"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const Icon1 = ({name, fun}) => {
    return (
        <TouchableOpacity onPress={() => { }}>
            <Ionicons name={name} size={45} color={"black"} />
        </TouchableOpacity>
    );
}

const Icon2 = ({ name, fun }) => {
    return (
        <TouchableOpacity onPress={fun}>
            <MaterialIcons name={name} size={45} color={"black"} />
        </TouchableOpacity>
    );
}