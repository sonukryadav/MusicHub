import React, { useEffect } from 'react';
import { Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    Account, SingleAudio, OnlineSongList, OnlineSingleSongPlayer, Search, UserDetailForm,
    ContinueWithEmailAndPassword,
    ContinueWithGoogle,
    ContinueWithPhone,
    SignIn,
    SignUp,
    SignInForCreate,
} from "../Screens2";
import { DrawerNavigation} from '../Navigation';
import { useSelector } from "react-redux";
import { requestStoragePermission, trackFormattedAudioFiles, setUpPlayer } from "../HelperFunctions";
import { sendAudio } from "../ReduxKit/LocalAudioSlice";
import { useDispatch } from "react-redux";
import Toast from 'react-native-toast-message';
import { Toast1 } from "../Views";

const Stack = createNativeStackNavigator();

const NativeStack2 = () => {
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            await requestStoragePermission(grantedPerms, deniedPerms);
        })();
    },[]);

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
        Toast.show({
            type: 'info',
            text1: 'Permission denied'
        });
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
                <Stack.Screen name="account" component={Account} options={{ title: 'User info' }} />
                <Stack.Screen name="singleaudio" component={SingleAudio} options={() => ({ headerShown: true, headerTitle: "Offline audio" })} />
                <Stack.Screen name="onlinesonglist" component={OnlineSongList} options={() => ({ headerShown: true, headerTitle: "Songs" })} />
                <Stack.Screen name="onlinesinglesongplayer" component={OnlineSingleSongPlayer} />
                <Stack.Screen name="search" component={Search} options={() => ({ headerShown: true, headerTitle: "Search" })} />
                <Stack.Screen name="userdetailform" component={UserDetailForm} options={() => ({ headerShown: true, headerTitle: "User detail form" })}
                />

                <Stack.Screen
                    name="signup"
                    component={SignUp}
                    options={() => ({ headerShown: false })}
                />
                <Stack.Screen
                    name="signin"
                    component={SignIn}
                    options={() => ({ headerShown: true, headerTitle: "Sign in" })}
                />
                <Stack.Screen
                    name="withgoogle"
                    component={ContinueWithGoogle}
                    options={() => ({ headerShown: true, headerTitle: "Continue with Google" })}
                />
                <Stack.Screen
                    name="withphone"
                    component={ContinueWithPhone}
                    options={() => ({ headerShown: true, headerTitle: "Continue with phone number" })}
                />
                <Stack.Screen
                    name="withemailpassword"
                    component={ContinueWithEmailAndPassword}
                    options={() => ({ headerShown: true, headerTitle: "Sign up with email & password" })}
                />
                <Stack.Screen
                    name="signinforcreate"
                    component={SignInForCreate}
                    options={() => ({ headerShown: true, headerTitle: "New user Sign in" })}
                />
            </Stack.Navigator>
            <Toast1/>
        </>
    )
}

export default NativeStack2;
