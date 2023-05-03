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
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import { Toast1} from "../Views";


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
    const [detail, setDetail] = useState({});
    const { navigation } = props;
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();


    React.useEffect(() => {
        (async () => {
            const user = auth().currentUser;
            const user1 = await firestore().collection('users').doc(user.uid).get();
            setDetail(user1?._data);
        })();
    });


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
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'User signed out successfully.'
                });
                setDetail({})
                navigation.navigate("signup");
                return;
            }
            );
    };

    return (
        <DrawerContentScrollView {...props} style={styles.drawerContScroll}>

            <View style={styles.view1}>
                <View>
                    {detail ?
                        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
                            <Image
                                source={{ uri: detail.photoURL || `https://firebasestorage.googleapis.com/v0/b/musichub2.appspot.com/o/MusicHub%2FMusicHub-logo.png?alt=media&token=c259d378-41f1-4618-b1da-4d56b498c02a` }}
                                style={styles.profileImage}
                            /></TouchableOpacity> :
                        <View style={styles.v7}>
                            <TouchableOpacity onPress={() => navigation.navigate("account")}>
                                <MaterialCommunityIcons name="camera-plus" size={55} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    }
                    <Text style={styles.userName}> {detail? detail.inputedName : "No name" }</Text>
                    <Text style={styles.userNumber}> {detail ? detail.inputedEmail : "No email"}</Text>
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
            <DItem IconG={Ionicons} IconN={"md-person-circle"} labelT={"Account"} navigateTo={"Account"} />
            <DItem IconG={Ionicons} IconN={"md-search"} labelT={"Search"} navigateTo={"Search"} />
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
            <Toast1 />
        </>
    );
}

export default DrawerNavigation;