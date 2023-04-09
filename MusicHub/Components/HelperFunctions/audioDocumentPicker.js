import DocumentPicker from 'react-native-document-picker';

const audioDocumentPicker = async () => {
    try {
        const pickedFiles = await DocumentPicker.pickMultiple({
            type: [DocumentPicker.types.audio],
        });
        return pickedFiles;
    }
    catch (err) {
        console.log("No file selected.");
    }
}

export default audioDocumentPicker;