import { View, Text } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
    const dataX = useSelector((state) => state.createUserFirebaseAtSignInSlice);
    const dispatch = useDispatch();
  // console.log(dataX);
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}