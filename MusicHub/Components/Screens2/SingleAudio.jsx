import { View, Text, SafeAreaView, Image, Animated, Alert, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import TrackPlayer, { RepeatMode, State, usePlaybackState, useProgress } from 'react-native-track-player';
import styles from '../Styles/SingleAudio';
import RollingText from "react-native-rolling-text";
import Slider from '@react-native-community/slider';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Loading1 } from '../Views';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import img1 from "../Assets/MusicHub-logo.png";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

export default function SingleAudio({route}) {
    const [files, setFiles] = useState([]);
    const [songIndex, setSongIndex] = useState(route.params.index1);
    const ref = useRef(route.params.index1);
    const playBackState = usePlaybackState();
    const progress = useProgress();
    const [repeatMode, setRepeatMode] = useState("repeat-off");
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackID, setTrackID] = useState(route.params.index1);
    const [shuffleI, setShuffleI] = useState(false);

    const { localAudios } = useSelector((state) => state.localAudio);
    const { title, url, index1 } = route.params;

    console.log(title, url, index1);

    const iconSize = 50;
    const iconColor = "black";

    const setAudioFiles = async () => {
        setFiles(pre=>localAudios);
    }

    useEffect(() => {
        (async () => {
            await setAudioFiles();
            setTimeout(() => {
                ref.current.scrollToIndex({
                    animated: true,
                    index: index1,
                });
            }, 1000)
        })();
    }, []);


    useEffect(() => {
        (async() => {
            const trackId = await TrackPlayer.getCurrentTrack();
            if (trackID !== trackId) {
                setTrackID(pre => trackId);
                setSongIndex(pre => trackId);
            }
        })();
    })

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

    const playPause = async (playBackState) => {
        if (isPlaying) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
        setIsPlaying(!isPlaying);
    }

    const prev = async (playBackState) => {
        if (songIndex > 0) {
            setSongIndex(pre => pre - 1);
            ref.current.scrollToIndex({
                animated: true,
                index: songIndex - 1,
            });
            await TrackPlayer.skip(songIndex - 1);
            playPause(playBackState);
        }
    }


    const next = async (playBackState) => {
        if (files.length-1 > songIndex) {
            setSongIndex(pre => pre + 1);
            ref.current.scrollToIndex({
                animated: true,
                index: songIndex + 1,
            });
            await TrackPlayer.skip(songIndex + 1);
            playPause(playBackState);
        }
    }



    const shuffle = async (playBackState) => {
        setShuffleI(pre=>!pre);
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

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.ceil(secs - minutes * 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <SafeAreaView style={styles.sav1}>
            <ScrollView contentContainerStyle={styles.scv}>
                <View style={styles.v1}>
                    <View style={styles.v2}>
                        <View style={styles.v3}>
                            <View style={styles.flatListView}>
                                <FlatList
                                    ref={ref}
                                    data={files}
                                    horizontal
                                    renderItem={({ item }) => (singleSong(item))}
                                    keyExtractor={(item, index) => index.toString()}
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    onScroll={async e => {
                                        const x = e.nativeEvent.contentOffset.x / width;
                                        setSongIndex(parseInt(x.toFixed(0)));
                                        await TrackPlayer.skip(parseInt(x.toFixed(0)));
                                        playPause(playBackState);
                                    }}
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
                                        onValueChange={async value => {
                                            await TrackPlayer.seekTo(value);
                                        }}
                                    />
                                </View>
                                <View style={styles.v8}>
                                    <Text style={styles.time}>{formatTime(progress.position)}</Text>
                                    <Text style={styles.time}>{(formatTime(progress.duration))}</Text>
                                </View>
                            </View>
                            <View style={styles.v9}>
                                <TouchableOpacity onPress={() => shuffle(playBackState)}>
                                    <MaterialCommunityIcons name={shuffleI ? "shuffle-variant" : "shuffle"} size={iconSize} color={iconColor} />
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

