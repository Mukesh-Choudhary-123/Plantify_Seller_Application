import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomBanner from "../components/CustomBanner";
import CustomProductList from "../components/CustomProductList";
import CustomHeader from "../components/CustomHeader";
import CustomShape from "../components/CustomShape";
import {
  useFonts,
  Philosopher_400Regular,
  Philosopher_700Bold,
} from "@expo-google-fonts/philosopher";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGetProductsQuery } from "../../redux/api/productApi";

const ListedScreen = () => {
  let [fontsLoaded] = useFonts({
    Philosopher_400Regular,
    Philosopher_700Bold,
  });

  const { data, isLoading, isError } = useGetProductsQuery();

  console.log("Product:- ", data?.products);

  const options = [
    "Top Pick",
    "Indoor",
    "Outdoor",
    "Seed",
    "Fertilizer",
    "Pots",
    "Tools",
    "Decor",
  ];
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("Top Pick");

  return (
    <View style={styles.container}>
      {/* <CustomHeader color="#66C6A3" /> */}
      <CustomHeader />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {/* <CustomBanner /> */}

        {/* Search Bar with Icon */}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.searchContainer}>
            <FontAwesome
              name="search"
              size={20}
              color="#002140"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Plant"
              placeholderTextColor="#002140"
              onChangeText={setSearch}
              value={search}
            />
          </View>
          <TouchableOpacity>
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
                selectedOption === option && styles.activeFilterButton, // Apply active style if selected
              ]}
              onPress={() => setSelectedOption(option)} // Update state on press
            >
              <Text
                style={[
                  styles.filterText,
                  selectedOption === option && styles.activeFilterText, // Change text color if selected
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ paddingBottom: 10 }}>
          <CustomProductList />
        </View>
      </ScrollView>
    </View>
  );
};

export default ListedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#002140",
    borderRadius: 14,
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    height: 55,
    width: "80%",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterIcon: {
    marginTop: 10,
    height: 55,
    width: 50,
  },
  filterContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 15,
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
    color: "white", // Active text color
  },
});
