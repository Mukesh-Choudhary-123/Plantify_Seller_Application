import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ text = "Submit", onPress, backgroundColor = "#0D986A", textColor = "white" , style }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor } , style]} 
      onPress={onPress}
      
    >
      <Text style={[styles.text, { color:textColor } ]} >{text}</Text>
    </TouchableOpacity>
  );
};
                            
export default CustomButton;
                          
const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing:2
  },
});
