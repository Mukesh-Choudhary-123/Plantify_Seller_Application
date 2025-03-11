import { FlatList, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "../components/CustomText";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import CustomModal from "./CustomModal";

const CustomDropdown = ({
  label = "Label",
  error,
  placeholder = "Enter text...",
  value,
  style,
  inputLabelText,
  selectedItem,
  handleSelect,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const handlePress = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  const indiaStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const options = [
    // ...data.map((item) => ({ id: item, name: item })),
    ...indiaStates.map((state) => ({ id: state, name: state })),
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(selectedItem);
  useEffect(() => {
    setSelectedOption(selectedItem);
  }, [selectedItem]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectOption = (item) => {
    setSelectedOption(item);
    handleSelect(item);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.dropDownContainer, { style }]}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomText text={placeholder} style={{ color: "grey" }} />
            <FontAwesome name="angle-down" size={25} color={"grey"} />
          </View>
        </TouchableOpacity>
      </View>
      {/* <CustomModal isVisible={isVisible} /> */}
      <View style={styles.container}>
        <Modal transparent visible={isVisible} animationType="slide">
          <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View style={styles.modal}>
                  <Text style={styles.title}>Select {inputLabelText}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      setSearch("");
                      setIsVisible(false);
                      Keyboard.dismiss();
                    }}
                  >
                    <FontAwesome name="times" size={24} color="#000" />
                  </TouchableOpacity>

                  <View style={styles.searchContainer}>
                    <EvilIcons name="search" size={28} color="#777E8A" />
                    <TextInput
                      style={styles.searchInput}
                      placeholder={`Search ${inputLabelText}`}
                      placeholderTextColor="#777E8A"
                      value={search}
                      onChangeText={setSearch}
                    />
                  </View>
                  <FlatList
                    data={filteredOptions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => handleSelectOption(item.name)}
                      >
                        <FontAwesome
                          name={
                            selectedOption === item.name
                              ? "check-circle"
                              : "circle-thin"
                          }
                          size={24}
                          color={
                            selectedOption === item.name ? "#0072A5" : "#000"
                          }
                        />
                        <Text style={styles.optionText}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    style={styles.optionList}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 12,
    marginVertical: 6,
  },
  container: { width: "100%" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    width: "100%",
    maxHeight: "60%",
    minHeight: "30%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  closeButton: {
    marginTop: -30,
    alignSelf: "flex-end",
  },
  title: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    margin: 25,
    paddingHorizontal: 10,
  },
  searchInput: { width: "100%", padding: 10 },
  optionList: { width: "100%" },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: { marginLeft: 10, fontSize: 16, fontWeight: "400" },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    // borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    height: 42,
    fontSize: 16,
    color: "#111827",
  },
  dropDownContainer: {
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    height: 42,
    fontSize: 16,
    color: "lightgrey",
    justifyContent: "center",
  },
});
