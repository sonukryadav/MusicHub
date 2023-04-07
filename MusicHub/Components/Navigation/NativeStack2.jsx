import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';

export default function NativeStack2() {

    const logout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }
    return (
        <View>
            <Text>NativeStack2</Text>
            <TouchableOpacity onPress={logout}>
                <Text style={{fontSize:20, padding:50, backgroundColor:"teal"}}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}