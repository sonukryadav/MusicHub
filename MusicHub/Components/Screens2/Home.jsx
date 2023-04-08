import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import styles from '../Styles/Home';

export default function Home() {
    return (
        <SafeAreaView style={styles.sav}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.v1}>
                    <Text style={styles.t1}>
                        { "HOME" }
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}