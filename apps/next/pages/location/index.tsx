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
} from '@my/ui'
import TopBar from 'components/topbar'
import Selection from 'components/select'
import Radiogroup from 'components/radiogroup'
import { createClient } from '@supabase/supabase-js'
import { CurrentToast } from 'components/CurrentToast'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { OrgContext } from 'context/orgcontext'
import Calendar from 'components/calendar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

const addlocation: NextPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [JobDescription, setJobDescription] = useState('')
  const [shiftHours, onSelectShiftHours] = useState('')
  const [location, setLocation] = useState('')
  const [shiftTimeline, setShiftTimeline] = useState('')
  const [shiftInTime, setShiftInTime] = useState('')
  const [shiftOutTime, setShiftOutTime] = useState('')
  const [assignCleaners, setAssignCleaners] = useState('')
  const [notes, setNotes] = useState('')
  const [joinCode, setJoinCode] = useState('' as any)
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [bgColor, setBgColor] = useState('green' as any)
  const toast = useToastController()
  const router = useRouter()
  const { org } = useContext(OrgContext)

  useEffect(() => {
    //if a day is selected, make input field appear to select time range for that day

    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollPosition])

  const onSelectLocation = (location: string) => {
    setLocation(location)
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
      job_description: JobDescription,
      shiftHours: shiftHours,
      location: location,
      shiftTimeline: shiftTimeline,
      shiftInTime: shiftInTime,
      shiftOutTime: shiftOutTime,
      assignCleaners: assignCleaners,
      notes: notes,
      //time_trialed: timeTrialOption === 'Yes' ? true : false,
    }

    console.log(user)
    //submit user to database
    const { error } = await supabase.from('users').insert(user)

    console.log(error)
    toast?.show('Success!', {
      title: 'Success',
      message: 'You have successfully added a user!',
      duration: 4000,
      viewport: 'screen',
    })

    router.replace('dashboard')
  }
  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      // const { data } = await supabase.from('users').select() // Correct
      // organization !== '' && joinCode === '' ?

      await setActive({ session: completeSignUp.createdSessionId })
      toast.show('Success!', {
        title: 'Success',
        message: 'You have successfully signed up!',
        duration: 4000,
        viewport: 'screen',
      })
      router.replace('dashboard')
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <YStack justifyContent="center" alignItems="center">
      <View width={'100%'}>{scrollPosition < 20 && <TopBar title="Add a Job" />}</View>
      <CurrentToast bgColor={bgColor} />
      {!pendingVerification && (
        <YStack space="$6" top={160} justifyContent="center" alignItems="center">
          <YStack space="$2" width={'100%'}>
            <Text fontSize={16} style={{ color: '#111860' }}>
              Job Description
            </Text>
            <Input
              onChangeText={setJobDescription}
              value={JobDescription}
              width={320}
              borderColor={'#111860'}
              placeholder="Job Description"
            />
          </YStack>

          <YStack space="$2" alignItems="flex-start" width={320}>
            <Text fontSize={16} style={{ color: '#111860' }}>
              Location
            </Text>
            <Selection
              items={['One time', 'Espanol', 'Francios']}
              width={320}
              borderColor={'#111860'}
              onChange={onSelectLocation}
              value={location}
              placeholder="Select Location"
            />
          </YStack>

          <YStack space="$2" alignItems="flex-start" width={320}>
            <Text fontSize={16} style={{ color: '#111860' }}>
              Prevent check in outside shift hours?
            </Text>
            <Radiogroup
              items={['One time', 'Daily', 'Weekly', 'Monthly', 'Yearly']}
              width={320}
              onChange={onSelectShiftHours}
              value={shiftHours}
            />
          </YStack>

          <YStack space="$2" width={320}>
            <Text fontSize={16} style={{ color: '#111860' }}>
              Shift Timeline
            </Text>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                borderColor={'#111860'}
                value={shiftTimeline}
                onChange={setShiftTimeline}
              />
            </LocalizationProvider>
          </YStack>

          <XStack space="$2" padding={0} width={320}>
            <YStack space="$1" width={155}>
              <Text fontSize={16} style={{ color: '#111860' }}>
                Check In Time
              </Text>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  width={150}
                  className="uppercase"
                  value={shiftInTime}
                  onChange={setShiftInTime}
                  borderColor={'#111860'}
                  format="hh:mm"
                />
              </LocalizationProvider>
            </YStack>
            <YStack space="$1" width={155}>
              <Text fontSize={16} style={{ color: '#111860' }}>
                Check Out Time
              </Text>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  width={150}
                  className="uppercase"
                  value={shiftOutTime}
                  onChange={setShiftOutTime}
                  borderColor={'#111860'}
                  format="hh:mm"
                />
              </LocalizationProvider>
            </YStack>
          </XStack>

          <YStack space="$2" alignItems="flex-start" width={320}>
            <Text fontSize={16} style={{ color: '#111860' }}>
              Assign cleaners
            </Text>
            <Selection
              items={['Yes', 'No']}
              width={160}
              borderColor={'#111860'}
              onChange={setAssignCleaners}
              value={assignCleaners}
              placeholder="Subject"
            />
          </YStack>

          <YStack space="$2" width={320}>
            <Text fontSize={16} style={{ color: '#111860' }}>
              Notes
            </Text>
            <textarea
              className="border border-solid  rounded-lg"
              width={320}
              height={320}
              border={1}
              rows={8}
              borderColor={'#111860'}
              onChange={setNotes}
              value={notes}
            />
          </YStack>
        </YStack>
      )}

      {scrollPosition < 30 && (
        <div
          style={{ zIndex: 99 }}
          className="fixed bottom-0 left-0 right-0 h-24 bg-white  shadow-lg flex items-center justify-around"
        >
          <YStack space="$2" alignItems="center">
            <XStack space="$4">
              <Button
                onPress={() => router.replace('/dashboard')}
                borderColor={'#33CC4B'}
                width={150}
              >
                <Text fontSize={16}>Cancel</Text>
              </Button>
              <Button onPress={submitUser} width={150} backgroundColor={'#33CC4B'}>
                <Text color="white" fontSize={16}>
                  Add Job
                </Text>
              </Button>
            </XStack>
          </YStack>
        </div>
      )}
    </YStack>
  )
}

export default AddJob
