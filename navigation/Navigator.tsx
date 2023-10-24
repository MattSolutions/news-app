// @ts-nocheck
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Saved from '../screens/Saved';
import NewsOverview from '../screens/NewsOverview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Homescreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-circle" size={size} color={color} /> ),
              tabBarActiveTintColor: 'black', 
          }}
        />
        <Tab.Screen
                name="Favorites"
                component={Saved}
                options={{
                tabBarIcon: ({ color, size }) => (
                <Icon name="heart" size={size} color={color} />),
                tabBarActiveTintColor: 'red', 
                }}
            />
      </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                options={{headerShown: false}} 
                name="News Feed" 
                component={Homescreen} />

    <Stack.Screen name="News Overview" component={NewsOverview} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
