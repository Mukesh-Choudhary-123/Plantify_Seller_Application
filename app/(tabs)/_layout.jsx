import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Home from "./home";
import Cart from "./order";
import Profile from "./profile";
import Listed from "./listed";
import React from "react";
import { Keyboard, View } from "react-native";

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          // tabBarShowLabel: false,
          tabBarActiveTintColor: "#0D986A",
          tabBarInactiveTintColor: "#808080",
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 70,
            display: isKeyboardVisible ? "none" : "flex", 
          },
          tabBarItemStyle: { paddingTop: 10 },
        }}
      >
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color}/>
            ),
          }}
        />
        <Tab.Screen
          name="Listed"
          component={Listed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="list" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={Cart}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="order-bool-descending" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabLayout;
