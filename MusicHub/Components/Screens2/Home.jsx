import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, PermissionsAndroid, Platform, Image, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Styles/Home';
import RNFS from 'react-native-fs';

export default function Home() {
    const [folders, setFolders] = useState([]);

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
        setFolders(audioFiles);
    }


    return (
        <SafeAreaView style={styles.sav}>
                <View style={styles.v1}>
                    <FlatList
                        data={folders}
                        renderItem={({item , index}) => {
                            return (
                                <TouchableOpacity onPress={()=>console.log(item)}>
                                    <Text style={styles.t1}>{item.name}</Text>
                                </TouchableOpacity>);
                        }}
                    />
                </View>
        </SafeAreaView>
    );
}

//----------react-native-fs-----------
//----------react-native-fs-----------