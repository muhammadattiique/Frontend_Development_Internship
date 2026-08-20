import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '../screens/AuthScreen';
import ListingScreen from '../screens/ListingScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import AboutScreen from '../screens/AboutScreen';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';

export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined;
  Listing: undefined;
  Details: { itemId: string; itemName: string; itemPrice: string } | undefined;
  DrawerMenu: undefined;
  Settings: undefined;
  Help: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Define the deep linking configuration
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Auth: 'auth',
      MainApp: 'main',
      Listing: 'listing',
      Details: 'details/:itemId',
      DrawerMenu: 'menu',
      Settings: 'settings',
      Help: 'help',
      About: 'about',
    },
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="DrawerMenu" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Listing" component={ListingScreen} options={{ title: 'Listing View' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details View' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Help & Support' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About App' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}