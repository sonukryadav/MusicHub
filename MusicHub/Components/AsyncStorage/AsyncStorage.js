import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncSet = async (key, value) => {
    try {
        let Key = JSON.stringify(key);
        let Value = JSON.stringify(value);
        await AsyncStorage.setItem(Key, Value);
        console.log(`Stored ${key} successfully`);
    } catch (err) {
        console.log("Error in AsyncSet function : " + err);
    }
}

const AsyncGet = async (key) => {
    try {
        let Key = JSON.stringify(key);
        let data1 = await AsyncStorage.getItem(Key);
        let data = JSON.parse(data1);
        console.log(`Retrieved ${key} successfully`);
        return data;
    } catch (err) {
        console.log("Error in AsyncGet function : " + err);
    }
}

const AsyncDelete = async (key) => {
    try {
        let Key = JSON.stringify(key);
        await AsyncStorage.removeItem(Key);
        console.log(`Removed ${key} successfully`);
    } catch (err) {
        console.log("Error in AsyncDelete function : " + err);
    }
}


export { AsyncSet, AsyncGet, AsyncDelete };