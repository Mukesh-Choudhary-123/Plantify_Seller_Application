import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import CustomHeader from "../components/CustomHeader";
import ContactUs from "../../assets/animation/ContactUs.json";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const NotApproved = () => {
  return (
    <View style={styles.container}>
      <CustomHeader color="#56D1A7" />
      <LottieView autoPlay source={ContactUs} style={styles.lottie} />

      <View style={{ position: "absolute", width: "100%", top: "58%" }}>
        <Text style={{alignSelf:"center" ,fontSize:17 ,fontWeight:400 ,color:"red" ,marginBottom:10}}>Your Profile is Not Approved</Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: "grey",
            textDecorationLine: "underline",
            alignSelf: "center",
          }}
        >
          Contact Us
        </Text>
        <View style={{ marginLeft: "20%" }}>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Ionicons name="call" size={30} color="#56D1A7" />
            <Text style={{ fontSize: 20, fontWeight: 600, color: "grey" }}>
              {" "}
              +91 6376092882
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Ionicons name="mail" size={30} color="#56D1A7" />
            <Text style={{ fontSize: 20, fontWeight: 600, color: "grey" }}>
              {" "}
              support63@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotApproved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lottie: {
    marginTop: -60,
    alignSelf: "center",
    width: width * 1,
    height: height * 0.7,
  },
});
