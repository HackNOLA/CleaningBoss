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
import AuthContainer from "./src/common/components/AuthContainer";
import NeumorphicInput from "./src/common/components/Input";

export default function App() {
  let [fontsLoaded] = useFonts({});

  return (
    <View style={stylesheet.background}>
      <LinearGradient
        // Background Linear Gradient
        style={stylesheet.background}
        colors={["#1A2DDAD2", "transparent"]}
      >
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
              <Text style={{ color: "#23E342" }}>Signup</Text>
            </TouchableHighlight>
          </View>
          {/* Signupå */}
        </AuthContainer>
        {/* <Text style={{ fontSize: 123 }}> HELLLL</Text> */}
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
  style_log_in_: {
    alignContent: "center",
  },
  style_Ellipse_12: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 0,
    left: 50,
    right: "auto",
    top: 726,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
  },
  style_image_3: {
    position: "absolute",
    width: 21.568626403808594,
    height: 22,
    borderRadius: 0,
    opacity: 1,
    left: 71,
    right: "auto",
    top: 747,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(0,0,0,0)",
  },
  style_Ellipse_13: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 0,
    left: 166,
    right: "auto",
    top: 726,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
  },
  style_Ellipse_14: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 0,
    left: 275,
    right: "auto",
    top: 726,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
  },
  style_or: {
    position: "absolute",
    width: "auto",
    height: "auto",
    left: 189,
    right: "auto",
    top: 690,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    fontWeight: 400,
    textDecorationLine: "none",
    fontSize: 14,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 0.1,
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

    borderRadius: 20,
    opacity: 1,

    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  style_image_1: {
    position: "absolute",
    width: 22.545454025268555,
    height: 24,
    borderRadius: 0,
    opacity: 1,
    left: 87,
    right: "auto",
    top: 426,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(0,0,0,0)",
  },
  style_Password: {
    position: "absolute",
    width: "auto",
    height: "auto",
    left: 131,
    right: "auto",
    top: 494,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    fontWeight: 400,
    textDecorationLine: "none",
    fontSize: 14,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
  style_Signup: {},
  style_image_2: {
    position: "absolute",
    width: 18.18181800842285,
    height: 16,
    borderRadius: 0,
    opacity: 1,
    left: 277,
    right: "auto",
    top: 490,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(0,0,0,0)",
  },
  style_Ellipse_15: {
    position: "absolute",
    width: 125,
    height: 122,
    borderRadius: 0,
    left: 149,
    right: "auto",
    top: 131,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
  },
  style_Forgot_Password_: {
    fontSize: 14,
    color: "black",
  },
  style_Rectangle_11: {
    position: "absolute",
    width: 128,
    height: 32,
    borderRadius: 35,
    opacity: 1,
    left: 131,
    right: "auto",
    top: 582,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(35, 227, 65, 1)",
  },
  style_Login: {
    position: "absolute",
    width: 82,
    height: 13,
    left: 156,
    right: "auto",
    top: 591,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    fontWeight: 400,
    textDecorationLine: "none",
    fontSize: 16,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
  style_Cleaning_boss: {
    position: "absolute",
    width: "auto",
    height: "auto",
    left: "auto",
    right: 46,
    top: "auto",
    bottom: 521,
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    fontWeight: 400,
    textDecorationLine: "none",
    fontSize: 32,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
  style__Pngtree_vector_lock_icon_3782160_1: {
    position: "absolute",
    width: 15.483871459960938,
    height: 24,
    borderRadius: 0,
    opacity: 1,
    left: 92,
    right: "auto",
    top: 487,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(0,0,0,0)",
  },
  style_Email: {
    position: "absolute",
    width: "auto",
    height: "auto",
    left: 129,
    right: "auto",
    top: 430,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    fontWeight: 400,
    textDecorationLine: "none",
    fontSize: 14,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
  style_image_4: {
    position: "absolute",
    width: 17.9072265625,
    height: 22,
    borderRadius: 0,
    opacity: 1,
    left: 187,
    right: "auto",
    top: 745,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(0,0,0,0)",
  },
  style_twitter_logo: {
    position: "absolute",
    width: 21,
    height: 22,
    borderRadius: 0,
    opacity: 1,
    left: 296,
    right: "auto",
    top: 747,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(0,0,0,0)",
  },
  style_Company_Settings: {
    position: "absolute",
    width: 393,
    height: 852,
    borderRadius: 0,
    overflow: "hidden",
    left: 98,
    right: "auto",
    top: 1008,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
const imageUrlstyle_Ellipse_12 = "undefined";
const imageUrlstyle_Ellipse_14 = "undefined";
const imageUrlstyle_Ellipse_13 = "undefined";
const imageUrlstyle_image_2 = "undefined";
const imageUrlstyle_twitter_logo = "undefined";
const imageUrlstyle_image_3 = "undefined";
const imageUrlstyle_Ellipse_15 = "undefined";
const imageUrlstyle__Pngtree_vector_lock_icon_3782160_1 = "undefined";
const imageUrlstyle_image_1 = "undefined";
const imageUrlstyle_image_4 = "undefined";
