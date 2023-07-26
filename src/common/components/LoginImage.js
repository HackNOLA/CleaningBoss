import { StyleSheet, View, Image } from "react-native";
import BackgroundImage from "../../../assets/login_image.png";

export default function LoginImage() {
  return (
    <View>
      <Image source={BackgroundImage} style={styles.style_background_image} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 539.028,
    height: 555,
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    flexGrow: 0,
  },
  style_background_image: {
    position: "absolute",
  },
});
