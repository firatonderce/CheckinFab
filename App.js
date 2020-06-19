import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './screens/LoginScreen';
import UserProfile from './screens/UserProfile';
import Needs from './screens/Needs';
import Progress from './screens/Progress';
import Announces from './screens/Announces';
import Checkin from './screens/Check-in';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconc from 'react-native-vector-icons/MaterialIcons'

function tabs() {
  return (
    <Tab.Navigator>
      <Stack.Screen
        name="Announces"
        component={Announces}
        options={{
          title: 'Duyurular',
          tabBarIcon: ({focused}) => <Icons name="sound" size={24} />,
        }}
      />
      <Stack.Screen
        name="Needs"
        component={Needs}
        options={{
          title: 'İhtiyaçlar',
          tabBarIcon: ({focused}) => <Icons name="add-to-list" size={24} />,
        }}
      />
      <Stack.Screen
        name="Checkin"
        component={Checkin}
        options={{
          title: 'Check-in',
          tabBarIcon: ({focused}) => <Icons name="direction" size={24} />,
        }}
      />
      <Stack.Screen
        name="Progress"
        component={Progress}
        options={{
          title: 'İzinler',
          tabBarIcon: ({focused}) => <Icons name="info" size={24} />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={UserProfile}
        options={{
          title: 'Profilim',
          tabBarIcon: ({focused}) => <Icon name="user-circle" size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Hometabs" component={tabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={UserProfile} />
        <Stack.Screen name="Checkin" component={Checkin} />
        <Stack.Screen name="Needs" component={Needs} />
        <Stack.Screen name="Announces" component={Announces} />
        <Stack.Screen name="Progress" component={Progress} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
Icon.loadFont();
Icons.loadFont();
Iconc.loadFont();
export default App;
