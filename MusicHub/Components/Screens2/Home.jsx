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
            url: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg',
            title: 'Ice Age2',
            artist: 'deadmau2',
            title: 'song2 slj akjd sldj komds o ads asldjpk kjdsfkjdsjfoksdj koasodj',
            artwork: "https://i.ytimg.com/vi/GLGuLXKT9Ng/maxresdefault.jpg",
            duration: 500
        },
        {
            id: 3,
            url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            title: 'song3 sdf adslk  jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
            artist: 'deadmau3',
            artwork: "https://static.toiimg.com/thumb/msid-96416857,width-1280,resizemode-4/96416857.jpg",
            duration: 514
        },
        {
            id: 4,
            url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            title: 'song2 slj akjd sldj komds o ads asldjpk kjdsfkjdsjfoksdj koasodj',
            artist: 'deadmau4',
            artwork: "https://i.ytimg.com/vi/GLGuLXKT9Ng/maxresdefault.jpg",
            duration: 333
        },

    ]

    const scrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef(null);


    // useTrackPlayerEvents([Event.PlaybackTrackChanged], async event=>{
    //     if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
    //         const track = await TrackPlayer.getTrack(event.nextTrack);
    //         const { title, artwork, artist } = track;
    //     }
    // })

    const skipTo = async(trackId) => {
        await TrackPlayer.skip(trackId);
    }

    useEffect(() => {
        setUpPlayer(ar);
        scrollX.addListener(({ value }) => {
            const index = Math.round(value / width);
            skipTo(index);
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


    const iconSize = 50;
    const iconColor = "black";


    const prev = async (playBackState) => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width * 0.9,
        });
    }

    const next = async (playBackState) => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width * 0.9,
        });
    }

    console.log(playBackState);

    const playPause = async(playBackState) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
        if (playBackState === State.Paused || playBackState ===  State.Ready) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }

    const shuffle = async (playBackState) => {
    }

    const repeat = async (playBackState) => {
    }

    console.log(progress);

    return (
        <SafeAreaView style={styles.sav1}>
            <ScrollView contentContainerStyle={styles.scv}>
                <View style={styles.v1}>
                    <View style={styles.v2}>
                        <View style={styles.v3}>
                            <View style={styles.flatListView}>
                                <Animated.FlatList
                                    ref={songSlider}
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
                                        value={progress.position}
                                        minimumValue={0}
                                        maximumValue={progress.duration}
                                        minimumTrackTintColor="black"
                                        maximumTrackTintColor="#000000"
                                        thumbTintColor="#135763"
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
                                    <Ionicons name={playBackState === State.Paused || playBackState === State.Ready? "md-play-circle" : "md-pause-circle"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => next(playBackState)}>
                                    <Ionicons name={"md-play-skip-forward-circle-sharp"} size={iconSize} color={iconColor} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => repeat(playBackState)}>
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