// RootLayout.jsx
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import AuthLayout from "./auth/_layout";
import TabLayout from "./(tabs)/_layout";
import NotFoundScreen from "./+not-found";
import ProductDetails from "./screens/ProductDetails";
import PlaceOrder from './screens/PlaceOrder';
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import "../global.css";
import { AppRegistry } from 'react-native';
import { name as appName } from '../app.json';
import ProductOperation from "./screens/ProductOperation";

AppRegistry.registerComponent(appName, () => App);


const Stack = createStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("Login Screen isAuthenticated :- ", isAuthenticated);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={isAuthenticated ? "tabs" : "auth"}
    >
      <Stack.Screen name="auth" component={AuthLayout} />
      <Stack.Screen name="tabs" component={TabLayout} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ProductOperation" component={ProductOperation} />
      <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
};

const RootLayout = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default RootLayout;
