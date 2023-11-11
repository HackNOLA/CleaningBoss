import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image, Select } from '@my/ui'
import TopBar from 'components/topbar'
import Selection from 'components/select'
import Radio from 'components/radiogroup'

const AddAUser: NextPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [language, setLanguage] = useState('')
  const [passwordOptions, setPasswordOptions] = useState([
    { label: 'Set for User', value: 'auto' },
    // { label: 'Send Email', value: 'custom' },
    // { label: "Don't set", value: 'custom' },
  ])
  const [userTypes, setUserTypes] = useState([
    { label: 'Cleaner', value: 'cleaner' },
    { label: 'Supervisor', value: 'cleaner' },
    { label: 'Admin', value: 'admin' },
  ])

  const [timeTrialOptions, setTimeTrialOptions] = useState([
    { label: 'No', value: 'No' },
    { label: 'Yes', value: 'Yes' },
  ])

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollPosition])

  const onSelectLanguage = (language: string) => {
    setLanguage(language)
  }

  return (
    <YStack justifyContent="center" alignItems="center">
      <View width={'100%'}>{scrollPosition < 20 && <TopBar title="Add a User" />}</View>
      <YStack space="$6" top={160} justifyContent="center" alignItems="center">
        <XStack space="$8" padding={4}>
          <YStack space="$2">
            <Text fontSize={16}>First Name</Text>
            <Input width={140} placeholder="First Name" />
          </YStack>
          <YStack space="$2">
            <Text fontSize={16}>Last Name</Text>
            <Input width={140} placeholder="Last Name" />
          </YStack>
        </XStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Email Address</Text>
          <Input width={320} placeholder="email@domain" />
        </YStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Photo</Text>
          <XStack space="$2" alignItems="flex-start">
            <YStack space="$2" alignItems="flex-start">
              <Image width={100} height={100} source={{ uri: '/photo.svg' }} />
            </YStack>
            <YStack space="$2" alignItems="flex-start">
              <XStack space="$2">
                <Image width={32} height={32} source={{ uri: '/plus.svg' }} />
                <Text fontSize={16}>Upload Photo</Text>
              </XStack>
            </YStack>
          </XStack>
        </YStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Language</Text>

          <Selection
            items={['English', 'Espanol', 'Francios']}
            onChange={onSelectLanguage}
            value={language}
            placeholder="Tap to Select Language"
          />
        </YStack>
        {/* <Radio items={passwordOptions} onChange={() => {}} selectedVal={'cleaner'} /> */}
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Password</Text>
          <Input width={320} placeholder="Set Password" />
        </YStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>User Type</Text>
        </YStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Calculate Drive Times Between Shifts</Text>
        </YStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Require Time Trials</Text>
        </YStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Locations</Text>
        </YStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Availability</Text>
        </YStack>
      </YStack>

      {scrollPosition < 20 && (
        <div
          style={{ zIndex: 99 }}
          className="fixed bottom-0 left-0 right-0 h-24 bg-white  shadow-lg flex items-center justify-around"
        >
          <YStack space="$2" alignItems="center">
            <XStack space="$4">
              <Button borderColor={'#33CC4B'} width={150} borderRadius={50}>
                <Text fontSize={16}>Cancel</Text>
              </Button>
              <Button width={150} borderRadius={50} backgroundColor={'#33CC4B'}>
                <Text color="white" fontSize={16}>
                  Add User
                </Text>
              </Button>
            </XStack>
          </YStack>
        </div>
      )}
    </YStack>
  )
}

export default AddAUser
