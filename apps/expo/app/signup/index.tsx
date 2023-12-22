import { useSignUp } from '@clerk/clerk-expo'
import {
  Button,
  Paragraph,
  useToastController,
  YStack,
  Input,
  Toast,
  H3,
  XStack,
  useToastState,
} from '@my/ui'
import { createClient } from '@supabase/supabase-js'
import { Stack, Link, router } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { Dimensions, View } from 'react-native'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export default function Screen() {
  const { height } = Dimensions.get('window')
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [organization, setOrganization] = useState('')
  const [joinCode, setJoinCode] = useState('' as any)
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [bgColor, setBgColor] = useState('red' as any)
  const [stepOneFinished, setStepOneFinished] = useState(false)
  const [stepTwoFinished, setStepTwoFinished] = useState(false)
  const [native, setNative] = React.useState(false)
  const toast = useToastController()

  useEffect(() => {
    const getData = async () => {
      console.log(error)
    }
    getData()
  }, [isLoaded, stepOneFinished, stepTwoFinished])

  const reset = () => {
    setEmailAddress('')
    setPassword('')
    setConfirmedPassword('')
    setFirstName('')
    setLastName('')
    setOrganization('')
    setPendingVerification(false)
    setStepOneFinished(false)
    setCode('')
  }

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    if (!firstName || !lastName || !organization) {
      toast.show('Hold on!', {
        message: 'You must fill out all fields to continue.',
        toastType: 'info',
        native: false,
      })
    }

    if (lastName && firstName && organization && !stepOneFinished) {
      setStepOneFinished(true)
      return
    }
    if (emailAddress && password && confirmedPassword) {
      setStepTwoFinished(true)
    }

    if (password !== confirmedPassword) {
      toast.show('Hold on!', {
        message: 'Passwords do not match',
        toastType: 'info',
        native: false,
      })
      return
    }

    try {
      const user = await signUp.create({
        emailAddress,
        password,
      })

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setBgColor('green')

      // change the UI to our pending section.
      setPendingVerification(true)
    } catch (err: any) {
      toast.show('Wait!', {
        title: 'Error',
        message: err.errors[0].message,
        duration: 4000,
        viewport: 'screen',
      })
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

      const role = organization !== '' && joinCode === '' ? 'admin' : 'user'
      const { error } = await supabase.from('users').insert({
        first_name: firstName,
        last_name: lastName,
        email: emailAddress,
        role,
      })

      // const { data } = await supabase.from('users').select() // Correct
      // organization !== '' && joinCode === '' ?

      console.log(error)
      await setActive({ session: completeSignUp.createdSessionId })
      toast.show('Success!', {
        title: 'Success',
        message: 'You have successfully signed up!',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: '#72CE7F',
      })
      router.replace('bottomnav')
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
          <YStack top={height / 4} padding={40} space="$4" maw={400}>
            <XStack
              space="$4"
              justifyContent="space-between"
              alignItems="center"
              style={{ marginBottom: 20 }}
            >
              <H3>Create an Account</H3>
              <XStack>
                {!stepOneFinished && <Paragraph>Step 1/2</Paragraph>}
                {stepOneFinished && (
                  <YStack alignItems="center">
                    <Button onPress={reset}>Reset</Button>
                    <Paragraph>Step 2/2</Paragraph>
                  </YStack>
                )}
              </XStack>
            </XStack>
            {!stepOneFinished && (
              <YStack space="$4">
                <Input
                  autoCapitalize="none"
                  value={firstName}
                  placeholder="First Name..."
                  onChangeText={(firstName) => setFirstName(firstName)}
                />
                <Input
                  autoCapitalize="none"
                  value={lastName}
                  placeholder="Last Name..."
                  onChangeText={(lastName) => setLastName(lastName)}
                />
                <Input
                  autoCapitalize="none"
                  value={organization}
                  placeholder="Your Organization's Name..."
                  onChangeText={(organization) => setOrganization(organization)}
                />
                <Paragraph>or</Paragraph>
                <Input
                  autoCapitalize="none"
                  value={joinCode}
                  placeholder="Join Code..."
                  onChangeText={(joinCode) => setJoinCode(joinCode)}
                />
              </YStack>
            )}
            {stepOneFinished && (
              <YStack space="$4">
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
                  secureTextEntry
                  onChangeText={(password) => setPassword(password)}
                />
                <Input
                  value={confirmedPassword}
                  placeholder="Confirm Password..."
                  placeholderTextColor="#000"
                  secureTextEntry
                  onChangeText={(confirmedPassword) => setConfirmedPassword(confirmedPassword)}
                />
              </YStack>
            )}

            <>
              <Button
                backgroundColor="#67c962"
                shadowColor="black"
                shadowOpacity={0.5}
                shadowRadius={5}
                shadowOffset={{ width: 0, height: 0 }}
                onPress={onSignUpPress}
                borderRadius={50}
                textProps={{ color: 'white' }}
              >
                CONTINUE
              </Button>
            </>

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
                Already have an account?{' '}
                <Link style={{ color: 'blue', textDecorationLine: 'underline' }} href="/">
                  {' '}
                  Log In
                </Link>
              </Paragraph>
            </YStack>
            <Toast />
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
        <CurrentToast bgColor={bgColor} />
      </>
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
