/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {PlatformColor} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import 'react-native-gesture-handler';
import Businesses from './screens/Businesses';
import BusinessDetail from './screens/BusinessDetail';

enableScreens(true);

const MainNavigator = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator
        screenOptions={{
          headerLargeTitle: true,
          headerShown: true,
          headerStyle: {
            backgroundColor: PlatformColor('systemBackground'),
          },
          headerTitleStyle: {color: PlatformColor('label')},
          headerHideShadow: true,
        }}>
        <MainNavigator.Screen name="Businesses" component={Businesses} />
        <MainNavigator.Screen
          name="Profile"
          component={BusinessDetail}
          options={({route}) => ({title: route.params.name})}
        />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
