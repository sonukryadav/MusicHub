import { Alert, View, Text, SafeAreaView, ScrollView, TouchableOpacity, PermissionsAndroid, PanResponder, Platform, Image, FlatList, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useRef } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../Styles/SlideUpView";

export default function SlideUpView({ visible, setVisible, slideHeight, children }){
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return gestureState.dy > 5 || gestureState.dy < -5;
            },
            onPanResponderGrant: () => {
                slideAnimation.stopAnimation();
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy < 0) {
                    slideAnimation.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dy < -100) {
                    slideDown();
                } else {
                    slideUp();
                }
            },
        })
    ).current;

    const slideUp = () => {
        Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setVisible(false));
    };

    const slideDown = () => {
        Animated.timing(slideAnimation, {
            toValue: -slideHeight,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const close = () => {
        setVisible(pre => !pre)
    }


    return (
        <View style={styles.v1}>
            {visible && (
                <View
                    style={[styles.v2, { height: slideHeight}]}
                    {...panResponder.panHandlers}
                >
                    <Animated.View
                        style={[styles.v3,{
                            transform: [{ translateY: slideAnimation }],
                            height: slideHeight,
                        }]}
                    >
                        <View style={styles.v4}>
                            <TouchableOpacity onPress={close}>
                                <Ionicons name={"close-circle"} size={50} color={"black"} />
                            </TouchableOpacity>
                        </View>
                        {children}
                    </Animated.View>
                </View>
            )}
        </View>
    );
};