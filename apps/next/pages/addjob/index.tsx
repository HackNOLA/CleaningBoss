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
import { isNullishCoalesce } from 'typescript'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

const AddShift: NextPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [label, setLabel] = useState('')
  const [shiftHours, onSelectShiftHours] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [shiftInTime, setShiftInTime] = useState('')
  const [shiftOutTime, setShiftOutTime] = useState('')
  const [checkOutside, setCheckOutside] = useState(false)
  const [amount, setAmount] = useState('')
  const toast = useToastController()
  const router = useRouter()
  const { org } = useContext(OrgContext)
  const [locations, setLocations] = useState([])
  const [locationId, setLocationId] = useState(null)
  const [locationName, setLocationName] = useState('')
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
    const fetchLocations = async () => {
      const { data } = await supabase.from('location').select().eq('id_company', org?.id)
      // console.log(data)
      setLocations(data)
    }
    fetchLocations()

    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollPosition, availability])

  const onSelectLocation = (location: string) => {
    console.log(location)
    for (let myLocation of locations) {
      if (location === myLocation.name) {
        // console.log(myLocation.id)
        setLocationId(myLocation.id)
        setLocationName(myLocation.name)
      }
    }
    // console.log(locationId)
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

  const validateFields = () => {
    if (!label) {
      toast?.show('Error!', {
        title: 'Error',
        message: 'Please add a shift label',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: 'red',
      })
      return
    }

    if (!locationId) {
      console.log(locationId)
      toast?.show('Error!', {
        title: 'Error',
        message: 'Please select a location',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: 'red',
      })
      return
    }

    if (!startDate) {
      toast?.show('Error!', {
        title: 'Error',
        message: 'Please select a start date',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: 'red',
      })
      return
    }

    if (!endDate) {
      toast?.show('Error!', {
        title: 'Error',
        message: 'Please select an end date',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: 'red',
      })
      return
    }

    if (!shiftInTime) {
      toast?.show('Error!', {
        title: 'Error',
        message: 'Please select a check in time',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: 'red',
      })
      return
    }

    if (!shiftOutTime) {
      toast?.show('Error!', {
        title: 'Error',
        message: 'Please select a check out time',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: 'red',
      })
      return
    }

    if (!amount) {
      toast?.show('Error!', {
        title: 'Error',
        message: 'Please select a number of cleaners',
        duration: 4000,
        viewport: 'screen',
        backgroundColor: 'red',
      })
      return
    }
  }

  const submitShift = async () => {
    //validate fields
    validateFields()

    if (startDate && endDate && shiftInTime && shiftOutTime && amount) {
      const shift = {
        start_date: JSON.stringify(startDate.$d).slice(1, 25),
        end_date: JSON.stringify(startDate.$d).slice(1, 25),
        check_in_time: JSON.stringify(shiftInTime).slice(1, 25),
        check_out_time: JSON.stringify(shiftOutTime).slice(1, 25),
        service_days: availability,
        label,
        cleaner_amount: Number(amount),
        check_outside: checkOutside,
        id_location: locationId,
        id_company: org?.id,
        location_name: locationName,
        active_cleaners: 0,
      }

      // console.log(shift)

      //submit user to database
      const { error } = await supabase.from('shifts').insert(shift)

      console.log(error)
      toast?.show('Success!', {
        title: 'Success',
        message: 'You have successfully added a shift!',
        duration: 4000,
        backgroundColor: 'green',
      })

      router.replace('/assigncleaner')
    }
  }

  return (
    <YStack justifyContent="center" alignItems="center">
      <View width={'100%'}>{scrollPosition < 20 && <TopBar title="Add a Job" />}</View>
      <CurrentToast />
      <YStack
        space="$6"
        top={80}
        backgroundColor="#f2f2f2"
        padding={16}
        justifyContent="center"
        alignItems="center"
        borderRadius={15}
      >
        <YStack space="$2" width={'100%'}>
          <Text fontSize={16} style={{ color: '#111860', fontWeight: '500', lineHeight: '1.6' }}>
            Shift label
          </Text>
          <Input
            onChangeText={(label) => setLabel(label)}
            width={320}
            borderColor={'#9497B8'}
            placeholder="Add a Shift"
          />
        </YStack>

        <YStack space="$2" alignItems="flex-start" width={320} className="locationselect">
          <Text fontSize={16} style={{ color: '#111860', fontWeight: '500', lineHeight: '1.6' }}>
            Location
          </Text>
          {locations ? (
            <Selection
              items={locations.map((location) => location.name)}
              width={320}
              height={56}
              borderColor={'#9497B8'}
              onChange={onSelectLocation}
              placeholder="Select Location"
            />
          ) : null}
        </YStack>

        <YStack space="$2" alignItems="flex-start" width={320} className="servicedays">
          <Text fontSize={16} color="#111860" fontWeight="500">
            Service Days
          </Text>
          <XStack space="$2" justifyContent="center" paddingBottom={0}>
            {availability.map((slot, i) => (
              <Button
                onPress={() => {
                  setAvailabilitySlot(slot.day)
                }}
                key={`${i}`}
                width={40}
                height={40}
                circular={true}
                borderColor={slot.selected ? '#3373CC' : '#000000'}
                borderWidth={slot.selected ? 3 : 1}
              >
                <Text color="black">{slot.day}</Text>
              </Button>
            ))}
          </XStack>
        </YStack>

        <XStack space="$2" padding={0} width={320} justifyContent="space-between">
          <YStack space="$2" width={155} className="datepickerbgshift">
            <Text fontSize={16} style={{ color: '#111860', fontWeight: '500', lineHeight: '1.6' }}>
              Date
            </Text>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker borderColor={'#9497B8'} value={startDate} onChange={setStartDate} />
            </LocalizationProvider>
          </YStack>

          {/* <YStack space="$2" width={155} className="datepickerbgshift">
            <Text fontSize={16} style={{ color: '#111860', fontWeight: '500', lineHeight: '1.6' }}>
              End Date
            </Text>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker borderColor={'#9497B8'} value={endDate} onChange={setEndDate} />
            </LocalizationProvider>
          </YStack> */}
        </XStack>

        <XStack space="$2" padding={0} width={320}>
          <YStack space="$1" width={155} className="datepickerbg">
            <Text fontSize={16} style={{ color: '#111860', fontWeight: '500', lineHeight: '1.6' }}>
              Check In Time
            </Text>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                width={150}
                className="uppercase"
                value={shiftInTime}
                onChange={setShiftInTime}
                borderColor={'#9497B8'}
                format="hh:mm"
              />
            </LocalizationProvider>
          </YStack>
          <YStack space="$1" width={155} className="datepickerbg">
            <Text fontSize={16} style={{ color: '#111860', fontWeight: '500', lineHeight: '1.6' }}>
              Check Out Time
            </Text>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                width={150}
                className="uppercase"
                value={shiftOutTime}
                onChange={setShiftOutTime}
                borderColor={'#9497B8'}
                format="hh:mm"
              />
            </LocalizationProvider>
          </YStack>
        </XStack>

        <YStack space="$2" alignItems="flex-start" width={320} className="Preventradio">
          <Text fontSize={16} style={{ color: '#111860', fontWeight: '500', lineHeight: '1.6' }}>
            Prevent check in outside shift hours?
          </Text>
          <Radiogroup items={['Yes', 'No']} onChange={onSelectShiftHours} value={shiftHours} />
        </YStack>

        <YStack space="$2" alignItems="flex-start" width={320}>
          <Text fontSize={16} style={{ color: '#111860', fontWeight: '500', lineHeight: '1.6' }}>
            Cleaner Amount
          </Text>
          <Input
            width={160}
            borderWidth={1}
            borderColor={'#9497B8'}
            onChangeText={(amount) => setAmount(Number(amount))}
            placeholder="Cleaners Amount"
          />
        </YStack>
      </YStack>

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
              <Button onPress={submitShift} width={150} backgroundColor={'#33CC4B'}>
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

export default AddShift
