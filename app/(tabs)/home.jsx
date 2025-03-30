import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomBanner from "../components/CustomBanner";
import CustomHeader from "../components/CustomHeader";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useGetProductsQuery } from "../../redux/api/productApi";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomLoader from "../components/CustomLoader";
import ProductCard from "../components/CustomProductList";
import { colors } from "../../constant";
import LottieView from "lottie-react-native";
import EmptyCart from "../../assets/animation/EmptyCart.json";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const sellerId = useSelector((state) => state.auth.sellerId);
  const onEndReachedCalledDuringMomentum = useRef(true);

  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });

  // Pagination and filter state
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    "Top Pick",
    "Indoor",
    "Outdoor",
    "Fertilizer",
    "Plants",
    "Flowers",
    "Herbs",
    "Seeds",
    "Fruits",
    "Vegetables",
  ];

  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    sellerId,
    page,
    limit: 5,
    search,
    category: selectedOption,
  });

  // Reset pagination and products when filter or search changes
  // In your useEffect for filter changes
  useEffect(() => {
    // Cancel pending requests if filter changes
    const abortController = new AbortController();

    setPage(1);
    setProducts([]);
    setHasMore(true);

    return () => abortController.abort();
  }, [search, selectedOption]);

  const handleClearFilter = () => {
    setSearch("");
    setSelectedOption("");
    setPage(1);
    setProducts([]);
    setHasMore(true);
    setIsFetching(true); // Force loading state
  };

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) =>
        page === 1 ? data.products : [...prev, ...data.products]
      );
      setHasMore(page < data.totalPages);
    }
    setIsFetching(false);
  }, [data]);

  console.log("Data :- ", data);
  console.log("Number's of products  :- ", data?.products?.length);
  console.log("Page :- ", page);

  const loadMoreProducts = () => {
    if (!isFetching && hasMore && !onEndReachedCalledDuringMomentum.current) {
      setIsFetching(true);
      setPage((prev) => prev + 1);
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  const renderHeader = () => (
    <View>
      {/* <CustomBanner /> */}
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

  return (
    <View style={styles.container}>
      {/* <CustomHeader /> */}
      <CustomHeader color="#56D1A7" />
     

      {isLoading ? (
        <View style={{ marginTop: "70%" }}>
          <ActivityIndicator size="large" color="#56D1A7" />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: 600,
              color: "#002140",
            }}
          >
            Loading...
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
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
          ListHeaderComponent={renderHeader}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            if (isFetching) {
              return (
                <View style={styles.footer}>
                  <ActivityIndicator size="small" color="#000" />
                  <Text style={styles.footerText}>loading more...</Text>
                </View>
              );
            }
            if (!hasMore && products.length > 0) {
              return <Text style={styles.noMoreText}>No more products</Text>;
            }
            return null;
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
       {data?.products?.length === 0 && (
        <View>
          <LottieView source={EmptyCart} autoPlay loop style={styles.lottie} />
          <Text style={{ alignSelf: "center", fontSize: 18, marginTop: -60 }}>
            No Products Yet
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("ProductOperation", { work: "add" })}
        style={styles.addButton}
      >
        <Feather name="plus" size={40} color="white" />
      </TouchableOpacity>
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
  footer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
  },
  footerText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#002140",
  },
  noMoreText: {
    textAlign: "center",
    padding: 10,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
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
    marginHorizontal: 10,
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
    alignItems: "center",
  },
});

export default HomeScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#002140",
//     borderRadius: 14,
//     marginHorizontal: 10,
//     marginTop: 10,
//     paddingHorizontal: 10,
//     height: 55,
//     width: "80%",
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//   },
//   filterIcon: {
//     marginTop: 10,
//     height: 55,
//     width: 50,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     marginTop: 10,
//     marginHorizontal: 15,
//   },
//   filterButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#002140",
//     marginLeft: 7,
//   },
//   activeFilterButton: {
//     backgroundColor: "#0D986A",
//     borderColor: "#0D986A",
//   },
//   filterText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#002140",
//   },
//   activeFilterText: {
//     color: "white",
//   },
//   addButton: {
//     height: 60,
//     width: 60,
//     backgroundColor: "#0D986A",
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     marginRight: 10,
//     marginBottom: 10,
//     elevation: 5,
//     borderRadius: 16,
//     justifyContent: "center",
//   },
// });
