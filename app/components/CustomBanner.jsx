import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useFonts,
  Philosopher_400Regular,
  Philosopher_700Bold,
} from "@expo-google-fonts/philosopher";

const CustomBanner = () => {
  let [fontsLoaded] = useFonts({
    Philosopher_400Regular,
    Philosopher_700Bold,
  });

  return (
    <View style={styles.container}>
      {/* Left Side - Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.heading}>There's a Plant {"\n"}for Everyone</Text>
        <Text style={styles.title}>Bring nature into your space</Text>
      </View>

      {/* Right Side - Image & Dots Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/favicon.png")}
          style={styles.image}
        />
        
        {/* Decorative Dots */}
        <View style={[styles.dot, styles.dot1]} />
        <View style={[styles.dot, styles.dot2]} />
        <View style={[styles.dot, styles.dot3]} />
        <View style={[styles.dot, styles.dot4]} />
        <View style={[styles.dot, styles.dot5]} />
      </View>
    </View>
  );
};

export default CustomBanner;

const styles = StyleSheet.create({
  container: {
    height: 140,
    backgroundColor: "#E8FDE7",
    flexDirection: "row",
    borderRadius: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal:10
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: "#002140",
    fontFamily: "Philosopher_700Bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0D986A",
    marginTop: 5,
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 86,
  },
  dot: {
    position: "absolute",
    borderRadius: 50,
    backgroundColor: "#0D986A",
  },
  dot1: { height: 14, width: 14, top: -10, left: 20 },
  dot2: { height: 10, width: 10, top: 30, right: -10 },
  dot3: { height: 12, width: 12, bottom: -5, left: -10 },
  dot4: { height: 8, width: 8, bottom: 20, right: -20 },
  dot5: { height: 16, width: 16, top: -20, right: 10 },
});

