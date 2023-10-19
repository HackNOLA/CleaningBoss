import { Button, Paragraph, useToastController, YStack, Input, Toast } from '@my/ui'
import React, { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { Stack, Link, router } from 'expo-router'
import { Dimensions } from 'react-native'

export default function Screen() {
  const { width, height } = Dimensions.get('window')
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const { show } = useToastController()

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // change the UI to our pending section.
      setPendingVerification(true)
    } catch (err: any) {
      show({
        title: 'Error',
        message: err.message,
        duration: 4000,
        viewport: 'screen',
      })
      console.log(JSON.stringify(err, null, 2))
    }
  }

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      await setActive({ session: completeSignUp.createdSessionId })
      router.replace('dashboard')
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
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
      <>
        {!pendingVerification && (
          <YStack top={height / 2} padding={40} space="$4" maw={400}>
            <Input
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
            <Input
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <Button
              backgroundColor={'#86C562'}
              shadowColor={'black'}
              shadowOpacity={0.5}
              shadowRadius={5}
              shadowOffset={{ width: 0, height: 0 }}
              onPress={onSignUpPress}
              borderColor={'black'}
            >
              Sign Up
            </Button>
            <YStack alignItems="center" space="$4" maw={600}>
              <Paragraph>
                Already have an account? <Link href="/">Sign in</Link>
              </Paragraph>
            </YStack>
            <Toast></Toast>
          </YStack>
        )}
        {pendingVerification && (
          <YStack top={height / 2} padding={40} space="$4" maw={400}>
            <YStack>
              <Input value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} />
            </YStack>
            <Button onPress={onPressVerify}>
              <Paragraph>Verify Email</Paragraph>
            </Button>
          </YStack>
        )}
      </>
    </>
  )
}
