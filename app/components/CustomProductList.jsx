import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { useDeleteProductMutation } from "../../redux/api/productApi";
import { useSelector } from "react-redux";
import CustomLoader from "./CustomLoader";

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

  const sellerId = useSelector((state) => state.auth.sellerId);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // console.log("seller-ID", sellerId);
  const handlePress = () => {
    navigation.navigate("ProductDetails", {
      productId: id,
      cardColor: bgColor,
    });
  };

  const handleEdit = () => {
    navigation.navigate("ProductOperation", {
      productId: id,
      cardColor: bgColor,
      work: "edit",
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Confirmation", // title
      "Are you sure you want to delete this item?", // message
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Deleting product with id:", id);
            deleteProduct({ id, sellerId })
              .unwrap()
              .then((res) => {
                console.log("Product deleted successfully:", res);
              })
              .catch((err) => {
                console.error("Failed to delete product:", err);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity onPress={handlePress}>
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
            <Text style={{ color: "grey", fontWeight: "500" }}>
              stock left :
            </Text>{" "}
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

            {!isDeleting ? (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  top: 20,
                }}
                onPress={handleDelete}
              >
                {/* <Text style={{ fontWeight: "400", fontSize: 18 }}>Delete</Text> */}
                <AntDesign name="delete" size={30} color={"red"} />
              </TouchableOpacity>
            ) : (
              // null
              <ActivityIndicator
                style={{ top: 20 }}
                size={"large"}
                color={"red"}
              />
            )}
          </View>
        </View>
        {/* RIGHT */}
        <View>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProductList = ({ data }) => {
  return (
      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item, index }) => (
          <ProductCard
            id={item._id}
            title={item.title}
            subtitle={item.subtitle}
            stock={item.stock}
            image={item.thumbnail}
            bgColor={colors[index % colors.length]}
          />
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
  );
};

export default ProductCard;

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
    marginTop: 10,
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
    fontSize: 30,
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
