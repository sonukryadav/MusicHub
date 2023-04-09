import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react';
import styles from "../Styles/Loading1"

export default function Loading1() {
    return (
        <View style={styles.loadV1}>
            <ActivityIndicator size={60} color={"#000000"} />
            <Text style={styles.loadT1}>{"Loading..."}</Text>
        </View>
    )
}


/*
To use take a view and give style as:
    loadV1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
*/