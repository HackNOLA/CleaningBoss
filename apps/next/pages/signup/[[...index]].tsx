import {
  Button,
  Paragraph,
  useToastController,
  YStack,
  Input,
  Toast,
  H3,
  XStack,
  Anchor,
} from '@my/ui'
import React, { useState, useEffect, useContext } from 'react'
import { useSignUp, useAuth } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import { Alert, Dimensions, View } from 'react-native'
import { createClient } from '@supabase/supabase-js'
import { Link } from 'solito/link'
import Image from 'next/image'
import { CurrentToast } from '../../components/CurrentToast'
import { v4 as uuidv4 } from 'uuid'
import { UserContext } from 'context/usercontext'
import { OrgContext } from 'context/orgcontext'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export default function Screen() {
  const { width, height } = Dimensions.get('window')
  const { isLoaded, signUp, setActive } = useSignUp()
  const { isSignedIn } = useAuth()
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
  const router = useRouter()
  const { activeUser, setEmail } = useContext(UserContext)
  const { setOrgName } = useContext(OrgContext)

  useEffect(() => {
    if (isSignedIn) {
      router.replace('dashboard')
    }
  }, [isSignedIn])

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

      // console.log({ user, organization })
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

      const role = organization !== '' && joinCode === '' ? 'admin' : 'user'
      const { error: userError } = await supabase.from('users').insert({
        first_name: firstName,
        last_name: lastName,
        email: emailAddress,
        role: role,
        has_password: true,
      })
      const { error: orgError } = await supabase.from('company').insert({
        name: organization,
        join_code: uuidv4().slice(0, 8),
      })

      setOrgName(organization)
      setEmail(emailAddress)

      router.replace('dashboard')

      // const { data } = await supabase.from('users').select() // Correct
      // organization !== '' && joinCode === '' ?

      console.log(userError, orgError)
      await setActive({ session: completeSignUp.createdSessionId })
      router.replace('/dashboard')
      toast.show('Success!', {
        title: 'Success',
        message: 'You have successfully signed up!',
        duration: 4000,
        viewport: 'screen',
      })
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <>
      <>
        <Image src={'/auth_splash.png'} width={600} height={200} alt="splash" />
        {!pendingVerification && (
          <YStack padding={40} space="$4" maw={400}>
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
                    {/* <Button onPress={reset}>Reset</Button> */}
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
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                />
                <Input
                  value={confirmedPassword}
                  placeholder="Confirm Password..."
                  placeholderTextColor="#000"
                  secureTextEntry={true}
                  onChangeText={(confirmedPassword) => setConfirmedPassword(confirmedPassword)}
                />
              </YStack>
            )}

            <>
              <Button
                backgroundColor={'#67c962'}
                shadowColor={'black'}
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
                  <Button padding={5} circular={true}></Button>
                  <View style={{ width: 10 }}></View>
                  <Button padding={5} circular={true}></Button>
                </XStack>
              </YStack>
            </XStack>
            <YStack alignItems="center" space="$4" maw={600}>
              <Paragraph>
                Already have an account?{' '}
                <Anchor style={{ color: 'blue', textDecorationLine: 'underline' }} href="/">
                  {' '}
                  Log In
                </Anchor>
              </Paragraph>
            </YStack>
            {/* <Toast></Toast> */}
          </YStack>
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
        <CurrentToast bgColor={bgColor} />
      </>
    </>
  )
}
