import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import CustomInput from "../components/CustomInput";
import CustomDropdown from "../components/CustomDropdown";
import CustomButton from "../components/CustomButton";
import { Entypo } from "@expo/vector-icons";

const ProductOperation = ({ route }) => {
  const { productId, cardColor, work } = route.params;
  console.log("productId", productId);
  console.log("cardColor", cardColor);
  console.log("work", work);

  const handleImageUpload = () => {};
  return (
    <>
      <CustomHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container]}>
          {work === "edit" ? (
            <Text style={styles.heading}>Edit Product</Text>
          ) : (
            <Text style={styles.heading}>List New Product</Text>
          )}
          <CustomInput
            label="Title"
            placeholder="Plant Name"
            mandatory={true}
          />
          <CustomInput
            label="Subtitle"
            placeholder="Plant Benefit"
            mandatory={true}
          />
          <CustomDropdown label="Category" placeholder="Select Category" />
          <CustomInput
            label="Price"
            placeholder="Plant Price"
            mandatory={true}
          />
          <CustomInput
            label="Plant Bio"
            placeholder="Write description"
            mandatory={true}
          />
          <CustomInput
            label="Scientific Name"
            placeholder="Plant scientific name"
            mandatory={true}
          />
          <CustomInput
            label="Origin"
            placeholder="Plant origined"
            mandatory={true}
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
                  fontWeight: 700,
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
              <Entypo
                name="upload"
                size={70}
                color={"grey"}
                style={{ alignSelf: "center" }}
              />
              <Text
                style={{ alignSelf: "center", fontWeight: 600, color: "grey" }}
              >
                Upload Image
              </Text>
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
          />
          <CustomInput
            label="Light"
            placeholder="Light exposure level 1-100"
            keyboardType="numeric"
          />
          <CustomInput
            label="Fertilizer"
            placeholder="Fertilizer dosage (in grams)"
            keyboardType="numeric"
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
          <CustomInput label="Watering" placeholder="Watering Insruction" />
          <CustomInput label="Sunlight" placeholder="Sunlight Insruction" />
          <CustomInput label="Fertilizer" placeholder="Fertilizer Insruction" />
          <CustomInput label="Soil" placeholder="Soil Insruction" />
          {/* Image */}

          <CustomInput
            label="Temperature"
            keyboardType="numeric"
            placeholder="Ideal Temperature °C"
          />
          <CustomInput
            label="Humidity"
            placeholder="eg. Low to moderate humidity"
          />
          <CustomInput label="Toxicity" placeholder="eg. Non-toxic to pets" />
          <View style={{ marginVertical: 20 }}>
            <CustomButton text={work === "edit" ? "Save" : "Create"} />
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
