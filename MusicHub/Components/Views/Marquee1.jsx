import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

const Marquee1 = ({ text, width, duration }) => {
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: -width,
                duration,
                useNativeDriver: true,
            })
        ).start();
    }, [translateX, width, duration]);

    return (
        <Animated.Text style={{ transform: [{ translateX }], color:"black" }}>
            {text}
        </Animated.Text>
    );
};

export default Marquee1;
