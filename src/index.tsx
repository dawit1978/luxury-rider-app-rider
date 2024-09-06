import React from 'react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import theme from './theme';

import Welcome from './screens/Welcome';
import CurrentLocation from './screens/CurrentLocation';
import SelectDestination from './screens/SelectDestination';
import Request from './screens/Request';
import YourRide from './screens/YourRide';
import DrawerNavigator from './navigation/DrawerNavigator';
import VerificationScreen from './screens/VerificationScreen';
import AuthScreen from './screens/AuthScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserDetailsScreen from './screens/UserDetailsScreen';


const Stack = createStackNavigator();

const Index: React.FC = () => {
  return (
    <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        
        
          <Stack.Navigator initialRouteName='AuthScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
           <Stack.Screen name='UserDetails' component={UserDetailsScreen}/>
            <Stack.Screen name='DrawerNavigator'component={DrawerNavigator} />
            {/* <Stack.Screen name="CurrentLocation" component={CurrentLocation} /> */}
            <Stack.Screen name="SelectDestination"component={SelectDestination}/>
            <Stack.Screen name="Request" component={Request} />
            <Stack.Screen name="YourRide" component={YourRide} /> 

        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default Index;