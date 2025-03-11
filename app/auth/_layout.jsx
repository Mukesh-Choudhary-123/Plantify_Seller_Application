import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import LoginScreen from "./login";
import SignupScreen from "./signup";

const Stack = createStackNavigator();

const AuthLayout = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation, // Slide animation
        }}
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation, // Slide animation
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthLayout;
