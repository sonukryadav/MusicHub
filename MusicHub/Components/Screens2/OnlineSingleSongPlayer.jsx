import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState} from 'react';
import styles from '../Styles/OnlineSingleSongPlayer';
import { useRoute } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { setUpPlayer } from "../HelperFunctions";
import { useSelector } from "react-redux";
import TrackPlayer, { RepeatMode, State, usePlaybackState, useProgress } from 'react-native-track-player';
import Ionicons from "react-native-vector-icons/Ionicons";



export default function OnlineSingleSongPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const progress = useProgress();
    const route = useRoute();
    const playBackState = usePlaybackState();
    const { songDetail } = route.params;

    console.log(songDetail);

    useEffect(() => {
        (async() => {
            const obj = {
                url: songDetail.songUrl,
                title: songDetail.songName,
                artist: songDetail.artists,
            }
            await setUpPlayer([obj]);
        })();
    }, []);

    const playPause = async (playBackState) => {
        if (isPlaying) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
        setIsPlaying(!isPlaying);
        TrackPlayer.setRepeatMode(RepeatMode.Track);
    }

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.ceil(secs - minutes * 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };



    return (
        <SafeAreaView style={styles.sav}>
            <ScrollView contentContainerStyle={styles.scrollV}>
                <View style={styles.v1}>
                    <Image source={{ uri: songDetail.posterUrl }} resizeMode='contain' style={styles.img1} />
                </View>
                <View style={styles.v2}>
                    <Text style={styles.t1}>{songDetail.songName}</Text>
                </View>
                <View style={styles.v1i}>
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
                <View style={styles.v1ii}>
                    <Text style={styles.time}>{formatTime(progress.position)}</Text>
                    <Text style={styles.time}>{(formatTime(progress.duration))}</Text>
                </View>
                <View style={styles.v3}>
                    <Text style={styles.t2}>{"Title/album"}</Text>
                    <Text style={styles.t3}>{songDetail["album/movie"]}</Text>
                </View>
                <View style={styles.v3}>
                    <Text style={styles.t2}>{"Artists"}</Text>
                    <Text style={styles.t3}>{songDetail.artists}</Text>
                </View>
                <View style={styles.v3}>
                    <Text style={styles.t2}>{"File type"}</Text>
                    <Text style={styles.t3}>{songDetail.fileType}</Text>
                </View>
                <View style={styles.v4}>
                    <TouchableOpacity onPress={() => playPause(playBackState)}>
                        <Ionicons name={playBackState === State.Playing || playBackState === State.Buffering ? "md-pause-circle" : "md-play-circle"} size={90} color={"black"} />
                        <Text style={styles.t4}>{playBackState === State.Playing || playBackState === State.Buffering ? "Tap to pause" : "Tap to play"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}





// OnlineSingleSongPlayer