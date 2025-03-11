import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomDropdown from '../components/CustomDropdown'

const colors = [
  "#9CE5CB",
  "#FDC7BE",
  "#FFE899",
  "#56D1A7",
  "#B2E28D",
  "#DEEC8A",
  "#F5EDA8",
];

const ProductList = ({ products }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()} // Ensure keys are strings
      renderItem={(
        { item, index } // Destructure 'index' correctly
      ) => (
        <View
          style={[
            styles.listCard,
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
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: item.image }} height={50} width={50} />
            <Text style={styles.title}>{item.title}</Text>
          </View>

          <View>
            <Text style={styles.price}>
              <Text
                style={{ color: "#6B7280", fontWeight: "400", fontSize: 16 }}
              >
                Quantity:
              </Text>{" "}
              {item.quantity}
            </Text>
            <Text style={styles.price}>
              <Text
                style={{ color: "#6B7280", fontWeight: "400", fontSize: 16 }}
              >
                price:
              </Text>{" "}
              ₹ {item.price}
            </Text>
          </View>
        </View>
      )}
      style={styles.flatList}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

const PlaceOrder = () => {
  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });

  // Product List (with state for quantity management)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Aloe Vera",
      price: 200,
      quantity: 3,
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
      quantity: 2,
      subtitle: "Air Purifier",
      image:
        "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/zcwyruubsttbphlcfwhr.png",
    },
    {
      id: 4,
      title: "Money Plant",
      price: 180,
      quantity: 8,
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
    // {
    //   id: 8,
    //   title: "Spider Plant",
    //   price: 220,
    //   quantity: 1,
    //   subtitle: "Air Purifier",
    //   image:
    //     "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/zcwyruubsttbphlcfwhr.png",
    // },
    // {
    //   id: 9,
    //   title: "Money Plant",
    //   price: 180,
    //   quantity: 1,
    //   subtitle: "Indoor Plant",
    //   image:
    //     "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/y5ne7fz3zcucplxjjblu.png",
    // },
    // {
    //   id: 10,
    //   title: "Jade Plant",
    //   price: 270,
    //   quantity: 1,
    //   subtitle: "Succulent",
    //   image:
    //     "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810279/c1fuea1c20gw3p7z5jir.png",
    // },
  ]);

  const address = {
    streetAddress: "City center mall ",
    city: "Udaipur",
    state: "Rajasthan",
    zipCode: 303301,
    country: "India",
    contact: 6376092882,
    email: "mukesh1062003@gmail.com",
  };
  const handleEdit = () => {
    console.log("edit");
  };
  // Calculate total price
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;
  return (
    <View style={styles.container}>
      <CustomHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 15,
            letterSpacing: 2,
            marginBottom: 10,
          }}
        >
          Your Selected Product
        </Text>

        <ProductList products={cartItems} />
        <View
          style={{
            height: 2,
            width: "90%",
            marginVertical: 10,
            backgroundColor: "lightgrey",
            alignSelf: "center",
          }}
        ></View>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 15,
            letterSpacing: 2,
            marginBottom: 10,
          }}
        >
          {address ? "Shipping Address" : "Fill Shipping Address"}
        </Text>
        {address ? (
          <View style={{ marginBottom: 20 }}>
            <CustomInput label="Full Name" placeholder="Full Name"  />
            <CustomInput label="Contact Number" placeholder="Contact Number" />
            <CustomInput label="Email Address" placeholder="Email Address" />
            <CustomInput label="Street Address" placeholder="Street Address" />
            <CustomDropdown label="City" placeholder="Select City"/>
            <CustomDropdown label="State" placeholder="Select State"/>
            <CustomInput label="ZIP Code" placeholder="Zip Code" />
            <CustomButton text="Add Address" style={{ marginTop: 15 }} />
          </View>
        ) : (
          <View style={styles.addressCard}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Shipping Address</Text>
              {/* Optional Edit Button */}
              <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.addressDetail}>
              <Text style={styles.label}>Street:</Text>
              <Text style={styles.value}>{address.streetAddress}</Text>
            </View>
            <View style={styles.addressDetail}>
              <Text style={styles.label}>City:</Text>
              <Text style={styles.value}>{address.city}</Text>
            </View>
            <View style={styles.addressDetail}>
              <Text style={styles.label}>State:</Text>
              <Text style={styles.value}>{address.state}</Text>
            </View>
            <View style={styles.addressDetail}>
              <Text style={styles.label}>Zip:</Text>
              <Text style={styles.value}>{address.zipCode}</Text>
            </View>
            <View style={styles.addressDetail}>
              <Text style={styles.label}>Country:</Text>
              <Text style={styles.value}>{address.country}</Text>
            </View>
            <View style={styles.addressDetail}>
              <Text style={styles.label}>Contact:</Text>
              <Text style={styles.value}>{address.contact}</Text>
            </View>
            <View style={styles.addressDetail}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{address.email}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {!address && (
        <View style={styles.totalsCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>₹{subtotal}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery:</Text>
            <Text style={styles.totalValue}>+ ₹{deliveryFee}</Text>
          </View>
          <View style={[styles.totalRow, { marginTop: 8 }]}>
            <Text style={styles.grandTotal}>Total:</Text>
            <Text style={styles.grandTotal}>₹{total}</Text>
          </View>
          <CustomButton text="Order Confirm" style={{ marginTop: 10 }} />
        </View>
      )}
    </View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  flatList: {
    // max height 30%
    // min - content fit
  },
  listCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderRadius: 5,
    overflow: "hiddeny",
  },
  title: {
    color: "#002140",
    marginTop: 6,
    marginLeft: 5,
    fontSize: 25,
    fontFamily: "Philosopher_700Bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
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
  totalsCard: {
    borderTopWidth: 1,
    borderTopColor: "#0D986A",
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
  addressLable: {
    color: "#6B7280",
  },
  addressCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Elevation for Android
    elevation: 3,
     marginHorizontal:3
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "600",
  },
  addressDetail: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    color: "#555",
    width: 90, // Fixed width for consistency
  },
  value: {
    color: "#333",
    flexShrink: 1,
  },
});
