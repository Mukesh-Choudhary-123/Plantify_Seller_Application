import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";

const CustomHeader = ({color="white"}) => {
  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });
  return (
    <View style={[styles.container , {backgroundColor:color}]}>
      <View style={{flexDirection:"row" , marginLeft:5}}>

      <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
        />
      <Text style={styles.logoText}>PLANTIFY</Text>
        </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 10,
    // borderTopLeftRadius: 40,
    // borderTopRightRadius:40
  },
  logo: {
    height: 33,
    width: 40,
    marginTop: 12,
  },
  logoText: {
    fontSize: 25,
    color:"#002140",
    fontFamily: "Philosopher_700Bold",
    marginTop: 12,
    marginLeft: 10,
    letterSpacing:1.5,
  }
});
