import { XStack, YStack, Paragraph, Input, Button, Anchor} from 'tamagui'
import { Dimensions } from 'react-native'
import { Stack } from 'expo-router'

export default function Screen() {
  const { width, height } = Dimensions.get('window');
  
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false
        }}
      />
      <YStack top={height / 2} padding={40} space="$4" maw={400}>
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <Button
        backgroundColor={"#86C562"} 
          shadowColor={"black"}
          shadowOpacity={0.5}
          shadowRadius={5}
          shadowOffset={{ width: 0, height: 0 }}
          onPress={() => {
            console.log('pressed')
          }}
          borderColor={"black"}
        >Sign in</Button>
        <YStack alignItems='center' space="$4" maw={600}>
        <Paragraph>Don't have an account? </Paragraph>
        </YStack>
      </YStack>

    </>
  )
}
