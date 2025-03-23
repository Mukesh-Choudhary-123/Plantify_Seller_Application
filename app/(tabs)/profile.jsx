import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import { useFonts, Philosopher_700Bold } from "@expo-google-fonts/philosopher";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "expo-router";
import { useLogoutMutation } from "../../redux/api/authApi";
import { logout } from "../../redux/slices/authSlice";


const ProfileScreen = () => {
  let [fontsLoaded] = useFonts({
    Philosopher_700Bold,
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [triggerLogout, { isLoading, error }] = useLogoutMutation();
  const userData = {
    username: "Plantify Selle",
    email: "seller@gmail.com",
  };
const username = useSelector((state) => state.auth.username);
const email = useSelector((state) => state.auth.email);
  

  const handleLogout = async () => {
    try {
      await triggerLogout().unwrap();
      dispatch(logout());
      navigation.reset({ index: 0, routes: [{ name: "auth" }] });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <CustomHeader color="#56D1A7" />
        <View style={styles.profileContent}>
          <View style={styles.userDetails}>
            <View>
            <Text style={styles.username}>{username || userData.username}</Text>
            <Text style={styles.email}>{email || userData.email}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.editText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  profileHeader: {
    backgroundColor: "#56D1A7",
    paddingBottom: 15,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },

  logoutButton: {
    marginTop:5,
    height:40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#002140",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#002140",
  },
  editText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  userDetails: {
    // marginTop: 20,
    flexDirection: "row",
    justifyContent:"space-around"
  },
  username: {
    fontSize: 24,
    color: "#002140",
    fontFamily: "Philosopher_700Bold",
    marginBottom: 3,
  },
  email: {
    fontSize: 16,
    color: "#002140",
  },
});


