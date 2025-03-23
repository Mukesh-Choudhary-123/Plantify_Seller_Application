import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import CustomBanner from "../components/CustomBanner";
import CustomProductList from "../components/CustomProductList";
import CustomHeader from "../components/CustomHeader";
import CustomShape from "../components/CustomShape";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useGetProductsQuery } from "../../redux/api/productApi";
import CustomButton from "../components/CustomButton";
import plusIcon from "../../assets/images/plusIcon.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomLoader from "../components/CustomLoader";

const ListedScreen = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });

  const sellerId = useSelector((state) => state.auth.sellerId);
  // console.log("seller-ID", sellerId);

  // Get products and refetch function from RTK Query
  const { data, isLoading, isError, refetch } = useGetProductsQuery(sellerId);
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

  // State to control the pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleAdd = () => {
    navigation.navigate("ProductOperation", {
      work: "add",
    });
  };

  return (
    <View style={styles.container}>
      {/* {isLoading && <CustomLoader />} */}
      <CustomHeader />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
        <View style={{ marginBottom: 10 }}>
          {isLoading ? (
            <View style={{marginTop:"50%"}}>
              <CustomLoader color="black" />  
            </View>
          ) : (
            <>
              {data?.products && data.products.length > 0 ? (
                <CustomProductList data={data.products} />
              ) : (
                <Text style={{ textAlign: "center", marginTop: "50%" }}>
                
                  No Listed Product
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
        <Feather
          name="plus"
          size={40}
          color={"white"}
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>
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
    color: "white",
  },
  addButton: {
    height: 60,
    width: 60,
    backgroundColor: "#0D986A",
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 10,
    marginBottom: 10,
    elevation: 5,
    borderRadius: 16,
    justifyContent: "center",
  },
});
