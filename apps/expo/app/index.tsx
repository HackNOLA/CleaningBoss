import { useSignIn, useAuth } from '@clerk/clerk-expo'
import {
  XStack,
  YStack,
  Paragraph,
  Input,
  Button,
  H3,
  useToastController,
  useToastState,
  Toast,
} from '@my/ui'
import { Stack, Link, router } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { Dimensions, View, LogBox } from 'react-native'

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications

export default function Screen() {
  const { width, height } = Dimensions.get('window')
  const { isSignedIn } = useAuth()
  const { signIn, setActive, isLoaded } = useSignIn()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [bgColor, setBgColor] = useState('red' as any)
  const toast = useToastController()

  useEffect(() => {
    if (isSignedIn) {
      router.replace('bottomnav')
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
      setBgColor('green')
      toast.show('Success!', {
        title: 'Success',
        message: 'You have been signed in!',
        duration: 4000,
        viewport: 'screen',
      })
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId })
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2))
      toast.show('Wait!', {
        title: 'Error',
        message: err.errors[0].message,
        duration: 4000,
        viewport: 'screen',
      })
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
      <YStack top={height / 3} padding={40} space="$4" maw={400}>
        <H3>Log In to Your Account</H3>
        <Input
          value={emailAddress}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress.toLowerCase())}
          placeholder="Email..."
        />
        <Input
          value={password}
          placeholder="Password..."
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
        />
        <View style={{ height: 2 }} />
        <XStack space="$2" justifyContent="flex-end">
          <Link style={{ color: 'blue', fontSize: 16 }} href="/forgot-password">
            Forgot Password?
          </Link>
        </XStack>
        <Button
          backgroundColor="#67c962"
          shadowColor="black"
          borderRadius={50}
          onPress={onSignInPress}
          textProps={{ color: 'white' }}
          space="$4"
        >
          LOG IN
        </Button>
        <XStack space="$2" justifyContent="center">
          <YStack alignItems="center" space="$4" maw={600}>
            <Paragraph>or</Paragraph>
            <XStack space="$2">
              <Button padding={5} circular />
              <View style={{ width: 10 }} />
              <Button padding={5} circular />
            </XStack>
          </YStack>
        </XStack>
        <YStack alignItems="center" space="$4" maw={600}>
          <Paragraph>
            New to our app?
            <Link style={{ color: 'blue', textDecorationLine: 'underline' }} href="/signup">
              {' '}
              Sign Up
            </Link>
          </Paragraph>
        </YStack>
        <CurrentToast bgColor={bgColor} />
      </YStack>
    </>
  )
}

const CurrentToast = ({ bgColor }) => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      shadowColor="black"
      shadowOpacity={0.5}
      shadowRadius={5}
      shadowOffset={{ width: 0, height: 0 }}
      y={0}
      opacity={1}
      scale={1}
      viewportName={currentToast.viewportName}
      width={Dimensions.get('window').width}
      borderRadius={0}
      backgroundColor={bgColor}
    >
      <YStack>
        <Toast.Title fontWeight="bold" color="white">
          {currentToast.title}
        </Toast.Title>
        {!!currentToast.message && (
          <Toast.Description color="white">{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}
