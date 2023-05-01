import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { LocalAudioFiles, OnlineS, Account, Search } from "../Screens2";
import { SafeAreaView} from "react-native";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <Tab.Navigator
        initialRouteName="Online"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Offline') {
              iconName = focused ? 'musical-notes' : 'musical-notes-outline';
            } else if (route.name === 'Online') {
              iconName = focused ? 'md-pause' : 'md-play';
            } else if (route.name === "Search") {
              iconName = focused ? "search-circle" : "search-circle-outline";
            } else if (route.name === "Account") {
              iconName = focused ? "md-person-circle" : "md-person-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'black',
            borderRadius: 20,
            height: 65,
            marginBottom: 2,
            borderColor: "white",
            marginHorizontal: 10
          },
        })
        }
      >
        <Tab.Screen name="Offline" component={LocalAudioFiles} />
        <Tab.Screen name="Online" component={OnlineS} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default TabNavigation;