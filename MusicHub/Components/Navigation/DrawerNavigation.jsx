import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Alert } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TabNavigation } from ".";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { toggle1 } from "../ReduxKit/ThemeSlice";
import { AsyncSet, AsyncGet, AsyncDelete } from "../AsyncStorage/AsyncStorage";
import { lightTheme, darkTheme } from "../Styles/DrawerNavigation";
import auth from '@react-native-firebase/auth';


const Drawer = createDrawerNavigator();

var On;

const DItem = ({ IconG, IconN, labelT, navigateTo }) => {
    const navigation = useNavigation();

    On = useSelector((state) => state.theme.theme);
    const styles = On ? lightTheme : darkTheme;

    return (
        <DrawerItem
            icon={({ focused, color, size }) => (
                <IconG color={"grey"} size={size} name={IconN} />
            )}
            label={() => <Text style={styles.drawerText}>{labelT}</Text>}
            onPress={() => navigation.navigate(`${navigateTo}`)}
        />
    );
}



function CustomDrawerContent(props) {
    const { navigation } = props;
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    On = theme;
    const styles = On ? lightTheme : darkTheme;

    const onToggle = async () => {
        dispatch(toggle1());
        await AsyncSet("theme", !theme);
    };

    const signOutUser = async () => {
        // dispatch(userDetailFormState(false))
        // await AsyncSet(`${USERDETAILFORMSTATE.UDFS}`, false);
        auth()
            .signOut()
            .then(() => Alert.alert('User signed out successfully!'));
    };

    return (
        <DrawerContentScrollView {...props} style={styles.drawerContScroll}>

            <View style={styles.view1}>
                <View>
                    {1 ?
                        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
                            <Image
                                source={{ uri: "https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg?cs=srgb&dl=pexels-pixabay-53435.jpg&fm=jpg" }}
                                style={styles.profileImage}
                            /></TouchableOpacity> :
                        <View style={styles.v7}>
                            <TouchableOpacity onPress={() => navigation.navigate("settings")}>
                                <MaterialCommunityIcons name="camera-plus" size={55} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    }
                    <Text style={styles.userName}> {"firstName"}</Text>
                    <Text style={styles.userNumber}> {"mobileNumber"}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.toggle1}>
                        {/* <Text style={styles.toggle2}>Change Theme</Text> */}
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={true ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => onToggle()}
                            value={theme}
                            disabled={false}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <DrawerItemList {...props} /> */}
            <DItem IconG={Ionicons} IconN={"settings"} labelT={"Settings"} navigateTo={"settings"} />
            <DrawerItem
                icon={({ focused, color, size }) => (
                    <MaterialCommunityIcons color={"grey"} size={size} name={"logout"} />
                )}
                label={() => <Text style={styles.drawerText}>{"Logout"}</Text>}
                onPress={() => {
                    try {
                        signOutUser();
                    } catch (error) {
                        Alert.alert("Something went wrong!");
                        console.log(error);
                    }
                }}
            />

        </DrawerContentScrollView>
    );
}



const DrawerNavigation = ({ navigation }) => {

    const { theme } = useSelector((state) => state.theme);
    On = theme;
    const styles = On ? lightTheme : darkTheme;

    return (
        <>
            <Drawer.Navigator
                screenOptions={{
                    drawerPosition: "left",
                    drawerType: "front",
                    headerStyle: {
                        backgroundColor: theme ? 'white' : 'black'
                    },
                    headerTintColor: theme ? "black" : "white",
                }}
                defaultStatus={"closed"}
                drawerContent={(props) => (<CustomDrawerContent {...props} />)}
            >
                <Drawer.Screen name="home" component={TabNavigation} options={{
                    headerTitle: "MusicHub",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("search")}>
                            <FontAwesome5 name="search" size={22} color={On ? "black" : "white"} marginRight={15} />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        elevation: 20,
                        shadowColor: "black",
                    }
                }} />
            </Drawer.Navigator>
        </>
    );
}

export default DrawerNavigation;