import React, { useEffect } from 'react';
import { Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Account, SingleAudio, OnlineSongList, OnlineSingleSongPlayer, Search } from "../Screens2";
import { DrawerNavigation} from '../Navigation';
import { useSelector } from "react-redux";
import { requestStoragePermission, trackFormattedAudioFiles, setUpPlayer } from "../HelperFunctions";
import { sendAudio } from "../ReduxKit/LocalAudioSlice";
import { useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

const NativeStack2 = () => {
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            await requestStoragePermission(grantedPerms, deniedPerms);
        })();
    });

    const grantedPerms = async () => {
        try {
            const audioFiles = await trackFormattedAudioFiles();
            dispatch(sendAudio(audioFiles));
            await setUpPlayer();
        } catch (error) {
            console.log("error in grantedPerms :", error);
        }
    }

    const deniedPerms = async () => {
        dispatch(sendAudio("Permissions denied"));
        Alert.alert("Permission denied");
    }

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme ? 'white' : 'black'
                    },
                    headerTintColor: theme ? "black" : "white",
                }}
            >
                <Stack.Screen name="stackHome" component={DrawerNavigation} options={{ headerShown: false, }} />
                <Stack.Screen name="account" component={Account} options={{ title: 'Account' }} />
                <Stack.Screen name="singleaudio" component={SingleAudio} />
                <Stack.Screen name="onlinesonglist" component={OnlineSongList} />
                <Stack.Screen name="onlinesinglesongplayer" component={OnlineSingleSongPlayer} />
                <Stack.Screen name="search" component={ Search} />
            </Stack.Navigator>
        </>
    )
}

export default NativeStack2;
