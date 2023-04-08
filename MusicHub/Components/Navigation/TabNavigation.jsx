import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Account } from "../Screens2";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'My Network') {
            iconName = focused ? 'people-sharp' : 'people-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'md-add-circle-sharp' : 'md-add-circle-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-notifications-sharp' : 'ios-notifications-outline';
          } else if (route.name === 'Jobs') {
            iconName = focused ? 'md-briefcase' : 'md-briefcase-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })
      }
    >
      <Tab.Screen name="Home" component={Account} />
      <Tab.Screen name="My Network" component={Account} />
      <Tab.Screen name="Post" component={Account} />
      <Tab.Screen name="Notifications" component={Account} />
      <Tab.Screen name="Jobs" component={Account} />
    </Tab.Navigator>
  );
}

export default TabNavigation;