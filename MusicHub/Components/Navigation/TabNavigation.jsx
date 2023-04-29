import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { LocalAudioFiles, OnlineS } from "../Screens2";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Online"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Offline') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          } else if (route.name === 'Online') {
            iconName = focused ? 'md-pause' : 'md-play';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })
      }
    >
      <Tab.Screen name="Offline" component={LocalAudioFiles} />
      <Tab.Screen name="Online" component={OnlineS} />
    </Tab.Navigator>
  );
}

export default TabNavigation;