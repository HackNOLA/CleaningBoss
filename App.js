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
import LoginImage from "./src/common/components/LoginImage";
import TextLogo from "./src/common/components/TextLogo";

export default function App() {
  let [fontsLoaded] = useFonts({});

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
});
