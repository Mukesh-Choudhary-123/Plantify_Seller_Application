// import { Modal, StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// const CustomModal = ({ isVisible }) => {
//   return (
//     <Modal style={styles.container}>
//       {isVisible && <Text>hello</Text>}
//     </Modal>
//   );
// };

// export default CustomModal;

// const styles = StyleSheet.create({
//   container: {
//         flex: 1,
//       position:"absolute",
//     justifyContent: 'center',
//         alignItems: 'center',
//         height: "100%",
//         width:"100%",
//         backgroundColor: "lightgrey",
//         zIndex: 50,
    
//   },
// });


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";

const CustomModal = ({
    data,
    isVisible,
  inputLabelText,
  selectedItem,
  handleSelect,
  error = "",
  mandatory = false,
  placeholder,
  disabled = false,
}) => {
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

//   const options = data.map((item) => ({ id: item, name: item }));

  useEffect(() => {
    setSelectedOption(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [modalVisible]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectOption = (item) => {
    setSelectedOption(item);
    handleSelect(item);
    setModalVisible(false);
  };

  return (
        <View style={styles.container}>
      <Modal transparent visible={isVisible} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modal}>
                <Text style={styles.title}>Select {inputLabelText}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setSearch("");
                    setModalVisible(false);
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
                        color={selectedOption === item.name ? "#0072A5" : "#000"}
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
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: 10 },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputHeaderLeft: { flexDirection: "row" },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },
  mandatory: { color: "red", fontSize: 14, marginLeft: 2.5 },
  inputError: { color: "#810707", alignSelf: "center" },
  dropdown: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#F4F5F6",
    borderRadius: 8,
  },
  dropdownContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
  },
  selectedText: { color: "#000", fontSize: 14 },
  placeholderText: { color: "#777E8A", fontSize: 14 },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    width: "100%",
    maxHeight: "70%",
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
});

export default CustomModal;
