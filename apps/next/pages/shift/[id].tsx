import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import { useParams } from 'next/navigation'
import TopBar from 'components/topbar'
import { ShiftProfileCard } from 'components/shiftProfileCard'
import { LocationCard } from 'components/locationCard'
import AssignModal from 'components/assignmodal'
const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

interface User {
  id: number
  name: string
  email: string
  phone: string
}

const ShiftCard = ({ shift }: { user: User; onClick: any }) => (
  <Card className="load-hidden" backgroundColor={'white'} width={350}>
    <XStack>
      <Card.Header>
        <Image
          zIndex={0}
          source={{
            uri: 'https://source.unsplash.com/random',
          }}
          width={50}
          height={50}
          borderRadius={40}
          alt="avatar"
        />
      </Card.Header>
      <YStack top={16}>
        <XStack width={250} justifyContent="space-between">
          <Text fontSize={14} fontWeight="bold">
            {`${user.first_name} ${user.last_name}`}
          </Text>

          <Text color={'blue'} fontSize={14}>
            {user.role}
          </Text>
        </XStack>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
      </YStack>
    </XStack>
  </Card>
)

const AvailabilityCard = (availability) => {
  console.log(availability.availability)
  return (
    <>
      <Card
        className="load-hidden"
        backgroundColor={'white'}
        width={350}
        height={270}
        justifyContent="center"
        alignItems="flex-start"
        shadowOffset={{ width: 10, height: 5 }}
        shadowOpacity={0.2}
        shadowRadius={10}
        shadowColor={'black'}
      >
        <XStack padding={10} alignItems="flex-start">
          <svg
            className={` w-6 h-6 text-'black'}`}
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <YStack
            justifyContent="center"
            alignItems="flex-start"
            paddingLeft={20}
            paddingRight={20}
          >
            <Text fontSize={16} fontWeight="bold">
              Availability
            </Text>
            {availability.availability.map((day) => {
              return (
                <XStack key={day}>
                  {day.to && day.from && (
                    <Text>{`${day.day}:
              ${day.from} - ${day.to}
              `}</Text>
                  )}
                  {!day.from && !day.to && <Text>{`${day.day}: unavailable`}</Text>}
                </XStack>
              )
            })}
          </YStack>
        </XStack>
      </Card>
    </>
  )
}

const Shift = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const [users, setUsers] = useState([])

  const [shift, setShift] = useState(null)

  const [location, setLocation] = useState(null)

  const [staff, setStaff] = useState(null)

  const [showModal, setShowModal] = useState(false)

  const { org } = useContext(OrgContext)
  const params = useParams()

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      // Code using query

      const { id } = router.query
      //grab user with id
      const getUser = async () => {
        const { data: foundShift } = await supabase.from('shifts').select().eq('id', id)
        if (!foundShift) return
        const { data: foundLocation } = await supabase
          .from('location')
          .select()
          .eq('id', foundShift[0].id_location)
        if (!foundLocation) return
        // console.log(foundShift)
        setShift(foundShift[0])
        setLocation(foundLocation[0])
      }

      getUser()
    }
  }, [router.isReady])

  function getDateForDayOfWeek(shortDay) {
    const currentDate = new Date()
    const currentDay = currentDate.getDay() // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const daysToCurrentDay = daysOfWeek.indexOf(shortDay) - currentDay
    const date = new Date(currentDate)
    date.setDate(currentDate.getDate() + daysToCurrentDay)

    // Format the date without the year
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })

    return formattedDate
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const getStaff = async () => {
    const { data: foundStaff } = await supabase.from('users').select().eq('id_org', org.id)
    if (!foundStaff) return
    setStaff(foundStaff)
  }

  return (
    <>
      {shift && (
        <YStack height={'100ch'} backgroundColor={'#F2F2F2'} width={'100wh'}>
          <TopBar title={`${shift.label}`} page={7} id={shift.id} />
          <YStack space="$4" paddingTop={100} justifyContent="center" alignItems="center">
            <LocationCard location={location} onClick={() => {}} />
            {/* Shift Card */}
            <ShiftProfileCard shift={shift} />
          </YStack>

          <YStack space="$4" paddingTop={50} alignItems="center">
            <Card
              space="$4"
              height={400}
              width={350}
              paddingTop={10}
              alignItems="center"
              // paddingBottom={100}
              backgroundColor={'#FFFFFF'}
            >
              <YStack alignItems="center">
                <XStack justifyContent="space-between" width={300}>
                  <Text>Days</Text>
                  <XStack space="$2">
                    <Button onPress={() => router.replace('/shift/add')} unstyled={true}></Button>
                    <Text color={'#14CC33'} fontSize={14}>
                      Assign to All
                    </Text>
                    {plusIcon}
                  </XStack>
                </XStack>
                <YStack space="$2" paddingTop={20} alignItems="center">
                  {shift.service_days.map(
                    (day) =>
                      JSON.parse(day).selected === true && (
                        <YStack
                          key={JSON.parse(day).day}
                          space="$2"
                          paddingTop={20}
                          alignItems="center"
                        >
                          <XStack
                            justifyContent="space-between"
                            width={300}
                            alignItems="center"
                            space="$2"
                          >
                            {/*
                        according to each day, display dates for those days in this current week
                        */}
                            <Text>{getDateForDayOfWeek(JSON.parse(day).day)}</Text>
                            <XStack space="$2">
                              <XStack
                                space="$0"
                                alignItems="center"
                                justifyContent="space-evenly"
                                paddingRight={12}
                              >
                                <View
                                  backgroundColor={'#94DAA0'}
                                  width={36}
                                  height={24}
                                  borderRadius={12}
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Text fontSize={14} color={'slategray'}>
                                    {`${shift.active_cleaners}/${shift.cleaner_amount}`}
                                  </Text>
                                </View>
                              </XStack>
                              <Button onPress={() => toggleModal()} unstyled={true}>
                                {plusIcon}
                              </Button>
                            </XStack>
                          </XStack>
                          <View
                            style={{
                              borderBottomColor: 'slate',
                              borderBottomWidth: 1,
                              width: 350,
                            }}
                          />
                        </YStack>
                      )
                  )}
                </YStack>
              </YStack>
            </Card>
          </YStack>
          <YStack space="$4" paddingTop={50} alignItems="center">
            {
              <AssignModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                onAssign={() => {}}
                staff={staff}
                shift={shift}
                selectedDay={''}
                location={location}
                start_time={shift.check_in_time}
                end_time={shift.check_out_time}
              />
            }
          </YStack>
        </YStack>
      )}
      {!shift && (
        <YStack height={'100ch'}>
          <TopBar title={`Loading...`} page={4} />
        </YStack>
      )}
    </>
  )
}

const filterIcon = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.5 16H23.5M6 9H27M13 23H20"
      stroke="#4E5DDE"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

const plusIcon = (
  <svg width="26" height="26" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_dd_151_2599)">
      <rect x="3" y="2" width="32" height="32" rx="16" fill="#23E342" />
      <path
        d="M19 11V25M12 18H26"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd_151_2599"
        x="0"
        y="0"
        width="38"
        height="38"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_151_2599" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_151_2599"
          result="effect2_dropShadow_151_2599"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_151_2599"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default Shift
