import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { Account, Home, LocalAudioFiles, AllPlay } from "../Screens2";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Offline') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          } else if (route.name === 'All Play') {
            iconName = focused ? 'md-add-circle-sharp' : 'md-add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-notifications-sharp' : 'ios-notifications-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })
      }
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Offline" component={LocalAudioFiles} />
      <Tab.Screen name="All Play" component={AllPlay} />
      <Tab.Screen name="Notifications" component={Account} />
    </Tab.Navigator>
  );
}

export default TabNavigation;