import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { ClerkProvider } from "@clerk/clerk-expo";

export default function HomeLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })
  const scheme = useColorScheme()
  

  if (!loaded) {
    return null
  }
  return (
    <Provider>
      {/* <ClerkProvider publishableKey={"pk_test_Zmx1ZW50LXBpZy01Ny5jbGVyay5hY2NvdW50cy5kZXYk"}> */}
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
      </ThemeProvider>
      {/* </ClerkProvider> */}
    </Provider>
  )
}
