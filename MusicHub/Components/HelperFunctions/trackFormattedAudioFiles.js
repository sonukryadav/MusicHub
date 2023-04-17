import RNFS from 'react-native-fs';
import searchAllAudioFiles from './searchAllAudioFiles';



const trackFormattedAudioFiles = async () => {
    try {
        const audioFiles = await searchAllAudioFiles(RNFS.ExternalStorageDirectoryPath);
        let newArray = [];
        audioFiles.forEach(async(element, index) => {
            newArray.push(
                {
                    "id": index,
                    "url": element.path,
                    "title": element.name,
                    "artist": "",
                    "artwork": "artwork",
                    "duration": element.size,
                }
            );
        });
        return newArray;
    } catch (error) {
        console.log(error);
    }
}
export default trackFormattedAudioFiles;