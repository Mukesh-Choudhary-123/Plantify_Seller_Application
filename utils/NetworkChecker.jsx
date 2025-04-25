import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { View, Text, Modal, StyleSheet } from "react-native";

const NetworkChecker = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {!isConnected && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>No Internet Connection</Text>
              <Text style={styles.message}>
                Please turn on your internet to use the app.
              </Text>
            </View>
          </View>
        </Modal>
      )}
      {isConnected && children}
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default NetworkChecker;
