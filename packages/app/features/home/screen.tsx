import {
  Anchor,
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  useToastController,
  XStack,
  YStack,
  Input,
  Image,
  useToastState,
  Toast,
  H3,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React, { useState, useEffect } from 'react'
import { Dimensions, View } from 'react-native'
import { Link, useLink } from 'solito/link'
import { useRouter } from 'solito/router'
import { useAuth, useSignIn, useSignUp } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export function HomeScreen({ setEmail, setActiveUser }) {
  const router = useRouter()
  const linkProps = useLink({
    href: '/user/nate',
  })

  const { width, height } = Dimensions.get('window')
  const { isSignedIn } = useAuth()
  const { signIn, setActive, isLoaded } = useSignIn()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [bgColor, setBgColor] = useState('red' as any)
  const [hasPassword, setHasPassword] = useState(false)
  const [userFound, setUserFound] = useState(false)
  const [createPassword, setCreatePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [foundUser, setFoundUser] = useState(null)
  const toast = useToastController()
  const { signUp, setActive: signUpActive } = useSignUp()

  useEffect(() => {
    if (isSignedIn) {
      router.replace('dashboard')
    }
  }, [isSignedIn])

  const onSignInPress = async () => {
    if (!isLoaded) {
      return
    }

    const { data } = await supabase.from('users').select().eq('email', emailAddress)
    if (data[0] && !hasPassword && !userFound) {
      console.log(data)
      const hasPassword = data[0].has_password
      setHasPassword(hasPassword)
      setActiveUser(data[0])
      setUserFound(true)
      return
    }

    if (hasPassword) {
      signInWithPassword()
    } else {
      createPasswordForUser()
    }
  }

  const createPasswordForUser = async () => {
    try {
      const user = await signUp.create({
        emailAddress,
        password: newPassword,
      })

      // console.log({ user, organization })
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
      await onPressVerify()
      const { data } = await supabase
        .from('users')
        .update({ has_password: true })
        .eq('email', emailAddress)
      // setBgColor('green')
      toast.show('Success!', {
        title: 'Success',
        message: 'You have been signed in!',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: '#72CE7F',
      })
      // This is an important step,
      // This indicates the user is signed in
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

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      router.replace('dashboard')

      // const { data } = await supabase.from('users').select() // Correct
      // organization !== '' && joinCode === '' ?

      console.log(error)
      await signUpActive({ session: completeSignUp.createdSessionId })
      router.replace('dashboard')

      toast.show('Success!', {
        title: 'Success',
        message: 'You have successfully signed up!',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: '#72CE7F',
      })
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const signInWithPassword = async () => {
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      })
      setEmail(emailAddress)
      setBgColor('green')
      toast.show('Success!', {
        title: 'Success',
        message: 'You have been signed in!',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: '#72CE7F',
      })
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId })
    } catch (err: any) {
      console.log(err)
      if (!err.errors) {
        return
      }
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
      <YStack padding={40} space="$4" maw={400}>
        <H3>Log In to Your Account</H3>
        {!pendingVerification && (
          <>
            <Input
              value={emailAddress}
              onChangeText={(emailAddress) => setEmailAddress(emailAddress.toLowerCase())}
              placeholder="Email..."
            />
            {hasPassword && (
              <>
                <View style={{ height: 16 }}></View>
                <Input
                  value={password}
                  placeholder="Password..."
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                />
              </>
            )}
            {!hasPassword && userFound && (
              <>
                <View style={{ height: 16 }}></View>
                <Input
                  value={newPassword}
                  placeholder="New Password..."
                  secureTextEntry={true}
                  onChangeText={(newPassword) => setNewPassword(newPassword)}
                />
                <View style={{ height: 16 }}></View>
                <Input
                  value={confirmPassword}
                  placeholder="Confirm Password..."
                  secureTextEntry={true}
                  onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                />
              </>
            )}
            <View style={{ height: 16 }}></View>
            <View space="$2" justifyContent="flex-end">
              <Anchor style={{ color: 'blue', fontSize: 16 }} href="/forgot-password">
                Forgot Password?
              </Anchor>
            </View>
            <View style={{ height: 16 }}></View>
            <Button
              backgroundColor={'#67c962'}
              shadowColor={'black'}
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
                  <Button padding={5} circular={true}></Button>
                  <View style={{ width: 10 }}></View>
                  <Button padding={5} circular={true}></Button>
                </XStack>
              </YStack>
            </XStack>
            <YStack alignItems="center" space="$4" maw={600}>
              <Paragraph>
                New to our app?
                <Anchor style={{ color: 'blue', textDecorationLine: 'underline' }} href="/signup">
                  {' '}
                  Sign Up
                </Anchor>
              </Paragraph>
            </YStack>
          </>
        )}
        {pendingVerification && (
          <YStack padding={40} space="$4" maw={400}>
            <Paragraph>
              We sent a verification code to{' '}
              <Paragraph fontWeight={'bold'}>{emailAddress}</Paragraph>
            </Paragraph>
            <YStack>
              <Input value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} />
            </YStack>
            <Button
              backgroundColor={'#67c962'}
              shadowColor={'black'}
              shadowOpacity={0.5}
              shadowRadius={5}
              shadowOffset={{ width: 0, height: 0 }}
              onPress={onPressVerify}
              borderRadius={50}
              textProps={{ color: 'white' }}
            >
              <Paragraph color={'white'}>Verify Email</Paragraph>
            </Button>
          </YStack>
        )}
        <CurrentToast />
      </YStack>
    </>
  )
}

const CurrentToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      shadowColor={'black'}
      shadowOpacity={0.5}
      shadowRadius={5}
      shadowOffset={{ width: 0, height: 0 }}
      y={0}
      opacity={1}
      scale={1}
      viewportName={currentToast.viewportName}
      width={Dimensions.get('window').width}
      borderRadius={0}
      backgroundColor={'green'}
    >
      <YStack>
        <Toast.Title fontWeight={'bold'} color={'white'}>
          {currentToast.title}
        </Toast.Title>
        {!!currentToast.message && (
          <Toast.Description color={'white'}>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}
