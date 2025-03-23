import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const CustomLoader = ({ color = "#fff" }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={color} />
        <Text style={[styles.loadingText, { color: color }]}>Loading...</Text>
      </View>
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loaderContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
