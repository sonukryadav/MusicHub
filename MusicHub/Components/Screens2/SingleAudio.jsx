import { View, Text, SafeAreaView, Image, Animated, Alert, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import styles from '../Styles/SingleAudio';
import RollingText from "react-native-rolling-text";
import Slider from '@react-native-community/slider';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Loading1 } from '../Views';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { requestStoragePermission, trackFormattedAudioFiles } from "../HelperFunctions";
import img1 from "../Assets/MusicHub-logo.png";
import { useSelector } from "react-redux";

// url, title, artist
const { width } = Dimensions.get("window");

export default function SingleAudio({route}) {
    const [files, setFiles] = useState([]);
    const [songIndex, setSongIndex] = useState(0);
    const playBackState = usePlaybackState();
    const progress = useProgress();
    const prevNextTractStateRef = useRef("ready");
    const [repeatMode, setRepeatMode] = useState("repeat-off");

    const scrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef(null);

    const { localAudios } = useSelector((state) => state.localAudio);

    const { title, url, index1 } = route.params;
    console.log(title, url, index1);

    const iconSize = 50;
    const iconColor = "black";

    const skipTo = async (trackId) => {
        await TrackPlayer.skip(trackId);
    }


    const jumping = async () => {
        console.log("jumping index1 :---- ", index1);
        try {
            if (index1) {
                console.log("jumping index :---- ", index1);
                setSongIndex(pre => index1);
                skipTo(index1);
                songSlider.current.scrollToOffset({
                    offset: (index1 - 1) * width * 0.9,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log("songIndex : ---------- ", songIndex);

    const setAudioFiles = async () => {
        setFiles(pre=>localAudios);
    }


    useEffect(() => {
        (async () => {
            await setAudioFiles();
            scrollX.addListener(({ value }) => {
                const index = Math.round(value / width);
                skipTo(index1);
                setSongIndex(index1);
            });
            // jumping();
        })();
    }, [index1]);

    // const valuePosition = Math.floor(progress.position);
    // useEffect(() => {
    //     if ((valuePosition + 1) === Math.floor(progress.duration) && repeatMode !== "repeat-once") {
    //         songSlider.current.scrollToOffset({
    //             offset: (songIndex + 1) * width * 0.9,
    //         });
    //         setTimeout(async () => {
    //             if (prevNextTractStateRef.current == State.Playing) {
    //                 await TrackPlayer.play();
    //             } else if (prevNextTractStateRef.current === State.Paused) {
    //                 await TrackPlayer.pause();
    //             }
    //         }, 500);
    //     }
    // });


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
                <Image source={img1} resizeMode='contain' style={styles.img1} />
            </View>
        );
    }

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
        // skipTo(songIndex + 1);
        // setSongIndex(pre=>pre+1)
        setTimeout(async () => {
            if (prevNextTractStateRef.current == State.Playing) {
                await TrackPlayer.play();
            } else if (prevNextTractStateRef.current === State.Paused) {
                await TrackPlayer.pause();
            }
        }, 500);
    }

    const playPause = async (playBackState) => {
        const trackIndex = await TrackPlayer.getCurrentTrack();
        if (trackIndex !== null) {
            if (playBackState === State.Paused || playBackState === State.Ready) {
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

    console.log(playBackState);

    return (
        <SafeAreaView style={styles.sav1}>
            <ScrollView contentContainerStyle={styles.scv}>
                <View style={styles.v1}>
                    <View style={styles.v2}>
                        <View style={styles.v3}>
                            <View style={styles.flatListView}>
                                <Animated.FlatList
                                    ref={songSlider}
                                    data={files}
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
                                                    contentOffset: { x: scrollX }
                                                },
                                            },
                                        ],
                                        {
                                            useNativeDriver: true,
                                        }
                                    )}
                                />
                            </View>
                            <View style={styles.v5}>
                                <View style={{ width: "100%", overflow: 'hidden' }}>
                                    <RollingText style={styles.t1}>
                                        {files[songIndex].title}
                                    </RollingText>
                                </View>
                                <Text style={styles.t2}>{files[songIndex].artist}</Text>
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
                                        onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
                                    />
                                </View>
                                <View style={styles.v8}>
                                    <Text style={styles.time}>{new Date(progress.position * 1000).toLocaleTimeString().substring(3)}</Text>
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

