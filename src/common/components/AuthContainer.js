import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Fontisto } from "@expo/vector-icons";

import { useFonts } from "@expo-google-fonts/dev";
import NeumorphicInput from "./Input";
import LoginImage from "./LoginImage";
import TextLogo from "./TextLogo";

export default function AuthContainer({ children }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View style={[stylesheet.style_or]}>{children}</View>
    </View>
  );
}

function Auth() {
  return (
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
          <NeumorphicInput placeholder="Email" />
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
          <NeumorphicInput placeholder=" Password" />
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
          style={{
            borderRadius: 20,
            width: 100,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#23E342", fontWeight: "bold" }}>Signup</Text>
        </TouchableHighlight>
      </View>
      {/* Signupå */}
    </AuthContainer>
  );
}

const stylesheet = StyleSheet.create({
  style_or: {
    // position: "absolute",
    backgroundColor: "#ffffff",
    height: "45%",
    width: "80%",
    top: "15%",
    borderRadius: 20,
    shadowColor: "#bfbfbf", // Light shadow color
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  style_background_image: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: 488.22662353515625,
    height: 506.2002258300781,
    borderRadius: 0,
    left: -12.45977783203125,
    right: "auto",
    top: -60,
    bottom: "auto",
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { rotate: "6.071466494606925deg" },
    ],
  },
  style_Rectangle_10: {
    position: "absolute",
    width: 293,
    height: 315,
    borderRadius: 20,
    opacity: 1,
    left: 57,
    right: "auto",
    top: 370,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  background: {
    display: "flex",
    flex: 1,
  },
  style_Forgot_Password_: {
    fontSize: 14,
    color: "black",
  },
});
