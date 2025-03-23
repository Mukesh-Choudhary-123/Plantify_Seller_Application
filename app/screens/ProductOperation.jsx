import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomDropdown from "../components/CustomDropdown";
import CustomButton from "../components/CustomButton";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useCreateProductMutation, useEditProductMutation, useProductDetailsQuery } from "../../redux/api/productApi";
import { uploadImageToCloudinary } from "../../constant/uploadImageToCloudinary";
import { useNavigation } from "@react-navigation/native";
import CustomLoader from "../components/CustomLoader";
import { useSelector } from "react-redux";

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

const ProductOperation = ({ route }) => {
  const { productId, cardColor, work } = route.params;
  const navigation = useNavigation();
  const sellerId = useSelector((state) => state.auth.sellerId);

  // Use create or edit mutation based on the mode
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation();

  const id = productId;
  console.log("Work :-",work)
  // Use product details query only when editing
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useProductDetailsQuery(id, { skip: work !== "edit" });
  const [isUploading, setIsUploading] = useState(false);
  
  console.log("Product Price-> ",productData?.product)
  // Form fields state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [origin, setOrigin] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [water, setWater] = useState("");
  const [light, setLight] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [watering, setWatering] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [fertilizerInsruction, setFertilizerInsruction] = useState("");
  const [soil, setSoil] = useState("");
  const [temperature, setTemperature] = useState();
  const [humidity, setHumidity] = useState("");
  const [toxicity, setToxicity] = useState("");

  // When editing, prefill the form with fetched product details
  useEffect(() => {
    if (work === "edit" && productData) {
      setTitle(productData.product.title || "");
      setSubtitle(productData.product.subtitle || "");
      setCategory(productData.product.category || "");
      setPrice(productData.product.price?.toString() || "0");
      setStock(productData.product.stock?.toString() || "0");
      setDescription(productData.product.description || "");
      setScientificName(productData.product.scientificName || "");
      setOrigin(productData.product.origin || "");
      // You may choose to set imageUri if you want to display the existing thumbnail
      setImageUri(productData.product.thumbnail || null);
      if (productData.product.overview) {
        setWater(productData.product.overview.water?.toString() || "");
        setLight(productData.product.overview.light?.toString() || "");
        setFertilizer(productData.product.overview.fertilizer?.toString() || "");
      }
      if (productData.product.careInstructions) {
        setWatering(productData.product.careInstructions.watering || "");
        setSunlight(productData.product.careInstructions.sunlight || "");
        setFertilizerInsruction(productData.product.careInstructions.fertilizer || "");
        setSoil(productData.product.careInstructions.soil || "");
      }
      setTemperature(productData.product.idealTemperature?.toString() || "");
      setHumidity(productData.product.humidity || "");
      setToxicity(productData.product.toxicity || "");
    }
  }, [work, productData]);

  const handleSelect = (selectedItem) => {
    setCategory(selectedItem);
    console.log("Selected category:", selectedItem);
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Permission to access the gallery is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      console.log("Selected image URI:", selectedImageUri);
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = null;
      if (imageUri) {
        setIsUploading(true);
        try {
          imageUrl = await uploadImageToCloudinary(imageUri);
        } finally {
          setIsUploading(false);
        }
      }
      console.log("Image Cloudinary URL:", imageUrl);
      const productPayload = {
        seller: sellerId,
        title,
        description,
        details: description,
        price: Number(price),
        stock: Number(stock),
        category,
        thumbnail: imageUrl,
        scientificName,
        origin,
        subtitle,
        overview: {
          water: Number(water),
          light: Number(light),
          fertilizer: Number(fertilizer),
        },
        careInstructions: {
          watering,
          sunlight,
          fertilizer: fertilizerInsruction,
          soil,
        },
        idealTemperature: temperature,
        humidity,
        toxicity,
      };

      if (work === "edit") {
        // Call edit mutation with product ID and updated data
        const result = await editProduct({ id: productId, updatedProduct: productPayload }).unwrap();
        console.log("Product updated successfully:", result);
      } else {
        // Call create mutation for new product
        const result = await createProduct(productPayload).unwrap();
        console.log("Product created successfully:", result);
      }
      navigation.reset({
        index: 0,
        routes: [{ name: "tabs", params: { screen: "Listed" } }],
      });
    } catch (err) {
      console.error("Failed to submit product:", err);
      Alert.alert("Error", "Failed to submit product. Please try again.");
    }
  };

  // Display loader while uploading image, fetching product details or submitting
  // if (isUploading || isCreating || (work === "edit" && isProductLoading)) {
  //   return <CustomLoader />;
  // }

  if (work === "edit" && isProductError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading product details.</Text>
      </View>
    );
  }
  return (
    <>
      {(isUploading || isCreating || (work === "edit" && isProductLoading)) && <CustomLoader />}
      <CustomHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container]}>
          {work === "edit" ? (
            <Text style={styles.heading}>Edit Product</Text>
          ) : (
            <Text style={styles.heading}>New Product</Text>
          )}
          <CustomInput
            label="Title"
            placeholder="Plant Name"
            mandatory={true}
            value={title}
            onChangeText={setTitle}
          />
          <CustomInput
            label="Subtitle"
            placeholder="Plant Benefit"
            mandatory={true}
            value={subtitle}
            onChangeText={setSubtitle}
          />
          <CustomDropdown
            label="Category"
            option={options}
            selectedItem={category}
            inputLabelText="Category"
            handleSelect={handleSelect}
            placeholder="Select Category"
          />
          <CustomInput
            label="Price"
            placeholder="Plant Price"
            mandatory={true}
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />
          <CustomInput
            label="Stock"
            placeholder="Plant Stock"
            mandatory={true}
            value={stock}
            keyboardType="numeric"
            onChangeText={setStock}
          />
          <CustomInput
            label="Plant Bio"
            placeholder="Write description"
            mandatory={true}
            value={description}
            onChangeText={setDescription}
          />
          <CustomInput
            label="Scientific Name"
            placeholder="Plant scientific name"
            mandatory={true}
            value={scientificName}
            onChangeText={setScientificName}
          />
          <CustomInput
            label="Origin"
            placeholder="Plant origined"
            mandatory={true}
            value={origin}
            onChangeText={setOrigin}
          />
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#374151",
                marginTop: 10,
                marginLeft: 15,
              }}
            >
              Image
              <Text
                style={{
                  color: "red",
                  fontWeight: "700",
                  fontSize: 18,
                  marginTop: 10,
                }}
              >
                *
              </Text>
            </Text>
            <TouchableOpacity
              style={{
                height: 160,
                width: 160,
                backgroundColor: "#F3F4F6",
                borderRadius: 12,
                justifyContent: "center",
                marginLeft: 15,
                marginTop: 10,
              }}
              onPress={handleImageUpload}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 160, height: 160, borderRadius: 12 }}
                />
              ) : (
                <>
                  <Entypo
                    name="upload"
                    size={70}
                    color="grey"
                    style={{ alignSelf: "center" }}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      fontWeight: "600",
                      color: "grey",
                    }}
                  >
                    Upload Image
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 10,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Overview
          </Text>
          <CustomInput
            label="water"
            placeholder="Water in ml per week"
            keyboardType="numeric"
            value={water}
            onChangeText={setWater}
          />
          <CustomInput
            label="Light"
            placeholder="Light exposure level 1-100"
            keyboardType="numeric"
            value={light}
            onChangeText={setLight}
          />
          <CustomInput
            label="Fertilizer"
            placeholder="Fertilizer dosage (in grams)"
            keyboardType="numeric"
            value={fertilizer}
            onChangeText={setFertilizer}
          />
          <Text
            style={{
              alignSelf: "center",
              marginTop: 10,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Care Instructions
          </Text>
          <CustomInput
            label="Watering"
            value={watering}
            onChangeText={setWatering}
            placeholder="Watering Insruction"
          />
          <CustomInput
            label="Sunlight"
            value={sunlight}
            onChangeText={setSunlight}
            placeholder="Sunlight Insruction"
          />
          <CustomInput
            label="Fertilizer"
            value={fertilizerInsruction}
            onChangeText={setFertilizerInsruction}
            placeholder="Fertilizer Insruction"
          />
          <CustomInput
            label="Soil"
            value={soil}
            onChangeText={setSoil}
            placeholder="Soil Insruction"
          />

          <CustomInput
            label="Temperature"
            value={temperature}
            onChangeText={setTemperature}
            keyboardType="numeric"
            placeholder="Ideal Temperature °C"
          />
          <CustomInput
            label="Humidity"
            value={humidity}
            onChangeText={setHumidity}
            placeholder="eg. Low to moderate humidity"
          />
          <CustomInput
            label="Toxicity"
            value={toxicity}
            onChangeText={setToxicity}
            placeholder="eg. Non-toxic to pets"
          />
          <View style={{ marginVertical: 20 }}>
            <CustomButton
              text={work === "edit" ? "Save" : "Create"}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProductOperation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 600,
  },
});
