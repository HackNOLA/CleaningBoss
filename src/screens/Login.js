import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Fontisto } from "@expo/vector-icons";

import { useFonts } from "@expo-google-fonts/dev";
import AuthContainer from "../common/components/AuthContainer";
import NeumorphicInput from "../common/components/Input";
import LoginImage from "../common/components/LoginImage";
import TextLogo from "../common/components/TextLogo";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [fontsLoaded] = useFonts({});
  const navigation = useNavigation();

  const handleEmail = (text) => {
    setEmail(text);
  };

  const handlePassword = (text) => {
    setPassword(text);
  };

  return (
    <View style={stylesheet.background}>
      <LinearGradient
        // Background Linear Gradient
        style={stylesheet.background}
        colors={["#1A2DDACB", "transparent"]}
      >
        <LoginImage />
        <View>
          <TextLogo />
        </View>
        <AuthContainer>
          {/* Email */}
          <View>
            <View style={[stylesheet.pd, { paddingTop: 50 }]} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: 20,
                alignItems: "baseline",
              }}
            >
              <Fontisto name="email" size={24} color="black" />
              <View style={{ padding: 5 }} />
              <TextInput
                value={email}
                style={[stylesheet.input]}
                placeholder="Email"
                onChangeText={handleEmail}
              />
            </View>
          </View>
          {/* Email */}
          {/* Password */}
          <View>
            <View style={[stylesheet.pd]} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingLeft: 24,
                alignItems: "baseline",
              }}
            >
              <FontAwesome name="lock" size={26} color="black" />
              <View style={{ padding: 5 }} />
              <TextInput
                value={password}
                style={[stylesheet.input]}
                placeholder=" Password"
                onChangeText={handlePassword}
              />
            </View>
          </View>
          {/* Password */}
          {/* Forgot Password */}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={[stylesheet.pd]} />
            <Text style={[stylesheet.style_Forgot_Password_]}>
              Forgot Password?
            </Text>
          </View>
          {/* Forgot Password */}
          {/* Login */}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={[stylesheet.pd]} />
            <TouchableHighlight
              onPress={() => console.log(email, password)}
              style={{
                backgroundColor: "#23E342",
                borderRadius: 20,
                width: 100,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
            </TouchableHighlight>
          </View>
          {/* Login */}
          {/* Signup */}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 15,
            }}
          >
            <TouchableHighlight
              onPress={() => navigation.navigate("Onboarding")}
              style={{
                borderRadius: 20,
                width: 100,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#23E342", fontWeight: "bold" }}>
                Signup
              </Text>
            </TouchableHighlight>
          </View>
          {/* Signupå */}
        </AuthContainer>

        {/* Other Auth /> */}
        <View>
          <View
            style={[
              stylesheet.pd,
              { flexDirection: "row", alignSelf: "center", bottom: 50 },
            ]}
          >
            {/* three circles for social auth icons */}
            <TouchableHighlight style={{ right: 80 }}>
              <FontAwesome name="google" size={24} color="black" />
            </TouchableHighlight>
            <TouchableHighlight>
              <FontAwesome name="apple" size={24} color="black" />
            </TouchableHighlight>
            <TouchableHighlight style={{ left: 80 }}>
              <FontAwesome name="twitter" size={24} color="black" />
            </TouchableHighlight>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  pd: {
    height: 40,
  },
  background: {
    display: "flex",
    flex: 1,
  },

  style_Forgot_Password_: {
    fontSize: 14,
    color: "black",
  },
  input: {
    width: "75%",
    height: 30,
    // borderRadius: 20,
    backgroundColor: "#F0F0F000", // Light background color
    shadowColor: "#B9A5A5", // Light shadow color
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    paddingLeft: 15,
    fontSize: 16,
    color: "#333",
  },
});
