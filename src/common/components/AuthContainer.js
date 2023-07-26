import React from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";

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
});
