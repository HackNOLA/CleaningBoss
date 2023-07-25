import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AuthContainer() {
  return (
    <>
      <View
        style={[
          stylesheet.style_Cleaning_boss,
          { display: "flex", flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Text
          style={[
            stylesheet.style_Cleaning_boss,
            {
              position: "relative",
              flexGrow: 1,
              left: 0,
              top: 0,
              height: "auto",
              transform: [{ translateX: 0 }, { translateY: 0 }],
            },
          ]}
        >
          Cleaning boss
        </Text>
      </View>
    </>
  );
}

const stylesheet = StyleSheet.create({
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
});
