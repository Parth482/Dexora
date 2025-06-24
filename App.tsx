import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from './ThemeContext';
import { TokenProvider } from './screens/TokenContext';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import MenuScreen from './screens/MenuScreen';
import LegalPage from './screens/Legal';
import TokenDetailScreen from './screens/TokenDetailScreen';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <TokenProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Legal"
              component={LegalPage} 
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TokenDetail"
              component={TokenDetailScreen}
              options={{ headerShown: true, title: 'Token Detail' }}
            />
          </Stack.Navigator>
        </TokenProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
