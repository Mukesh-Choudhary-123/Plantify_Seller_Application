import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const CustomPasswordInput = ({ label = "Password", placeholder = "Enter password", onChangeText , value,...props }) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureText}
          style={styles.input}
          value={value}
        onChangeText={onChangeText}
          {...props}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons 
            name={secureText ? "eye-off" : "eye"} 
            size={24} 
            color="#6B7280" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

CustomPasswordInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CustomPasswordInput;

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
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    height: 42,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: "#111827",
  },
});
