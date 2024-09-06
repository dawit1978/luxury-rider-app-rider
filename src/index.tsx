import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from './theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Welcome from './screens/Welcome';
import CurrentLocation from './screens/CurrentLocation';
import SelectDestination from './screens/SelectDestination';
import Request from './screens/Request';
import YourRide from './screens/YourRide';
import DrawerNavigator from './navigation/DrawerNavigator';
import VerificationScreen from './screens/VerificationScreen';
import AuthScreen from './screens/AuthScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import { StackParamsList } from '../types'; // Ensure this file is correctly structured and exported

const Stack = createStackNavigator<StackParamsList>();

const Index: React.FC = () => {
  // Using async function inside useEffect to check user status on app launch
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          // If userData exists, navigate to the main screen
          navigationRef.current?.navigate('DrawerNavigator');
        } else {
          // If no userData, navigate to the AuthScreen
          navigationRef.current?.navigate('AuthScreen');
        }
      } catch (error) {
        console.error('Error reading userData:', error);
      }
    };

    checkUserStatus();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="AuthScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
            <Stack.Screen name="SelectDestination" component={SelectDestination} />
            <Stack.Screen name="Request" component={Request} />
            <Stack.Screen name="YourRide" component={YourRide} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

// Helper navigation ref for navigation control outside the component
const navigationRef = React.createRef<any>();

export default Index;
