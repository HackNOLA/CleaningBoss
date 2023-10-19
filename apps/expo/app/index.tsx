import { XStack, YStack, Paragraph, Input, Button, Anchor } from 'tamagui'
import { Dimensions } from 'react-native'
import { Stack, Link, router } from 'expo-router'
import { useSignIn, useAuth } from '@clerk/clerk-expo'
import { useState, useEffect } from 'react'

export default function Screen() {
  const { width, height } = Dimensions.get('window')
  const { isSignedIn } = useAuth()
  const { signIn, setActive, isLoaded } = useSignIn()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isSignedIn) {
      router.replace('dashboard')
    }
  }, [isSignedIn])

  const onSignInPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      })
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId })
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2))
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <YStack top={height / 2} padding={40} space="$4" maw={400}>
        <Input
          value={emailAddress}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress.toLowerCase())}
          placeholder="Email..."
        />
        <Input
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Button
          backgroundColor={'#86C562'}
          shadowColor={'black'}
          shadowOpacity={0.5}
          shadowRadius={5}
          shadowOffset={{ width: 0, height: 0 }}
          onPress={onSignInPress}
          borderColor={'black'}
        >
          Sign in
        </Button>
        <YStack alignItems="center" space="$4" maw={600}>
          <Paragraph>
            Don't have an account?
            <Link href="/signup"> Register</Link>
          </Paragraph>
        </YStack>
      </YStack>
    </>
  )
}
