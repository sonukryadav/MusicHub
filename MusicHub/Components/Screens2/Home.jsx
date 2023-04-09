import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, PermissionsAndroid, Platform, Image, FlatList, Animated, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import styles from '../Styles/Home';
import RNFS from 'react-native-fs';
import Fontisto from "react-native-vector-icons/Fontisto";
import { Loading1 } from '../Views';
import { requestStoragePermission, searchAllAudioFiles } from "../HelperFunctions";

export default function Home() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        requestStoragePermission(grantedPerms, deniedPerms);
    }, []);


    const grantedPerms = async () => {
        const audioFiles = await searchAllAudioFiles(RNFS.ExternalStorageDirectoryPath);
        setFiles(audioFiles);
    }

    const deniedPerms = async() => {
        Alert.alert("Permission denied");
    }

    if (files.length === 0) {
        return (
            <View style={styles.loadV1}>
                <Loading1 />
            </View>
        );
    }


    return (
        <SafeAreaView style={styles.sav}>
            <View style={styles.v1}>
                    <FlatList
                        data={files}
                        renderItem={({item , index}) => {
                            return (
                                <View style={styles.v2}>
                                    <View>
                                        <TouchableOpacity>
                                            <View style={styles.v3}>
                                                <View style={styles.v4}>
                                                    <Fontisto name={"applemusic"} size={60} color={"black"} />
                                                </View>
                                                <View style={styles.v5}>
                                                    <Text style={styles.t1}>{item.name.length > 40 ? item.name.substring(0, 40) +"..." : item.name}</Text>
                                                    <Text style={styles.t2}>{"Artist name"}</Text>
                                                    <Text style={styles.t3}>{"2:15"}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <TouchableOpacity>
                                            <View style={styles.v6}>
                                                <Fontisto name={"more-v-a"} size={18} color={"black"} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                    />
            </View>
            <SlideUpView buttonText="Show Slide Up" slideHeight={200}>
                <View style={{ padding: 20 }}>
                    <Text style={{color:"red", fontSize:25, textAlign:"center"}}>This is the sliding view content.</Text>
                </View>
            </SlideUpView>
        </SafeAreaView>
    );
}


const SlideUpView = ({ buttonText, slideHeight, children }) => {
    const [visible, setVisible] = useState(false);
    const slideAnimation = useRef(new Animated.Value(0)).current;

    const toggleVisible = () => {
        setVisible(!visible);
    };

    const slideUp = () => {
        Animated.timing(slideAnimation, {
            toValue: slideHeight,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    return (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <TouchableWithoutFeedback onPress={toggleVisible}>
                <View
                    style={{
                        backgroundColor: 'blue',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                    }}
                >
                    <Text style={{ color: 'white' }}>{buttonText}</Text>
                </View>
            </TouchableWithoutFeedback>
            {visible && (
                <TouchableWithoutFeedback onPress={toggleVisible}>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 50,
                            left: 0,
                            right: 0,
                            height: slideHeight,
                            backgroundColor: 'white',
                            borderTopWidth: 1,
                            borderColor: 'gray',
                        }}
                    >
                        <Animated.View
                            style={{
                                transform: [{ translateY: slideAnimation }],
                                height: slideHeight,
                            }}
                        >
                            {children}
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};