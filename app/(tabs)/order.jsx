import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const colors = [
  "#9CE5CB",
  "#FDC7BE",
  "#FFE899",
  "#56D1A7",
  "#B2E28D",
  "#DEEC8A",
  "#F5EDA8",
];

const OrderScreen = () => {
  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });

  const navigation = useNavigation();

  // Product List (with state for quantity management)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Aloe Vera",
      price: 200,
      quantity: 1,
      subtitle: "Air Purifier",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810277/sfqzlryj35d3qirkrmd9.png",
    },
    {
      id: 2,
      title: "Peace Lily",
      price: 300,
      quantity: 1,
      subtitle: "Air Purifier",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810275/vf6t8uxpsieqvmlk6vau.png",
    },
    {
      id: 3,
      title: "Spider Plant",
      price: 220,
      quantity: 1,
      subtitle: "Air Purifier",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/zcwyruubsttbphlcfwhr.png",
    },
    {
      id: 4,
      title: "Money Plant",
      price: 180,
      quantity: 1,
      subtitle: "Indoor Plant",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/y5ne7fz3zcucplxjjblu.png",
    },
    {
      id: 5,
      title: "Jade Plant",
      price: 270,
      quantity: 1,
      subtitle: "Succulent",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810279/c1fuea1c20gw3p7z5jir.png",
    },
    {
      id: 6,
      title: "Aloe Vera",
      price: 200,
      quantity: 1,
      subtitle: "Air Purifier",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810277/sfqzlryj35d3qirkrmd9.png",
    },
    {
      id: 7,
      title: "Peace Lily",
      price: 300,
      quantity: 1,
      subtitle: "Air Purifier",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810275/vf6t8uxpsieqvmlk6vau.png",
    },
    {
      id: 8,
      title: "Spider Plant",
      price: 220,
      quantity: 1,
      subtitle: "Air Purifier",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/zcwyruubsttbphlcfwhr.png",
    },
    {
      id: 9,
      title: "Money Plant",
      price: 180,
      quantity: 1,
      subtitle: "Indoor Plant",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/y5ne7fz3zcucplxjjblu.png",
    },
    {
      id: 10,
      title: "Jade Plant",
      price: 270,
      quantity: 1,
      subtitle: "Succulent",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810279/c1fuea1c20gw3p7z5jir.png",
    },
  ]);

  // Function to update quantity
  const updateQuantity = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;


  const handlePlaceOrder = () => {
    navigation.navigate("PlaceOrder");
  }

  return (
    <View style={styles.container}>
      <CustomHeader />
      {/* <Text style={styles.headingText}>Your Cart</Text> */}

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          // Use a different background color for each card by cycling through the colors array
          <View
            style={[
              styles.card,
              { backgroundColor: colors[index % colors.length] },
            ]}
          >
            <Image
              source={require("@/assets/images/Vector.png")}
              style={styles.vector}
            />
            <Image
              source={require("@/assets/images/Vector2.png")}
              style={styles.vector2}
            />
            <View style={styles.productContainer}>
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={styles.detailsContainer}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, "decrease")}
                  >
                    <FontAwesome name="minus" size={18} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, "increase")}
                  >
                    <FontAwesome name="plus" size={18} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.rightSection}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeItem(item.id)}
                >
                  <FontAwesome name="trash-o" size={22} color="#FF4D4F" />
                </TouchableOpacity>
                <Text style={styles.price}>₹{item.price * item.quantity}</Text>
              </View>
            </View>
          </View>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  listContainer: {
    paddingHorizontal: 15,
    // paddingBottom: 20,
  },
  headingText: {
    fontSize: 28,
    fontFamily: "Philosopher_700Bold",
    color: "#0D986A",
    // marginVertical: 20,
    marginLeft: 20,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 23,
    fontFamily: "Philosopher_700Bold",
    color: "#002140",
  },
  subtitle: {
    fontSize: 14,
    fontWeight:500,
    color: "#6C757D",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "#0D986A",
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#002140",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  deleteButton: {
    padding: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#002140",
    marginTop: 8,
  },
  totalsCard: {
    borderTopWidth: 1,
    borderTopColor:"#0D986A",
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 16,
    color: "#6C757D",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#002140",
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0D986A",
  },
  checkoutButton: {
    backgroundColor: "#0D986A",
    paddingVertical: 18,
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 12,
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default OrderScreen;
