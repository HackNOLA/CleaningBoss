import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import { useParams } from 'next/navigation'
import TopBar from 'components/topbar'
import { TaskCard } from 'components/taskCard'
import { LocationCard } from 'components/locationCard'
const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

interface Location {
  id: number
  address: string
  name: string
  staffAmount: number
  image: string
}

const tasks = [
  {
    id: 1,
    time_from: '8:00 am',
    time_to: '3:30 pm',
    location: "Andrew's Insurance",
    day: 'Evening Shft',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 2,
    time_from: '8:00 am',
    time_to: '3:30 pm',
    location: 'Sunshine Nursing Home',
    day: 'Morning Shift',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 3,
    time_from: '8:00 am',
    time_to: '3:30 pm',
    location: 'Sunshine Nursing Home',
    day: 'Evening Shft',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 4,
    time_from: '8:00 am',
    time_to: '8:00 am',
    location: 'Sunshine Nursing Home',
    day: 'Evening Shft',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 5,
    time_from: '8:00 am',
    time_to: '3:30 pm',
    location: 'Main Office',
    day: 'Evening Shft',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 6,
    time_from: '8:00 am',
    time_to: '3:30 pm',
    location: 'Main Office',
    day: 'Evening Shft',
    activeCleaners: 5,
    totalCleaners: 5,
  },
]

const LocationProfile = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [shifts, setShifts] = useState([])

  const [location, setLocation] = useState(null)

  const { org } = useContext(OrgContext)
  const params = useParams()

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      // Code using query

      const { id } = router.query
      //grab user with id
      const getLoc = async () => {
        const { data: foundLoc } = await supabase.from('location').select().eq('id', id)
        const { data: shifts } = await supabase.from('shifts').select().eq('id_location', id)

        if (!foundLoc) return
        setLocation(foundLoc[0])
        if (!shifts) return
        setShifts(shifts)
      }

      getLoc()
    }
  }, [router.isReady])

  return (
    <>
      {location && (
        <YStack height={'100ch'} backgroundColor={'#F2F2F2'} width={'100wh'}>
          <TopBar title={`${location.name}`} page={6} id={location.id} />
          <YStack space="$4" paddingTop={100} justifyContent="center" alignItems="center">
            <LocationCard location={location} onClick={() => {}} />
          </YStack>
          <YStack space="$4" paddingTop={20} justifyContent="center" alignItems="center">
            <Card className="load-hidden" backgroundColor={'white'} width={350} height={120}>
              <YStack space="$4" padding={10} alignItems="flex-start">
                <Text fontWeight={'bold'}>Building Photos</Text>
              </YStack>
            </Card>
            <Card className="load-hidden" backgroundColor={'white'} width={350} height={120}>
              <YStack space="$4" padding={10} alignItems="flex-start">
                <Text fontWeight={'bold'}>Note for Admin</Text>
                <Text>{location.admin_note}</Text>
              </YStack>
            </Card>
            <Card className="load-hidden" backgroundColor={'white'} width={350} height={180}>
              <YStack space="$4" padding={10} alignItems="flex-start">
                <Text fontWeight={'bold'}>Building Sections</Text>
                {location.sections.map((section, i) => (
                  <Text key={`${i}`}>{section}</Text>
                ))}
              </YStack>
            </Card>
          </YStack>
          <YStack alignItems="flex-start" justifyContent="flex-start">
            <XStack
              space="$12"
              width={'100wh'}
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <Text fontSize={20} fontWeight={'400'} paddingLeft={20} paddingTop={20}>
                Scheduled Shifts
              </Text>
              <XStack space="$2">
                <Button onPress={() => router.replace('/shift/add')} unstyled={true}>
                  {plusIcon}
                </Button>
                <Text>Add shift</Text>
              </XStack>
            </XStack>
          </YStack>
          {shifts && (
            <YStack
              space="$4"
              paddingTop={20}
              justifyContent="center"
              alignItems="center"
              paddingBottom={100}
              backgroundColor={'#F2F2F2'}
            >
              {shifts.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </YStack>
          )}
        </YStack>
      )}
      {!location && (
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
  <svg width="24" height="24" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default LocationProfile
