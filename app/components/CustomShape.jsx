import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";
import CustomText from "./CustomText";

const CustomShape = () => {
  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });

  const product = {
    title: "Aleo Vera",
    prices: 200,
    subtitle: "Air Purifier",
    image:
      "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810277/sfqzlryj35d3qirkrmd9.png",
  };
  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 300 200"
        style={styles.container2}
      >
        <Path
          d={`
            M 0 40
            Q 0 0 40 0
            L 260 50
            Q 300 70 300 90
            L 300 160
            Q 300 200 260 200
            L 40 200
            Q 0 200 0 160
            Z
          `}
          fill="#9CE5CB"
        />
      </Svg>

      <View style={{ position: "absolute" }}>
        <Image
          source={require("@/assets/images/Vector.png")}
          style={styles.vector}
        />
        <Image
          source={require("@/assets/images/Vector2.png")}
          style={styles.vector2}
        />
        <View style={{marginLeft:35 ,marginTop:30}}>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <CustomText text={`${product.subtitle}`} style={styles.subtitle} />
            <Image
              source={require("@/assets/images/tagIcon.png")}
              style={styles.tagIcon}
            />
          </View>
          <CustomText text={`${product.title}`} style={styles.title} />
          <Text style={styles.des}>
            Aloe vera is a succulent{"\n"}plant with thick, fleshy leaves.
          </Text>
          <Text style={styles.prices}>₹ {product.prices} Rs.</Text>
        </View>
        <Image
          source={require("@/assets/images/plant.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    flexDirection: "row",
    // backgroundColor: "yellow",
  },
  container2: {
    marginLeft: -40,
  },
    image: {
      marginTop:10,
    right: -130,
    position: "absolute",
    height: 200,
    width: 130,
  },
  vector: {
    position: "absolute",
    height: 200,
    width: 150,
    marginLeft: 70,
    marginTop: 10,
  },
  vector2: {
    position: "absolute",
    height: 130,
    width: 90,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 20,
    color: "#002140",
    fontWeight: "500",
  },
  title: {
    fontSize: 35,
    color: "#002140",
    fontFamily: "Philosopher_700Bold",
  },
  tagIcon: {
    height: 30,
    width: 30,
  },
  des: {
    fontSize: 16,
    fontWeight: "400",
  },
  prices: {
    marginTop: 20,
    fontSize: 20,
    color: "#002140",
    fontWeight: "600",
  },
});

export default CustomShape;
