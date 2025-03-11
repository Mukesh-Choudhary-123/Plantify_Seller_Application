import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import { AntDesign } from "@expo/vector-icons";

const colors = [
  "#9CE5CB",
  "#FDC7BE",
  "#FFE899",
  "#56D1A7",
  "#B2E28D",
  "#DEEC8A",
  "#F5EDA8",
];

const ProductCard = ({
  id,
  title,
  subtitle,
  prices,
  stock,
  image,
  bgColor,
}) => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });

  const handleEdit = () => {
    navigation.navigate("ProductOperation", {
      productId: id,
      cardColor: bgColor,
      work:"edit"
    });
  };

  return (
    // <TouchableOpacity onPress={handlePress}>
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Image
        source={require("@/assets/images/Vector.png")}
        style={styles.vector}
      />
      <Image
        source={require("@/assets/images/Vector2.png")}
        style={styles.vector2}
      />

      {/* LEFT */}
      <View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <CustomText text={subtitle} style={styles.subtitle} />
          <Image
            source={require("@/assets/images/tagIcon.png")}
            style={styles.tagIcon}
          />
        </View>
        <CustomText text={title} style={styles.title} />
        <Text style={styles.stock}>
          <Text style={{ color: "grey", fontWeight: "500" }}>stock left :</Text>{" "}
          {stock}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              top: 20,
            }}
            onPress={handleEdit}
          >
            {/* <Text style={{ fontWeight: "600", fontSize: 20 }}>Edit</Text> */}
            <AntDesign name="edit" color={"#002140"} size={30} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              top: 20,
            }}
          >
            {/* <Text style={{ fontWeight: "400", fontSize: 18 }}>Delete</Text> */}
            <AntDesign name="delete" size={30} color={"red"} />
          </TouchableOpacity>
        </View>
      </View>
      {/* RIGHT */}
      <View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </View>
    //  </TouchableOpacity>
  );
};

const ProductList = () => {
  const products = [
    {
      id: 1,
      title: "Spider Plant",
      prices: 220,
      subtitle: "Air Purifier",
      stock: 13,
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/zcwyruubsttbphlcfwhr.png",
    },
    {
      id: 2,
      title: "Money Plant",
      prices: 180,
      subtitle: "Indoor Plant",
      stock: 8,
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/y5ne7fz3zcucplxjjblu.png",
    },
    {
      id: 3,
      title: "Jade Plant",
      prices: 270,
      subtitle: "Succulent",
      stock: 3,
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810279/c1fuea1c20gw3p7z5jir.png",
    },
    // ... add other products as needed
  ];

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Popular Plants</Text>
      <Text style={styles.headerSubtitle}>Bring nature into your space</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <ProductCard
          id={item.id}
          title={item.title}
          subtitle={item.subtitle}
          stock={item.stock}
          image={item.image}
          bgColor={colors[index % colors.length]}
        />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  headerText: {
    alignSelf: "center",
    fontSize: 24,
    marginVertical: 10,
  },
  headerContainer: {
    // paddingVertical: 24,
    // paddingHorizontal: 8,
    // alignSelf:"center"
  },
  headerTitle: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "Philosopher_700Bold",
    color: "#002140",
    // marginBottom: 8,
  },
  headerSubtitle: {
    alignSelf: "center",
    fontSize: 18,
    color: "#6B7280",
  },
  container: {
    marginTop: 20,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    justifyContent: "space-between",
  },
  vector: {
    position: "absolute",
    height: 200,
    width: "100%",
    marginLeft: 70,
    marginTop: 10,
  },
  vector2: {
    position: "absolute",
    height: 190,
    width: 390,
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
  image: {
    height: 200,
    width: 130,
  },
  des: {
    fontSize: 16,
    fontWeight: "400",
  },
  stock: {
    fontSize: 20,
    color: "#002140",
  },
});
