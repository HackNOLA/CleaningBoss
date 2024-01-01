import type { NextPage } from 'next'
import { useState, useEffect, useContext } from 'react'
import { Input, XStack, YStack, Text, View, Button, Image, useToastController } from '@my/ui'
import TopBar from 'components/topbar'
import Selection from 'components/select'
import { createClient } from '@supabase/supabase-js'
import { CurrentToast } from 'components/CurrentToast'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { OrgContext } from 'context/orgcontext'
import supabase from 'context/supabasecontext'

const AddAUser: NextPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [photo, setPhoto] = useState('')
  const [language, setLanguage] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('')
  const [calculateDriveTimes, setCalculateDriveTimes] = useState('')
  const [timeTrialOption, setTimeTrialOption] = useState('')
  const [locationQuanity, setLocationQuantity] = useState(0)
  const [availabilityQuantity, setAvailabilityQuantity] = useState(0)
  const [locations, setLocations] = useState([])
  const [availability, setAvailability] = useState([
    { day: 'Mon', selected: false, from: '', to: '' },
    { day: 'Tue', selected: false, from: '', to: '' },
    { day: 'Wed', selected: false, from: '', to: '' },
    { day: 'Thu', selected: false, from: '', to: '' },
    { day: 'Fri', selected: false, from: '', to: '' },
    { day: 'Sat', selected: false, from: '', to: '' },
    { day: 'Sun', selected: false, from: '', to: '' },
  ])
  const [foundUser, setFoundUser] = useState('')
  const toast = useToastController()
  const router = useRouter()
  const { org } = useContext(OrgContext)

  useEffect(() => {
    if (router.isReady) {
      // Code using query

      const { id } = router.query
      //grab user with id
      if (!foundUser) {
        const getUser = async () => {
          const { data: user } = await supabase.from('users').select().eq('id', id)
          if (!user) return
          setFoundUser(user[0])
          setEmailAddress(user[0].email)
          setFirstName(user[0].first_name)
          setLastName(user[0].last_name)
          setLanguage(user[0].language)
          setUserType(user[0].role)
          setCalculateDriveTimes(user[0].calculate_drive_times)
          setTimeTrialOption(user[0].time_trialed)
          setLocations(user[0].location)
          setAvailability(user[0].availability)
          setPhoto(user[0].profile_pic)
        }

        getUser()
      }
    }
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollPosition, availability])

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

  const locationSetter = (quantity: number) => {
    return [...Array(quantity)].map((_, i) => (
      <YStack key={`${i}`} space="$2" alignItems="flex-start">
        <Text fontSize={16}>Location {i + 1}</Text>
        <Input
          onChangeText={(location) => {
            const newLocations = locations
            newLocations[i] = location
            setLocations(newLocations)
          }}
          width={320}
          placeholder="Location Name"
        />
      </YStack>
    ))
  }

  const dayTimeSetter = (quantity: any) => {
    //if a day is selected, make input field appear to select time range for that day
    return [...Array(quantity)].map((_, i) => {
      if (availability[i]?.selected) {
        return (
          <YStack key={`${i}`} space="$2" alignItems="flex-start" paddingBottom={20}>
            <Text fontSize={16}>{availability[i].day}</Text>
            <XStack space="$4" alignItems="flex-end">
              <Input
                width={140}
                placeholder="From"
                onChangeText={(from) => {
                  const newAvailability = availability.map((slot) => {
                    if (slot.day === availability[i].day) {
                      slot.from = from
                    }
                    return slot
                  })
                  setAvailability(newAvailability)
                }}
              />
              <Input
                width={140}
                placeholder="To"
                onChangeText={(to) => {
                  const newAvailability = availability.map((slot) => {
                    if (slot.day === availability[i].day) {
                      slot.to = to
                    }
                    return slot
                  })
                  setAvailability(newAvailability)
                }}
              />
            </XStack>
          </YStack>
        )
      }
    })
  }

  const submitUser = async () => {
    const user = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      profile_pic: photo,
      language: language,
      role: userType,
      time_trialed: timeTrialOption === 'Yes' ? true : false,
      location: locations,
      availability: availability,
      subscribed: true,
      has_password: false,
      id_company: org?.id,
    }

    //submit user to database
    const { error } = await supabase.from('users').update(user).eq('id', foundUser.id)

    console.log(error)
    toast?.show('Success!', {
      title: 'Success',
      message: `You have successfully edited ${foundUser.first_name} ${foundUser.last_name} profile!`,
      duration: 4000,
      viewport: 'screen',
      backgroundColor: '#72CE7F',
    })

    router.replace('/dashboard')
  }

  return (
    <YStack justifyContent="center" alignItems="center">
      <View width={'100%'}>{scrollPosition < 20 && <TopBar title="Edit User" page={10} />}</View>
      <CurrentToast />
      <YStack space="$6" top={160} justifyContent="center" alignItems="center">
        <XStack space="$8" padding={4}>
          <YStack space="$2">
            <Text fontSize={16}>First Name</Text>
            <Input
              onChangeText={setFirstName}
              value={firstName}
              width={140}
              placeholder="First Name"
            />
          </YStack>
          <YStack space="$2">
            <Text fontSize={16}>Last Name</Text>
            <Input
              onChangeText={setLastName}
              value={lastName}
              width={140}
              placeholder="Last Name"
            />
          </YStack>
        </XStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Email Address</Text>
          <Input
            onChangeText={setEmailAddress}
            value={emailAddress}
            width={320}
            placeholder="email@domain"
          />
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
        {/* <YStack space="$2" alignItems="flex-start">
            <Text fontSize={16}>Password</Text>
            <Input onChangeText={onSelectPassword} width={320} placeholder="Set Password" />
          </YStack> */}
        <YStack space="$2" alignItems="flex-start" width={'100%'}>
          <Text fontSize={16}>Calculate Drive Times Between Shifts</Text>
          <Selection
            items={['Yes', 'No']}
            onChange={onSelectCalculateDriveTimes}
            value={calculateDriveTimes}
            placeholder="Calculate Drive Times?"
          />
        </YStack>
        <YStack space="$2" alignItems="flex-start" width={'100%'}>
          <Text fontSize={16}>Require Time Trials</Text>
          <Selection
            items={['Yes', 'No']}
            onChange={onSelectTimeTrialOption}
            value={timeTrialOption}
            placeholder="Select Time Trial?"
          />
        </YStack>
        <YStack space="$2" alignItems="flex-start" width={'100%'}>
          <Text fontSize={16}>Select the account type:</Text>
          <Selection
            items={['cleaner', 'admin', 'manager']}
            onChange={onSelectUserType}
            selectedVal={userType}
            placeholder="Tap to Select Account Type"
          />
        </YStack>
        <YStack space="$2" alignItems="flex-start">
          <XStack space="$2" justifyContent="space-between">
            <Text fontSize={16}>Locations</Text>
            <Image
              width={32}
              height={32}
              source={{ uri: '/plus.svg' }}
              onPress={() => {
                setLocationQuantity(locationQuanity + 1)
              }}
            />
          </XStack>
          {locationSetter(locationQuanity)}
        </YStack>
        <YStack space="$2" alignItems="flex-start">
          <Text fontSize={16}>Availability</Text>
          <XStack space="$2" justifyContent="center" paddingBottom={50}>
            {availability.map((slot, i) => (
              <Button
                onPress={() => {
                  setAvailabilitySlot(slot.day)
                  setAvailabilityQuantity(availabilityQuantity + 1)
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
          {dayTimeSetter(availabilityQuantity)}
        </YStack>
      </YStack>

      {scrollPosition < 20 && (
        <div
          style={{ zIndex: 99 }}
          className="fixed bottom-0 left-0 right-0 h-24 bg-white  shadow-lg flex items-center justify-around"
        >
          <YStack space="$2" alignItems="center">
            <XStack space="$4">
              <Button
                onPress={() => {
                  router.replace('/dashboard')
                }}
                borderColor={'#33CC4B'}
                width={150}
                borderRadius={50}
              >
                <Text fontSize={16}>Cancel</Text>
              </Button>
              <Button
                onPress={submitUser}
                width={150}
                borderRadius={50}
                backgroundColor={'#33CC4B'}
              >
                <Text color="white" fontSize={16}>
                  Save Changes
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
