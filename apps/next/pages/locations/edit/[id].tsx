import type { NextPage } from 'next'
import { useState, useEffect, useContext } from 'react'
import {
  Input,
  Card,
  XStack,
  YStack,
  Text,
  View,
  Button,
  Image,
  Select,
  Toast,
  useToastController,
  TextArea,
  Paragraph,
} from '@my/ui'
import TopBar from 'components/topbar'
import Selection from 'components/select'
import { createClient } from '@supabase/supabase-js'
import { CurrentToast } from 'components/CurrentToast'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { OrgContext } from 'context/orgcontext'
import { UserContext } from 'context/usercontext'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

const EditLocation: NextPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [locationName, setLocationName] = useState('')
  const [photo, setPhoto] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [parentLocation, setParentLocation] = useState('')
  const [geofenceEnabled, setGeofenceEnabled] = useState('')
  const [locationServiceEnabled, setLocationServiceEnabled] = useState('')
  const [geofenceRadius, setGeofenceRadius] = useState('')
  const [timeTrialOption, setTimeTrialOption] = useState('')
  const [sectionQuantity, setSectionQuantity] = useState(0)
  const [offlineCheckIn, setOfflineCheckIn] = useState('')
  const [sections, setSections] = useState([])
  const [adminNotes, setAdminNotes] = useState('')
  const [cleanerNotes, setCleanerNotes] = useState('')
  const [foundLocation, setLocation] = useState(null as any)

  const [bgColor, setBgColor] = useState('green' as any)
  const toast = useToastController()
  const router = useRouter()
  const { org } = useContext(OrgContext)
  const { activeUser } = useContext(UserContext)

  useEffect(() => {
    //if a day is selected, make input field appear to select time range for that day

    if (router.isReady) {
      // Code using query

      const { id } = router.query
      //   console.log(id)
      //grab user with id
      if (!foundLocation) {
        const getLoc = async () => {
          const { data: foundLoc } = await supabase.from('location').select().eq('id', id)
          if (!foundLoc) return
          setLocation(foundLoc[0])
          setAddress1(foundLoc[0].address1)
          setAddress2(foundLoc[0].address2)
          setLocationName(foundLoc[0].name)
          setCity(foundLoc[0].city)
          setState(foundLoc[0].state)
          setZip(foundLoc[0].zip)
          setGeofenceEnabled(foundLoc[0].geofence_enabled ? 'Yes' : 'No')
          setGeofenceRadius(foundLoc[0].geofence_radius)
          setSections(foundLoc[0].sections)
          setOfflineCheckIn(foundLoc[0].offline_checkin ? 'Yes' : 'No')
          setLocationServiceEnabled(foundLoc[0].location_service ? 'Yes' : 'No')
          setAdminNotes(foundLoc[0].admin_note)
          setCleanerNotes(foundLoc[0].cleaner_note)
        }

        getLoc()
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
  }, [scrollPosition, router.isReady])

  const onSelectParentLoc = (res: string) => {
    setParentLocation(res)
  }

  const onSelectGeofence = (res: string) => {
    setGeofenceEnabled(res)
  }

  const onSelectRequireLocationServices = (res: string) => {
    setLocationServiceEnabled(res)
  }

  const onSelectOfflineCheckIn = (res: string) => {
    setOfflineCheckIn(res)
  }

  const locationSetter = (quantity: number) => {
    return [...Array(quantity)].map((_, i) => (
      <YStack key={`${i}`} space="$2" alignItems="flex-start">
        <Text fontSize={16}>Location {i + 1}</Text>
        <Input
          onChangeText={(section) => {
            const newSections = sections
            newSections[i] = section
            setSections(newSections)
          }}
          width={320}
          placeholder="Location Name"
        />
      </YStack>
    ))
  }

  const submitLocation = async () => {
    if (!Object.keys(activeUser).length || !Object.keys(org).length) return

    if (!locationName || !address1 || !city || !state || !zip || !geofenceEnabled || !sections) {
      toast?.show('Error!', {
        title: 'Error',
        message: 'Please fill out all required fields',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: '#F09797',
      })
      return
    }

    const location = {
      address1,
      address2,
      photo,
      city,
      state,
      zip,
      name: locationName,
      geofence_enabled: geofenceEnabled === 'Yes' ? true : false,
      sections,
      offline_checkin: offlineCheckIn === 'Yes' ? true : false,
      location_service: locationServiceEnabled === 'Yes' ? true : false,
      admin_note: adminNotes,
      cleaner_note: cleanerNotes,
      id_creator: activeUser?.id,
      id_company: org?.id,
    }

    console.log(location)
    //submit user to database
    const { error } = await supabase.from('location').update(location).eq('id', foundLocation.id)

    if (error) {
      toast?.show('Error!', {
        title: 'Error',
        message: 'There was an error creating your location',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: '#F09797',
      })
      return
    }

    console.log(error)
    toast?.show('Success!', {
      title: 'Success',
      message: 'You have successfully edited the location!',
      duration: 4000,
      viewport: 'screen',
      backgroundColor: '#66D276',
    })

    router.replace('/dashboard')
  }

  return (
    <YStack justifyContent="center" alignItems="center">
      {foundLocation && (
        <>
          <View width={'100%'}>{scrollPosition < 20 && <TopBar title="Edit Location" />}</View>
          <CurrentToast bgColor={bgColor} />
          <YStack space="$6" top={160} justifyContent="center" alignItems="flex-start">
            <YStack space="$2" alignItems="flex-start">
              <Text fontSize={16}>Has Parent Location?</Text>
              <Selection items={['Yes', 'No']} placeholder="Select" />
            </YStack>
            <YStack space="$2">
              <Text fontSize={16}>Business Name</Text>
              <Input
                onChangeText={setLocationName}
                value={locationName}
                width={320}
                placeholder="Location/Client Name"
              />
            </YStack>
            <YStack space="$2" alignItems="flex-start">
              <Text fontSize={16}>Photo</Text>
              <YStack space="$2" alignItems="flex-start">
                <YStack space="$2" alignItems="flex-start">
                  <Image width={100} height={100} source={{ uri: '/photo.svg' }} />
                </YStack>
                <YStack space="$2" alignItems="flex-start">
                  <XStack space="$2">
                    <Image width={32} height={32} source={{ uri: '/plus.svg' }} />
                    <Text fontSize={16}>Add Photo</Text>
                  </XStack>
                </YStack>
              </YStack>
            </YStack>
            <YStack space="$2" alignItems="flex-start">
              <Text fontSize={16}>Business Adderess</Text>
              <Input
                width={320}
                onChangeText={setAddress1}
                value={address1}
                placeholder="Address Line 1"
              />
              <Input
                width={320}
                onChangeText={setAddress2}
                value={address2}
                placeholder="Address Line 2"
              />
              <Input width={320} onChangeText={setCity} value={city} placeholder="City" />
              <XStack space="$2">
                <Input width={155} onChangeText={setState} value={state} placeholder="State" />
                <Input width={155} onChangeText={setZip} value={zip} placeholder="Zip" />
              </XStack>
            </YStack>
            {/* <YStack space="$2" alignItems="flex-start">
            <Text fontSize={16}>Password</Text>
            <Input onChangeText={onSelectPassword} width={320} placeholder="Set Password" />
          </YStack> */}
            <YStack space="$2" alignItems="flex-start" width={'100%'}>
              <Text fontSize={16}>Geofence Settings</Text>
              <Selection
                items={['Yes', 'No']}
                onChange={onSelectGeofence}
                value={geofenceEnabled}
                placeholder="Select"
              />
            </YStack>
            <YStack space="$2" alignItems="flex-start" width={'100%'}>
              <Text fontSize={16}>Geofence Radius</Text>
              <Input
                onChangeText={setGeofenceRadius}
                value={geofenceRadius}
                width={320}
                placeholder="0.000 miles"
              />
            </YStack>
            <YStack space="$2" alignItems="flex-start" width={'100%'}>
              <Text fontSize={16}>Require Location Services:</Text>
              <Selection
                items={['Yes', 'No']}
                onChange={onSelectRequireLocationServices}
                selectedVal={locationServiceEnabled}
                placeholder="Select"
              />
            </YStack>
            <YStack space="$2" alignItems="flex-start" width={'100%'}>
              <Text fontSize={16}>Allow Offline Check-in?</Text>
              <Selection
                items={['Yes', 'No']}
                onChange={onSelectOfflineCheckIn}
                selectedVal={offlineCheckIn}
                placeholder="Tap to Select Account Type"
              />
            </YStack>
            <YStack space="$2" alignItems="flex-start" width={'100%'}>
              <Text fontSize={16}>Admin Notes</Text>
              <TextArea
                onChangeText={setAdminNotes}
                value={adminNotes}
                width={320}
                placeholder="Add Notes"
              />
            </YStack>
            <YStack space="$2" alignItems="flex-start" width={'100%'}>
              <Text fontSize={16}>Cleaner Notes</Text>
              <TextArea
                onChangeText={setCleanerNotes}
                value={cleanerNotes}
                width={320}
                placeholder="Add Notes"
              />
            </YStack>
            <YStack space="$2" alignItems="flex-start">
              <XStack space="$2" justifyContent="space-between">
                <YStack space="$2" alignItems="flex-start">
                  <Text fontSize={16}>Building Selections</Text>
                  <Paragraph color={'slategray'} fontSize={14}>
                    Only building sections are created here. To create a<br /> checklist, go to the
                    Locations page, tap the <br /> context button at the top right of the screen,
                    <br /> and select Manage Checklist
                  </Paragraph>
                </YStack>
                <Image
                  width={32}
                  height={32}
                  source={{ uri: '/plus.svg' }}
                  onPress={() => {
                    setSectionQuantity(sectionQuantity + 1)
                  }}
                />
              </XStack>
              {locationSetter(sectionQuantity)}
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
                    onPress={submitLocation}
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
        </>
      )}
    </YStack>
  )
}

export default EditLocation
