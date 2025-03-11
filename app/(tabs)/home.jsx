import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import {
  useFonts,
  Philosopher_400Regular,
  Philosopher_700Bold,
} from "@expo-google-fonts/philosopher";
import CustomBanner from "../components/CustomBanner";
import { Text } from "react-native";

const HomeScreen = () => {
  let [fontsLoaded] = useFonts({
    Philosopher_400Regular,
    Philosopher_700Bold,
  });

  return (
    <View style={styles.container}>
      <CustomHeader />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <CustomBanner />
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View
            style={{
              width: 170,
              // backgroundColor: "#56D1A7",
              backgroundColor: "#0D986A",
              elevation: 4,
              marginVertical: 20,
              marginHorizontal: 10,
              borderRadius: 12,
              padding: 5,
              overflow: "hidden",
            }}
          >
            <Image
              source={require("@/assets/images/Vector.png")}
              style={styles.vector}
            />
            <Image
              source={require("@/assets/images/Vector2.png")}
              style={styles.vector2}
            />
            {/* Logo */}
            <Image
              source={require("../../assets/images/plantIcon.png")}
              style={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}
            />
            {/* BottomHeader */}
            <Text
              style={{
                // fontFamily: "Philosopher_700Bold",
                fontWeight: "800",
                fontSize: 25,
                color: "#002140",
                letterSpacing:2,
                alignSelf: "center",
              }}
            >
              Products
            </Text>
            {/* <Text
              style={{
                // fontFamily: "Philosopher_700Bold",
                fontWeight:500,
                fontSize: 20,
                // color: "#002140",
                color: "#fff",
                alignSelf: "center",
              }}
            >
              Listed
            </Text> */}
            {/* Number */}
            <Text
              style={{
                fontSize: 24,
                color: "white",
                // color: "#002140",
                fontWeight: 800,
                alignSelf: "center",
                // marginTop:4
              }}
            >
              2,160
            </Text>
          </View>

          <View
            style={{
              width: 170,
              backgroundColor: "#0D986A",
              elevation: 4,
              marginVertical: 20,
              marginHorizontal: 10,
              borderRadius: 12,
              padding: 5,
              overflow: "hidden",
            }}
          >
            <Image
              source={require("@/assets/images/Vector.png")}
              style={styles.vector}
            />
            <Image
              source={require("@/assets/images/Vector2.png")}
              style={styles.vector2}
            />
            {/* Logo */}
            <Image
              source={require("../../assets/images/ordersIcon.png")}
              style={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}
            />
            {/* BottomHeader */}
            <Text
              style={{
                // fontFamily: "Philosopher_700Bold",
                fontWeight: "800",
                letterSpacing:2,
                fontSize: 25,
                color: "#002140",
                alignSelf: "center",
              }}
            >
              Orders
            </Text>
            {/* <Text
              style={{
                // fontFamily: "Philosopher_700Bold",
                fontWeight:500,
                fontSize: 20,
                color: "#002140",
                alignSelf: "center",
              }}
            >
              place
            </Text> */}
            {/* Number */}
            <Text
              style={{
                fontSize: 24,
                color: "white",
                fontWeight: 800,
                alignSelf: "center",
                // marginTop:4
              }}
            >
              185
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* 
      Add Plant (Button)
        Total Product listed
        Total Orders (with status)
         -pending
         -shipping
         -delivered
         Total listed Product left
      */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  vector: {
    position: "absolute",
    height: 70,
    width: "100%",
    marginLeft: 3,
    marginTop: 20,
  },
  vector2: {
    position: "absolute",
    height: 90,
    width: "100%",
    marginTop: 5,
  },
});
