import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NewGroup, Calls, PeopleNearby, SavedMessages, Settings, InviteFriends, TalktimeFeatures, Contacts, Account, Camera, Search } from "../Screens2"
import { DrawerNavigation } from '../Navigation';
import { useSelector } from "react-redux";


const Stack = createNativeStackNavigator();

const NativeStack2 = () => {
    const { theme } = useSelector((state) => state.theme);
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme ? 'white' : 'black'
                    },
                    headerTintColor: theme ? "black" : "white",
                }}
            >
                <Stack.Screen name="stackHome" component={DrawerNavigation} options={{ headerShown: false, }} />
                <Stack.Screen name="newGroup" component={NewGroup} options={{ title: "New Group" }} />
                <Stack.Screen name="contacts" component={Contacts} options={{ title: 'Contacts' }} />
                <Stack.Screen name="calls" component={Calls} options={{ title: 'Calls' }} />
                <Stack.Screen name="peopleNearby" component={PeopleNearby} options={{ title: 'People Nearby' }} />
                <Stack.Screen name="savedMessages" component={SavedMessages} options={{ title: 'Saved Messages' }} />
                <Stack.Screen name="settings" component={Settings} options={{ title: 'Settings' }} />
                <Stack.Screen name="inviteFriends" component={InviteFriends} options={{ title: 'Invite Friends' }} />
                <Stack.Screen name="talktimeFeatures" component={TalktimeFeatures} options={{ title: 'Talktime Features' }} />
                <Stack.Screen name="account" component={Account} options={{ title: 'Profile' }} />
                <Stack.Screen name="search" component={Search} options={{ title: 'Search' }} />
                <Stack.Screen name="camera" component={Camera} options={{ title: "Camera" }} />
            </Stack.Navigator>
        </>
    )
}

export default NativeStack2;
