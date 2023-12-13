import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import { useParams } from 'next/navigation'
import TopBar from 'components/topbar'
import { TaskCard } from 'components/taskCard'
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

const UserCard = ({ user, onClick }: { user: User; onClick: any }) => (
  <Card onPress={onClick} className="load-hidden" backgroundColor={'white'} width={350}>
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

const UserProfile = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [users, setUsers] = useState([])

  const [employee, setEmployee] = useState(null)

  const { org } = useContext(OrgContext)
  const params = useParams()

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      // Code using query

      const { id } = router.query
      //grab user with id
      const getUser = async () => {
        const { data: foundUser } = await supabase.from('users').select().eq('id', id)
        if (!foundUser) return
        // console.log(foundUser)
        setEmployee(foundUser[0])
      }

      getUser()
    }
  }, [router.isReady])

  return (
    <>
      {employee && (
        <YStack height={'100ch'} backgroundColor={'#F2F2F2'} width={'100wh'}>
          <TopBar title={`${employee.first_name} ${employee.last_name}`} page={7} />
          <YStack space="$4" paddingTop={100} justifyContent="center" alignItems="center">
            <UserCard user={employee} onClick={() => {}} />
            {employee.availability && <AvailabilityCard availability={employee.availability} />}
          </YStack>
          <YStack alignItems="flex-start" justifyContent="flex-start">
            <Text fontSize={20} fontWeight={'400'} paddingLeft={20} paddingTop={20}>
              Scheduled Shifts
            </Text>
          </YStack>
          <YStack
            space="$4"
            paddingTop={20}
            justifyContent="center"
            alignItems="center"
            paddingBottom={100}
            backgroundColor={'#F2F2F2'}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </YStack>
        </YStack>
      )}
      {!employee && (
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
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default UserProfile
