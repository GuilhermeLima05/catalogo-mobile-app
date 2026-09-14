import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2b6cb0',
        tabBarInactiveTintColor: '#718096',
      }}
    >
      <Tab.Screen 
        name="Masculino" 
        component={ProductsScreen} 
        initialParams={{ categories: ['mens-shirts', 'mens-shoes', 'mens-watches'] }} 
      />
      <Tab.Screen 
        name="Feminino" 
        component={ProductsScreen} 
        initialParams={{ categories: ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'] }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const user = useSelector((state) => state.auth.user);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes do Produto' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}