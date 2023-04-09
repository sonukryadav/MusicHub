import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, PermissionsAndroid, Platform, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Styles/Home';
import RNFS from 'react-native-fs';
import Fontisto from "react-native-vector-icons/Fontisto";
import { Loading1 } from '../Views';

export default function Home() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        requestStoragePermission();
    }, []);

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'MusicHub Storage Permission',
                    message:
                        'MusicHub App needs access to your storage ' +
                        'so you can listen songs.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getFiles();
            } else {
                console.log('storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const searchForAudioFiles = async (dirPath) => {
        try {
            const files = await RNFS.readDir(dirPath);
            const audioFiles = files.filter((file) => {
                return file.isFile() && (
                    file.name.endsWith('.mp3') ||
                    file.name.endsWith('.m4a') ||
                    file.name.endsWith('.wav') ||
                    file.name.endsWith('.ogg')
                    // add more audio file extensions here
                );
            });
            const directories = files.filter((file) => file.isDirectory());
            for (const directory of directories) {
                const audioFilesInDirectory = await searchForAudioFiles(directory.path);
                audioFiles.push(...audioFilesInDirectory);
            }
            return audioFiles;
        } catch (error) {
            console.log(error);
            return [];
        }
    };


    const getFiles = async () => {
        const rootDirectory = RNFS.ExternalStorageDirectoryPath;
        const audioFiles = await searchForAudioFiles(rootDirectory);
        setFiles(audioFiles);
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
                                    <TouchableOpacity>
                                        <View style={styles.v3}>
                                            <View style={styles.v4}>
                                                <Fontisto name={"applemusic"} size={60} color={"black"} />
                                            </View>
                                            <View style={styles.v5}>
                                                <Text style={styles.t1}>{item.name}</Text>
                                                <Text style={styles.t2}>{"Artist name"}</Text>
                                                <Text style={styles.t3}>{"2:15"}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={styles.v6}>
                                            <Fontisto name={"more-v-a"} size={18} color={"black"} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
        </SafeAreaView>
    );
}

//----------react-native-fs-----------
//----------react-native-fs-----------