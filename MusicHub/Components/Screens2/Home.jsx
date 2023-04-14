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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { requestStoragePermission, searchAllAudioFiles } from "../HelperFunctions";
import tracklist from "../../tracklist.json";


const { width, height } = Dimensions.get("window");

const setUpPlayer = async (array) => {
    try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            // Media controls capabilities
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
            // Capabilities that will show up when the notification is in the compact form on Android
            compactCapabilities: [Capability.Play, Capability.Pause],
        });
        await TrackPlayer.add(array);
    } catch (error) {
        console.log(error);
    }
}

export default function Home() {
    const [files, setFiles] = useState([]);
    const [songIndex, setSongIndex] = useState(0);
    const playBackState = usePlaybackState();
    const progress = useProgress();
    const prevNextTractStateRef = useRef("ready");
    const [repeatMode, setRepeatMode] = useState("repeat-off");

    const scrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef(null);

    const skipTo = async (trackId) => {
        await TrackPlayer.skip(trackId);
    }

    useEffect(() => {
        setUpPlayer(tracklist);
        scrollX.addListener(({ value }) => {
            const index = Math.round(value / width);
            skipTo(index);
            setSongIndex(index);
        });
    }, []);

    useEffect(() => {
        requestStoragePermission(grantedPerms, deniedPerms);
    }, []);


    const grantedPerms = async () => {
        const audioFiles = await searchAllAudioFiles(RNFS.ExternalStorageDirectoryPath);
        setFiles(audioFiles);
    }

    const valuePosition = Math.floor(progress.position);
    useEffect(() => {
        if ((valuePosition + 1) === Math.floor(progress.duration) && repeatMode !== "repeat-once") {
            songSlider.current.scrollToOffset({
                offset: (songIndex + 1) * width * 0.9,
            });
            setTimeout(async () => {
                if (prevNextTractStateRef.current == State.Playing) {
                    await TrackPlayer.play();
                } else if (prevNextTractStateRef.current === State.Paused) {
                    await TrackPlayer.pause();
                }
            }, 500);
        }
    });

    let path = files[0]?.path;
    // RNFS.readFile(path, 'utf8')
    //     .then(contents => {
    //         console.log(contents);
    //     })
    //     .catch(error => {
    //         console.log(error.message);
    //     });

    useEffect(() => {
        readSingleFile();
    },[files])

    // console.log(path);

    const readSingleFile = async () => {
        try {
            const filePath = '/storage/emulated/0/Download/Hawaon Ne Yeh Kaha.mp3';
            const fileData = await RNFS.readFile(filePath);
            console.log(fileData);
        } catch (error) {
            console.log(error);
        }
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

    const iconSize = 50;
    const iconColor = "black";

    const prev = async (playBackState) => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width * 0.9,
        });
        setTimeout(async () => {
            if (prevNextTractStateRef.current == State.Playing) {
                await TrackPlayer.play();
            } else if (prevNextTractStateRef.current === State.Paused) {
                await TrackPlayer.pause();
            }
        }, 500);
    }


    const next = async (playBackState) => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width * 0.9,
        });
        setTimeout(async () => {
            if (prevNextTractStateRef.current == State.Playing) {
                await TrackPlayer.play();
            } else if (prevNextTractStateRef.current === State.Paused) {
                await TrackPlayer.pause();
            }
        }, 500);
    }

    const playPause = async(playBackState) => {
        const trackIndex = await TrackPlayer.getCurrentTrack();
        if (trackIndex !== null) {
        if (playBackState === State.Paused || playBackState ===  State.Ready) {
            await TrackPlayer.play();
            prevNextTractStateRef.current = "playing"
            } else {
            await TrackPlayer.pause();
            prevNextTractStateRef.current = "paused"
            }
        }
    }

    const shuffle = async (playBackState) => {
    }


    const repeat = async (playBackState) => {
        if (repeatMode === "repeat-off") {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode("repeat-once");
        } else if (repeatMode === "repeat-once") {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode("repeat");
        } else if (repeatMode === "repeat") {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode("repeat-off");
        }
    }

    return (
        <SafeAreaView style={styles.sav1}>
            <ScrollView contentContainerStyle={styles.scv}>
                <View style={styles.v1}>
                    <View style={styles.v2}>
                        <View style={styles.v3}>
                            <View style={styles.flatListView}>
                                <Animated.FlatList
                                    ref={songSlider}
                                    data={tracklist}
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
                                        {tracklist[songIndex].title}
                                    </RollingText>
                                </View>
                                <Text style={styles.t2}>{tracklist[songIndex].artist}</Text>
                            </View>
                            <View style={styles.v6}>
                                <View style={styles.v7}>
                                    <Slider
                                        style={styles.slider}
                                        value={progress.position}
                                        minimumValue={0}
                                        maximumValue={progress.duration}
                                        minimumTrackTintColor="black"
                                        maximumTrackTintColor="#000000"
                                        thumbTintColor="#135763"
                                        tapToSeek={true}
                                        onSlidingComplete={async(value) => await TrackPlayer.seekTo(value)}
                                    />
                                </View>
                                <View style={styles.v8}>
                                    <Text style={styles.time}>{new Date(progress.position*1000).toLocaleTimeString().substring(3)}</Text>
                                    <Text style={styles.time}>{new Date((progress.duration - progress.position) * 1000).toLocaleTimeString().substring(3)}</Text>
                                </View>
                            </View>
                            <View style={styles.v9}>
                                <TouchableOpacity onPress={() => shuffle(playBackState)}>
                                    <Ionicons name={"md-shuffle-sharp"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => prev(playBackState)}>
                                    <Ionicons name={"md-play-skip-back-circle"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => playPause(playBackState)}>
                                    <Ionicons name={playBackState === State.Playing || playBackState === State.Buffering ? "md-pause-circle" : "md-play-circle"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => next(playBackState)}>
                                    <Ionicons name={"md-play-skip-forward-circle-sharp"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => repeat(playBackState)}>
                                    <MaterialCommunityIcons name={repeatMode} size={iconSize} color={iconColor} />
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