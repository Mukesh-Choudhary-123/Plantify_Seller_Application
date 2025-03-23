import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomText from "../components/CustomText";
import CustomPasswordInput from "../components/CustomPasswordInput";
import {
  useFonts,
  Philosopher_400Regular,
  Philosopher_400Regular_Italic,
  Philosopher_700Bold,
  Philosopher_700Bold_Italic,
} from "@expo-google-fonts/philosopher";
import { useLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import NotApproved from "../screens/NotApproved";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("seller123@gmail.com");
  const [password, setPassword] = useState("Qwert@123");
  const [errorMsg, setErrorMsg] = useState("");

  // Destructure the login function and mutation status from the hook
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async () => {
    // Basic validation
    if (!email || !password) {
      setErrorMsg("Please fill in both fields.");
      return;
    }
    try {
      // Attempt login with credentials
      const userData = await login({ email, password }).unwrap();
      console.log("User:", userData);
      // Clear the fields on success
      console.log("isApproved:- ", userData?.isApproved);
      // setEmail("");
      // setPassword("");
      setErrorMsg("");
      dispatch(
        setCredentials({
          sellerId: userData.sellerId,
          token: userData.token,
          isApproved: userData.isApproved,
        })
      );
      if (userData?.isApproved) {
        navigation.reset({ index: 0, routes: [{ name: "tabs" }] });
      } else {
        navigation.navigate(NotApproved);
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Login failed. Please check your credentials.");
    }
  };

  const handleSignUp = () => {
    navigation.navigate("signup");
  };

  let [fontsLoaded] = useFonts({
    Philosopher_400Regular,
    Philosopher_400Regular_Italic,
    Philosopher_700Bold,
    Philosopher_700Bold_Italic,
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/favicon.png")}
        style={styles.logo}
      />
      <CustomText text={"PLANTIFY SELLER"} style={styles.heading} />
      <CustomText text={"Login"} style={styles.title} />
      <CustomText
        text={"Plantify Sellers - Cultivating Success!"}
        style={styles.subtitle}
      />
      <CustomInput
        label="Email"
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        // error={errorMsg}
      />
      <CustomPasswordInput value={password} onChangeText={setPassword} />
      <CustomButton
        onPress={handleSubmit}
        style={styles.button}
        text={isLoading ? "Logging in..." : "Log In"}
      />
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      <Text style={styles.footertitle}>
        New to Plantify Seller?{" "}
        <Text style={styles.clickText} onPress={handleSignUp}>
          Sign-up
        </Text>{" "}
        now!
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: "20%",
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    textAlign: "center",
  },
  logo: {
    height: 60,
    width: 73,
    alignSelf: "center",
  },
  heading: {
    fontFamily: "Philosopher_700Bold",
    fontSize: 30,
    color: "#002140",
    alignSelf: "center",
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "800",
    color: "grey",
  },
  subtitle: {
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  footertitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    alignSelf: "center",
  },
  clickText: {
    fontSize: 16,
    color: "#0D986A",
    textDecorationLine: "underline",
  },
  errorText: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});
