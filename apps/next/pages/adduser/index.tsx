import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image, Select } from '@my/ui'
import TopBar from 'components/topbar'
import Selection from 'components/select'
import Radio from 'components/radiogroup'
import { on } from 'events'

const AddAUser: NextPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [language, setLanguage] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('')
  const [calculateDriveTimes, setCalculateDriveTimes] = useState('')
  const [timeTrialOption, setTimeTrialOption] = useState('')
  const [locationSet, setLocationSet] = useState(false)
  const [locations, setLocations] = useState([])
  const [availability, setAvailability] = useState([
    { day: 'Mon', selected: false },
    { day: 'Tue', selected: false },
    { day: 'Wed', selected: false },
    { day: 'Thu', selected: false },
    { day: 'Fri', selected: false },
    { day: 'Sat', selected: false },
    { day: 'Sun', selected: false },
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

  const onSelectPassword = (password: string) => {
    setPassword(password)
  }

  const onSelectUserType = (userType: string) => {
    setUserType(userType)
  }

  const onSelectCalculateDriveTimes = (calculateDriveTimes: string) => {
    setCalculateDriveTimes(calculateDriveTimes)
  }

  const onSelectTimeTrialOption = (timeTrialOption: string) => {
    setTimeTrialOption(timeTrialOption)
  }

  const setAvailabilitySlot = (day: string) => {
    const newAvailability = availability.map((slot) => {
      if (slot.day === day) {
        slot.selected = !slot.selected
      }
      return slot
    })
    setAvailability(newAvailability)
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
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Password</Text>
          <Input onChangeText={onSelectPassword} width={320} placeholder="Set Password" />
        </YStack>
        <YStack space="$2" alignItems="flex-start" width={'100%'}>
          <Text fontSize={16}>Select the account type:</Text>
          <Radio
            items={['admin', 'cleaner', 'manager']}
            onChange={onSelectUserType}
            selectedVal={userType}
          />
        </YStack>
        <YStack space="$2" alignItems="flex-start" width={'100%'}>
          <Text fontSize={16}>Calculate Drive Times Between Shifts</Text>
          <Selection
            items={['Yes', 'No']}
            onChange={onSelectCalculateDriveTimes}
            value={calculateDriveTimes}
            placeholder="No"
          />
        </YStack>
        <YStack space="$2" alignItems="flex-start" width={'100%'}>
          <Text fontSize={16}>Require Time Trials</Text>
          <Selection
            items={['Yes', 'No']}
            onChange={onSelectTimeTrialOption}
            value={timeTrialOption}
            placeholder="No"
          />
        </YStack>
        <XStack space="$2" justifyContent="space-between">
          <Text fontSize={16}>Locations</Text>
          <Image width={32} height={32} source={{ uri: '/plus.svg' }} />
          {locationSet && (
            <Input
              width={320}
              placeholder="Address"
              onChangeText={(location) => {
                locations.push(location)
                setLocations(locations)
              }}
            />
          )}
        </XStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Availability</Text>
          <XStack space="$2" justifyContent="center">
            {availability.map((slot, i) => (
              <Button
                onPress={() => {
                  setAvailabilitySlot(slot.day)
                }}
                key={`${i}`}
                width={50}
                height={50}
                circular={true}
                borderColor={slot.selected ? '#3373CC' : '#000000'}
                borderWidth={slot.selected ? 3 : 1}
              >
                <Text color="black">{slot.day}</Text>
              </Button>
            ))}
          </XStack>
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
