import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";

const CustomText = ({ text, style, fontFamily, ...props }) => {
  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      style={[
        styles.text,
        style,
      ]}
      {...props}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default CustomText;
