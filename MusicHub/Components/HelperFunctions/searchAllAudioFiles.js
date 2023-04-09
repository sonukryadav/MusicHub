import RNFS from 'react-native-fs';

const searchAllAudioFiles = async (dirPath) => {
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
            const audioFilesInDirectory = await searchAllAudioFiles(directory.path);
            audioFiles.push(...audioFilesInDirectory);
        }
        return audioFiles;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default searchAllAudioFiles;