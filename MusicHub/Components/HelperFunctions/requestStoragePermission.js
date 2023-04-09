import { PermissionsAndroid } from "react-native";

const requestStoragePermission = async (grantedPerms, deniedPerms) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'MusicHub Storage Permission',
                message:
                    'MusicHub App needs access to your storage ' +
                    'to display all audio files.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            grantedPerms();
        } else {
            // console.log('storage permission denied');
            deniedPerms();
        }
    } catch (err) {
        console.warn(err);
    }
};

export default requestStoragePermission;