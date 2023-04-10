import { View, Text, SafeAreaView, Image, Animated, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../Styles/Home';
import RollingText from "react-native-rolling-text";
import Slider from '@react-native-community/slider';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Home() {

    const fun = () => {
        Alert.alert("Icon");
    }
    return (
        <SafeAreaView style={styles.sav1}>
            <View style={styles.v1}>
                <View style={styles.v2}>
                    <View style={styles.v3}>
                        <View style={styles.v4}>
                            <Image source={{ uri: "https://static.toiimg.com/photo/98658252/size-133239/98658252.jpg" }} style={styles.img1} />
                        </View>
                        <View style={styles.v5}>
                            <View style={{ width: "100%", overflow: 'hidden' }}>
                                <RollingText style={styles.t1}>
                                    {"Enter your Looooooooooo  k khj h d ds"}
                                </RollingText>
                            </View>
                            <Text style={styles.t2}>{"Singer name"}</Text>
                        </View>
                        <View style={styles.v6}>
                            <View style={styles.v7}>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor="black"
                                    maximumTrackTintColor="#000000"
                                    thumbTintColor="#135763"
                                />
                            </View>
                            <View style={styles.v8}>
                                <Text style={styles.time}>{"00.00"}</Text>
                                <Text style={styles.time}>{"05.30"}</Text>
                            </View>
                        </View>
                        <View style={styles.v9}>
                            <Icon1 name={"md-shuffle-sharp"} fun={fun} />
                            <Icon1 name={"md-play-skip-back-circle"} fun={fun} />
                            <Icon1 name={true ? "md-play-circle" : "md-pause-circle"} fun={fun} />
                            <Icon1 name={"md-play-skip-forward-circle-sharp"} fun={fun} />
                            <Icon2 name={true ? "repeat" : "repeat-one"} fun={fun} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}


const Icon1 = ({name, fun}) => {
    return (
        <TouchableOpacity onPress={fun}>
            <Ionicons name={name} size={50} color={"black"} />
        </TouchableOpacity>
    );
}

const Icon2 = ({ name, fun }) => {
    return (
        <TouchableOpacity onPress={fun}>
            <MaterialIcons name={name} size={50} color={"black"} />
        </TouchableOpacity>
    );
}