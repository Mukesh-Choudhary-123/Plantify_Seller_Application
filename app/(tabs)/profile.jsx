import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";

const orders = [
  {
    id: 3729819873984234,
    title: "Aloe Vera",
    prices: 200,
    subtitle: "Air Purifier",
    image:
      "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810277/sfqzlryj35d3qirkrmd9.png",
    status: "order",
  },
  {
    id: 3729819873984235,
    title: "Peace Lily",
    prices: 300,
    subtitle: "Air Purifier",
    image:
      "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810275/vf6t8uxpsieqvmlk6vau.png",
    status: "shipped",
  },
  {
    id: 3729819873984236,
    title: "Spider Plant",
    prices: 220,
    subtitle: "Air Purifier",
    image:
      "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/zcwyruubsttbphlcfwhr.png",
    status: "delivered",
  },
  {
    id: 3729819873984237,
    title: "Money Plant",
    prices: 180,
    subtitle: "Indoor Plant",
    image:
      "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810278/y5ne7fz3zcucplxjjblu.png",
    status: "cancelled",
  },
  {
    id: 3729819873984238,
    title: "Jade Plant",
    prices: 270,
    subtitle: "Succulent",
    image:
      "https://res.cloudinary.com/dyws4bybf/image/upload/c_thumb,w_200,g_face/v1740810279/c1fuea1c20gw3p7z5jir.png",
    status: "order",
  },
];

const orderSteps = ["order", "shipped", "delivered"];

const ProfileScreen = () => {
  const userData = {
    username: "Mukesh Choudhary",
    email: "mukesh123@gmail.com",
  };

  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });

  const renderOrderItem = ({ item, index }) => {
    // Colors for different order cards
    const colors = [
      "#9CE5CB",
      "#FDC7BE",
      "#FFE899",
      "#56D1A7",
      "#B2E28D",
      "#DEEC8A",
      "#F5EDA8",
    ];

    // Configuration for status badges
    const statusConfig = {
      order: { icon: "⏳", color: "#FFB800", label: "Processing" },
      shipped: { icon: "🚚", color: "#0D986A", label: "Shipped" },
      delivered: { icon: "✅", color: "#2E7D32", label: "Delivered" },
      cancelled: { icon: "❌", color: "#D32F2F", label: "Cancelled" },
    };

    const { icon, color, label } = statusConfig[item.status.toLowerCase()];
    const currentStepIndex = orderSteps.indexOf(item.status.toLowerCase());

    return (
      <TouchableOpacity
        style={[
          styles.orderCard,
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
        <Image source={{ uri: item.image }} style={styles.orderImage} />
        <View style={styles.orderDetails}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderTitle}>{item.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: color }]}>
              <Text style={styles.statusText}>
                {/* {icon} {label} */}
                 {label}
              </Text>
            </View>
          </View>
          <Text style={styles.orderSubtitle}>{item.subtitle}</Text>
          <View style={styles.orderFooter}>
            <Text style={styles.orderPrice}>₹{item.prices}</Text>
            <Text style={styles.orderId}>#{item.id.toString().slice(-6)}</Text>
          </View>

          {item.status !== "cancelled" && (
            <View style={styles.progressContainer}>
              {orderSteps.map((step, idx) => (
                <View key={step} style={styles.stepContainer}>
                  <View
                    style={[
                      styles.stepIcon,
                      idx <= currentStepIndex && { backgroundColor: "#0D986A" },
                    ]}
                  >
                    <Text style={styles.stepText}>
                      {idx <= currentStepIndex ? "✓" : idx + 1}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      idx <= currentStepIndex && { color: "#0D986A" },
                    ]}
                  >
                    {step}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <CustomHeader color="#56D1A7" />
        <View style={styles.profileContent}>
          <View style={styles.avatarContainer}>
          </View>
          <View style={styles.userDetails}>
            <View>
            <Text style={styles.username}>{userData.username}</Text>
            <Text style={styles.email}>{userData.email}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View style={styles.contentContainer}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ordersList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No orders found</Text>
            </View>
          }
          ListHeaderComponent={ <Text style={styles.sectionTitle}>Order History</Text>}
        />
      </View> */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  profileHeader: {
    backgroundColor: "#56D1A7",
    paddingBottom: 15,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  profileContent: {
    // paddingHorizontal: 24,
    // marginTop: 20,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    marginTop:5,
    height:40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#002140",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#002140",
  },
  editText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  userDetails: {
    // marginTop: 20,
    flexDirection: "row",
    justifyContent:"space-around"
  },
  username: {
    fontSize: 24,
    color: "#002140",
    fontFamily: "Philosopher_700Bold",
    marginBottom: 3,
  },
  email: {
    fontSize: 16,
    color: "#002140",
    // color: "rgba(255, 255, 255, 0.9)",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Philosopher_700Bold",
    color: "#002140",
    marginTop: 30,
    marginBottom: 10,
    paddingLeft: 8,
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
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
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  orderDetails: {
    flex: 1,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderTitle: {
    fontSize: 23,
    fontFamily: "Philosopher_700Bold",
    color: "#002140",
    flexShrink: 1,
  },
  statusBadge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  orderSubtitle: {
    marginTop:-8,
    fontSize: 16,
    fontWeight:600,
    color: "#6C757D",
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0D986A",
  },
  orderId: {
    fontSize: 16,
    fontWeight:500,
    color: "#94A3B8",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  stepContainer: {
    alignItems: "center",
    flex: 1,
  },
  stepIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
    
  },
  stepText: {
    color: "#002140",
    fontSize: 16,
    fontWeight: "600",
  },
  stepLabel: {
    fontSize: 14,
    fontWeight:600,
    color: "#94A3B8",
    textAlign: "center",
    textTransform: "capitalize",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 16,
  },
});


