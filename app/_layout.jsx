import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import AuthLayout from "./auth/_layout";
import TabLayout from "./(tabs)/_layout";
import NotFoundScreen from "./+not-found";
import ProductDetails from "./screens/ProductDetails";
import PlaceOrder from "./screens/PlaceOrder";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import "../global.css";
import { AppRegistry, ActivityIndicator, View } from "react-native";
import { name as appName } from "../app.json";
import ProductOperation from "./screens/ProductOperation";
import NotApproved from "./screens/NotApproved";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCredentials } from "../redux/slices/authSlice";

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
      <Stack.Screen name="NotApproved" component={NotApproved} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
};

const RootLayout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Check AsyncStorage for stored credentials on app startup.
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const credentialsJSON = await AsyncStorage.getItem("credentials");
        if (credentialsJSON) {
          const credentials = JSON.parse(credentialsJSON);
          dispatch(setCredentials(credentials));
        }
      } catch (err) {
        console.error("Error loading credentials:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCredentials();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0D986A" />
      </View>
    );
  }

  return <RootNavigator />;
};

const AppRoot = () => {
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
};

export default AppRoot;
