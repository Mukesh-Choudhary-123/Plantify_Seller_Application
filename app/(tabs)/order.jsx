import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrderQuery } from "../../redux/api/orderApi";
import LottieView from "lottie-react-native";
import EmptyCart from "../../assets/animation/EmptyCart.json";
import { useState } from "react";
import { colors } from "../../constant";
const { width, height } = Dimensions.get("window");

const orderSteps = ["order", "shipped", "delivered"];

const options = [
  "Newest",
  "Oldest",
  "Update",
  "Pending",
  "Cancelled",
  "Delivered",
  "Processing",
  "Shipping",
];

const OrderScreen = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");
  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });

  const sellerId = useSelector((state) => state.auth.sellerId);

  const {
    data: fetchOrder,
    isLoading: isOrderLoading,
    isError: isOrderError,
    error: orderError,
  } = useGetOrderQuery(sellerId, { skip: !sellerId });

  // console.log("Orders: ", JSON.stringify(fetchOrder, null, 2));

  // console.log("Orders: ", fetchOrder);

  const orders = fetchOrder?.orders || [];

  //#region order Item
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
      order: { color: "#FFB800", label: "Pending" },
      shipped: { color: "#0D986A", label: "Shipped" },
      delivered: { color: "#2E7D32", label: "Delivered" },
      cancelled: { color: "#D32F2F", label: "Cancelled" },
    };

    // Map "pending" to "order"
    // console.log("item.status :",item.status)
    const mappedStatus =
      item.status && item.status.toLowerCase() === "pending"
        ? "order"
        : item.status
        ? item.status.toLowerCase()
        : "order";

    const config = statusConfig[mappedStatus] || {
      color: "#000",
      label: "Unknown",
    };
    const { color, label } = config;
    const currentStepIndex = orderSteps.indexOf(mappedStatus);

    return (
      <>
        <View
          style={[
            styles.orderCard,
            { backgroundColor: colors[index % colors.length] },
          ]}
        >
          <View style={{ flexDirection: "row", width: "100%" }}>
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
                  <Text style={styles.statusText}>{label}</Text>
                </View>
              </View>
              <Text style={styles.orderSubtitle}>{item.subtitle}</Text>
              <View style={styles.orderFooter}>
                <Text style={styles.orderPrice}>₹{item.price}</Text>
                <Text style={styles.orderId}>
                  #{item.id ? item.id.toString().slice(-6) : "N/A"}
                </Text>
              </View>
              <View style={styles.totalsContainer}>
                <Text style={styles.totalText}>
                  Total Amount: ₹{item.totalAmount}
                </Text>
                <Text style={styles.totalText}>
                  Total Items: {item.totalItems}
                </Text>
              </View>

              {item.status !== "cancelled" && (
                <View style={styles.progressContainer}>
                  {orderSteps.map((step, idx) => (
                    <View key={step} style={styles.stepContainer}>
                      <View
                        style={[
                          styles.stepIcon,
                          idx <= currentStepIndex && {
                            backgroundColor: "#0D986A",
                          },
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
          </View>
          <ShippingAddressTable shippingAddress={item?.shippingAddress} />
        </View>
      </>
    );
  };
  //#region filter
  const CustomFilter = () => {
    const handleClearFilter = () => {};
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          marginBottom: 5,
        }}
      >
        <View style={{width:50}}>
          <TouchableOpacity onPress={handleClearFilter}>
            <Image
              source={require("@/assets/images/filterIcon.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {options.map((option, key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.filterButton,
                selectedOption === option && styles.activeFilterButton,
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedOption === option && styles.activeFilterText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  //#region Shipping Address

  const ShippingAddressTable = ({ shippingAddress }) => {
    // If shippingAddress is null or undefined, display a message.
    if (!shippingAddress) {
      return (
        <View style={styles.container2}>
          <Text style={styles.noDataText}>No Shipping Address Available</Text>
        </View>
      );
    }

    // Define the fields in the desired order.
    const fields = [
      { label: "Full Name", key: "fullName" },
      { label: "Contact Number", key: "contactNumber" },
      { label: "Email", key: "email" },
      { label: "Street Address", key: "streetAddress" },
      { label: "City", key: "city" },
      { label: "State", key: "state" },
      { label: "Zip Code", key: "zipCode" },
    ];
    console.log("Address", shippingAddress);

    return (
      <View style={styles.container2}>
        <Text style={styles.header}>Shipping Address</Text>
        <View style={styles.tableContainer}>
          {/* Table header */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <Text style={[styles.tableCell, styles.tableHeaderCell]}>
              Property
            </Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell]}>Data</Text>
          </View>

          {/* Table rows */}
          {fields.map(({ label, key }) => (
            <View style={styles.tableRow} key={key}>
              <Text style={styles.tableCell}>{label}</Text>
              <Text style={styles.tableCell}>
                {shippingAddress[key] !== undefined
                  ? shippingAddress[key].toString()
                  : "N/A"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };
  //#region main
  return (
    <View style={styles.container}>
      {/* <CustomHeader /> */}
      <CustomHeader color="#56D1A7" />

      <View style={styles.contentContainer}>
        {isOrderLoading ? (
          <View style={{ marginTop: "90%", alignItems: "center" }}>
            <ActivityIndicator size={"large"} color={"black"} />
            <Text
              style={{
                fontSize: 18,
                marginTop: 5,
                fontWeight: 600,
                color: "#002140",
                marginLeft: 15,
              }}
            >
              Loading...
            </Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            renderItem={renderOrderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ordersList}
            ListEmptyComponent={
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  top: -10,
                }}
              >
                <LottieView
                  source={EmptyCart}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    marginTop: -50,
                    fontWeight: 600,
                    color: "#002140",
                  }}
                >
                  No problem
                  {/* {"\n"} Start shopping{" "}
                  <Text style={{ color: "#0D986A" }}>Now!</Text> */}
                </Text>
              </View>
            }
            ListHeaderComponent={<CustomFilter />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    alignSelf: "center",
    width: width * 1,
    height: height * 0.7,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Philosopher_700Bold",
    color: "#002140",
    marginTop: 30,
    marginBottom: 10,
    paddingLeft: 8,
  },
  filterIcon: {
    marginTop: 8,
    height: 45,
    width: 41,
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    // flexDirection: "row",
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
  filterContainer: {
    flexDirection: "row",
    // marginHorizontal: 15,
    // marginRight: 5,
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#002140",
    marginLeft: 7,
  },
  activeFilterButton: {
    backgroundColor: "#0D986A",
    borderColor: "#0D986A",
  },
  filterText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#002140",
  },
  activeFilterText: {
    color: "white",
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
    marginTop: -8,
    fontSize: 16,
    fontWeight: 600,
    color: "#6C757D",
    // marginBottom: 8,
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
    fontWeight: 500,
    color: "#94A3B8",
  },
  totalsContainer: {
    color: "#6C757D",
  },
  totalText: {
    fontSize: 16,
    paddingVertical: 1,
    color: "#6C757D",
  },
  progressContainer: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    marginTop: 12,
    marginLeft: "-40%",
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
    fontWeight: 600,
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
  container2: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 10,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#002140",
    textAlign: "center",
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableHeaderRow: {
    backgroundColor: "#f0f0f0",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    color: "#333",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    color: "#002140",
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    color: "#555",
    fontSize: 16,
  },
});

export default OrderScreen;
