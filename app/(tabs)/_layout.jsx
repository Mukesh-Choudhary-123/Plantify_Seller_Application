import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Home from "./home";
import Cart from "./order";
import Profile from "./profile";
import Listed from "./listed";
import React from "react";
import { Keyboard, View, StyleSheet } from "react-native";

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

  // Common style for tab icons
  const iconContainerStyle = (focused) => ({
    backgroundColor: focused ? "lightgrey" : "transparent",
    width: 70,
    borderRadius: 19,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0D986A",
          tabBarInactiveTintColor: "#808080",
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 70,
            display: isKeyboardVisible ? "none" : "flex",
          },
          tabBarItemStyle: { paddingTop: 10 },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View style={iconContainerStyle(focused)}>
                <FontAwesome name="home" size={30} color={color} />
              </View>
            ),
          }}
        />

        {/* Uncomment or add additional screens as needed */}
        {/* <Tab.Screen
          name="Listed"
          component={Listed}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View style={iconContainerStyle(focused)}>
                <Entypo name="list" size={30} color={color} />
              </View>
            ),
          }}
        /> */}

        <Tab.Screen
          name="Order"
          component={Cart}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View style={iconContainerStyle(focused)}>
                <MaterialCommunityIcons name="order-bool-descending" size={30} color={color} />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View style={iconContainerStyle(focused)}>
                <FontAwesome name="user" size={30} color={color} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabLayout;
