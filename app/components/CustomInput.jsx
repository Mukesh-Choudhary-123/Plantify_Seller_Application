import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';


const CustomInput = ({ label = "Label",error,keyboardType='default',mandatory=false, placeholder = "Enter text...", onChangeText ,value,style, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={{flexDirection:"row", justifyContent:"space-between",paddingHorizontal:5}}>
      <Text style={styles.label}>{label}{mandatory && <Text style={{color:"red", fontWeight:700,fontSize:18 ,marginTop:10}}>*</Text>}</Text>
      <Text style={styles.errorText}>{ error}</Text>
      </View>
      <TextInput onChangeText={onChangeText} value={value} keyboardType={keyboardType} placeholder={placeholder} style={[styles.input,{style}]} {...props} />
    </View>
  );
};


export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 12,
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: "#374151",
    marginBottom: 6,
  }, errorText: {
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
});
