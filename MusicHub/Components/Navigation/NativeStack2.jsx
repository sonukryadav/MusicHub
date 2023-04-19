import React, { useEffect } from 'react';
import { Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewGroup, Calls, PeopleNearby, SavedMessages, Settings, InviteFriends, TalktimeFeatures, Contacts, Account, Camera, Search, SingleAudio, OnlineSongList, OnlineSingleSongPlayer } from "../Screens2"
import { DrawerNavigation } from '../Navigation';
import { useSelector } from "react-redux";
import { requestStoragePermission, trackFormattedAudioFiles } from "../HelperFunctions";
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
        } catch (error) {
            console.log("error in grantedPerms -----", error);
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
                <Stack.Screen name="newGroup" component={NewGroup} options={{ title: "New Group" }} />
                <Stack.Screen name="contacts" component={Contacts} options={{ title: 'Contacts' }} />
                <Stack.Screen name="calls" component={Calls} options={{ title: 'Calls' }} />
                <Stack.Screen name="peopleNearby" component={PeopleNearby} options={{ title: 'People Nearby' }} />
                <Stack.Screen name="savedMessages" component={SavedMessages} options={{ title: 'Saved Messages' }} />
                <Stack.Screen name="settings" component={Settings} options={{ title: 'Settings' }} />
                <Stack.Screen name="inviteFriends" component={InviteFriends} options={{ title: 'Invite Friends' }} />
                <Stack.Screen name="talktimeFeatures" component={TalktimeFeatures} options={{ title: 'Talktime Features' }} />
                <Stack.Screen name="account" component={Account} options={{ title: 'Profile' }} />
                <Stack.Screen name="search" component={Search} options={{ title: 'Search' }} />
                <Stack.Screen name="camera" component={Camera} options={{ title: "Camera" }} />
                <Stack.Screen name="singleaudio" component={SingleAudio} />
                <Stack.Screen name="onlinesonglist" component={OnlineSongList} />
                <Stack.Screen name="onlinesinglesongplayer" component={OnlineSingleSongPlayer} />
            </Stack.Navigator>
        </>
    )
}

export default NativeStack2;
