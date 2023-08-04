import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";

export default function NeumorphicInput({ children, ...props }) {
  return (
    <TextInput style={[stylesheet.input]} placeholder={props.placeholder} />
  );
}

const stylesheet = StyleSheet.create({
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
