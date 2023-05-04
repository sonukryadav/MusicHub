import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import stylesT from "../Styles/PermissionDenied";
import { useNavigation } from "@react-navigation/native";
import { requestStoragePermission, trackFormattedAudioFiles, setUpPlayer } from "../HelperFunctions";
import { useDispatch } from "react-redux";
import { sendAudio } from "../ReduxKit/LocalAudioSlice";
import Toast from 'react-native-toast-message';
import { Toast1 } from "../Views";


const PermissionDenied = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);
    const styles = stylesT(theme);


    const grantedPerms = async () => {
        try {
            const audioFiles = await trackFormattedAudioFiles();
            dispatch(sendAudio(audioFiles));
            await setUpPlayer();
            navigation.reset({
                index: 0,
                routes: [{ name: "home" }],
            })
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
        navigation.reset({
            index: 0,
            routes: [{ name: "denied" }],
        })
    }


    const allow = async () => {
        await requestStoragePermission(grantedPerms, deniedPerms);
    }


    return (
        <>
            <SafeAreaView style={styles.sav}>
                <ScrollView contentContainerStyle={styles.scr}>
                    <View>
                        <TouchableOpacity onPress={() => allow()}>
                            <Text style={styles.t1}>Grant permission</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Toast1/>
            </SafeAreaView>
        </>
    );
}

export default PermissionDenied;
