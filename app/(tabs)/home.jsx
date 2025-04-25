import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useFonts,
  Philosopher_400Regular,
  Philosopher_700Bold,
} from "@expo-google-fonts/philosopher";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";

import CustomHeader from "../components/CustomHeader";
import ProductCard from "../components/CustomProductList";
import { useGetProductsQuery } from "../../redux/api/productApi";
import EmptyCart from "../../assets/animation/EmptyCart.json";
import { colors } from "../../constant";

const { width, height } = Dimensions.get("window");
const OPTION_WIDTH = 100;
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const sellerId = useSelector((state) => state.auth.sellerId);

  // Refs
  const filterListRef = useRef(null);
  const onEndReachedCalledDuringMomentum = useRef(true);

  // Fonts
  let [fontsLoaded] = useFonts({ Philosopher_400Regular, Philosopher_700Bold });

  // Pagination and filter state
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch products
  const { data, isLoading, isError } = useGetProductsQuery({
    sellerId,
    page,
    limit: 5,
    search: searchQuery,
    category: selectedOption,
  });

  // Reset when search/filter changes
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [searchQuery, selectedOption]);

  // Append new data
  useEffect(() => {
    if (data?.products) {
      setProducts((prev) =>
        page === 1 ? data.products : [...prev, ...data.products]
      );
      setHasMore(page < data.totalPages);
    }
    setIsFetching(false);
  }, [data]);

  const loadMoreProducts = () => {
    if (!isFetching && hasMore) {
      setIsFetching(true);
      setPage((prev) => prev + 1);
    }
  };

  const handleClearFilter = () => {
    setSearchInput("");
    setSelectedOption("");
    filterListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const onSelectOption = (option, index) => {
    setSelectedOption(option);
    filterListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <CustomHeader color="#56D1A7" />

      {/* Search & Filters */}
      <View style={styles.headerContainer}>
        <View style={styles.searchRow}>
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
              value={searchInput}
              onChangeText={setSearchInput}
            />
          </View>
          <TouchableOpacity
            onPress={handleClearFilter}
            style={[
              styles.filterIcon,
              selectedOption && { backgroundColor: "#0D986A" },
            ]}
          >
            <Feather name="filter" size={24} color="#002140" />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={filterListRef}
          horizontal
          data={options}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, idx) => ({
            length: OPTION_WIDTH,
            offset: OPTION_WIDTH * idx,
            index: idx,
          })}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedOption === item && styles.activeFilterButton,
              ]}
              onPress={() => onSelectOption(item, index)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedOption === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#56D1A7" />
        </View>
      )}

      {/* Product List */}
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
        ListEmptyComponent={() =>
          !isLoading && (
            <View style={styles.emptyContainer}>
              <LottieView
                source={EmptyCart}
                autoPlay
                loop
                style={styles.lottie}
              />
              <Text style={styles.emptyText}>No Products Yet</Text>
            </View>
          )
        }
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current) {
            loadMoreProducts();
            onEndReachedCalledDuringMomentum.current = true;
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (isFetching) {
            return (
              <View style={styles.footerLoading}>
                <ActivityIndicator size="small" />
                <Text style={styles.footerLoadingText}>loading more...</Text>
              </View>
            );
          }
          if (!hasMore && products.length) {
            return <Text style={styles.noMoreText}>No more products</Text>;
          }
          return null;
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("ProductOperation", { work: "add" })}
      >
        <Feather name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: { paddingHorizontal: 10, paddingTop: 10  ,marginBottom:10},
  searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    height: 55,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: "#002140" },
  filterIcon: {
    width: 55,
    height: 55,
    marginLeft: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
  },
  filterButton: {
    width: OPTION_WIDTH,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  activeFilterButton: { backgroundColor: "#0D986A" },
  filterText: { color: "#002140", fontSize: 14 },
  activeFilterText: { color: "#fff", fontWeight: "bold" },
  loadingOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
  },
  footerLoading: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  footerLoadingText: { marginLeft: 8, fontSize: 16, color: "#002140" },
  noMoreText: { textAlign: "center", padding: 10, color: "#888" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#666", marginTop: 20 },
  lottie: { width: width * 0.8, height: height * 0.5 },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0D986A",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default HomeScreen;
