import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <View style={stylesheet.background}>
      <LinearGradient
        // Background Linear Gradient
        style={stylesheet.background}
        colors={["#1A2DDACB", "transparent"]}
      >
        <View>
          <Text>Onboarding</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#1A2DDA",
    alignItems: "center",
    justifyContent: "center",
  },
});
