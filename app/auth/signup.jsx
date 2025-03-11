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
import { useSignupMutation } from "@/redux/api/authApi";

const SignupScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async () => {
    // Validate fields
    if (!username || !email || !password || !confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      // Call the signup endpoint with provided credentials
      const userData = await signup({ username, email, password }).unwrap();
      console.log("Signup successful:", userData);
      // Clear input fields and error message
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorMsg("");
      // Navigate to login screen (or another screen if desired)
      navigation.navigate("login");
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg(error.data?.message || "Signup failed. Please try again.");
    }
  };

  const handleLogin = () => {
    navigation.navigate("login");
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
      <CustomText text={"Signup"} style={styles.title} />
      <CustomText
        text={"Start Your Plantify Journey Today!"}
        style={styles.subtitle}
      />
      <CustomInput
        label="Username"
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <CustomInput
        label="Email"
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomPasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
      />
      <CustomPasswordInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      <CustomButton
        onPress={handleSubmit}
        style={styles.button}
        text={isLoading ? "Signing up..." : "Sign Up"}
      />
      <Text style={styles.footertitle} className='text-center'>
        Already have an account on { '\n'}Plantify Seller?{" "}
        <Text style={styles.clickText} onPress={handleLogin}>
          log-in{" "}
        </Text>
        now!
      </Text>
    </View>
  );
};

export default SignupScreen;

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
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
