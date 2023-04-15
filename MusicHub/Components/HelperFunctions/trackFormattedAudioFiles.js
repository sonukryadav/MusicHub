import RNFS from 'react-native-fs';
import searchAllAudioFiles from './searchAllAudioFiles';

const trackFormattedAudioFiles = async()=> {
        const audioFiles = await searchAllAudioFiles(RNFS.ExternalStorageDirectoryPath);
        let newArray = [];
        audioFiles.forEach((element, index) => {
            newArray.push(
                {
                    "id": index + 1,
                    "url": element.path,
                    "title": element.name,
                    "artist": "Artist",
                    "artwork": "https://static.vecteezy.com/system/resources/thumbnails/004/773/831/small/one-tree-in-the-meadow-love-nature-love-trees-3d-free-photo.jpg",
                    "duration": 100
                }
            );
        });
    return newArray;
}

export default trackFormattedAudioFiles;