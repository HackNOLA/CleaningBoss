import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import Calendar from 'components/calendar'
import { JobStatusCard } from 'components/jobstatuscard'
import { UserContext } from 'context/usercontext'
import supabase from 'context/supabasecontext'

interface Task {
  id: number
  time: string
  location: string
  day: string
  activeCleaners: number
  totalCleaners: number
}

const tasks = [
  {
    id: 1,
    time: '8:00 am - 3:30 pm',
    location: 'Main Office',
    day: 'Monday, November 1st, 2023',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 2,
    time: '8:00 am - 3:30 pm',
    location: 'Main Office',
    day: 'Monday, November 1st, 2023',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 3,
    time: '8:00 am - 3:30 pm',
    location: 'Main Office',
    day: 'Monday, November 1st, 2023',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 4,
    time: '8:00 am - 3:30 pm',
    location: 'Main Office',
    day: 'Monday, November 1st, 2023',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 5,
    time: '8:00 am - 3:30 pm',
    location: 'Main Office',
    day: 'Monday, November 1st, 2023',
    activeCleaners: 5,
    totalCleaners: 5,
  },
  {
    id: 6,
    time: '8:00 am - 3:30 pm',
    location: 'Main Office',
    day: 'Monday, November 1st, 2023',
    activeCleaners: 5,
    totalCleaners: 5,
  },
]

const TaskCard = ({ task, onPress }: { task: Task }) => (
  <Card onPress={onPress} width={350} className="load-hidden" backgroundColor={'white'}>
    <XStack>
      <YStack
        borderTopLeftRadius={10}
        borderBottomLeftRadius={10}
        backgroundColor={'blue'}
        width={10}
        height={80}
      ></YStack>
      <Card.Header></Card.Header>
      <YStack top={16}>
        <XStack width={250} justifyContent="space-between">
          <Text fontSize={14} fontWeight="bold">
            {`${task.location_name}`}
          </Text>
        </XStack>
        <XStack width={250} justifyContent="space-between">
          <YStack>
            <Text fontSize={14} color={'slategray'} width={250} paddingRight={12} numberOfLines={2}>
              {`${
                new Date(task.check_in_time)
                  .toLocaleDateString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })
                  .split(',')[1]
              } -
                  ${
                    new Date(task.check_out_time)
                      .toLocaleDateString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })
                      .split(',')[1]
                  }`}
            </Text>
            <Text fontSize={14} color={'slategray'} width={250} paddingRight={12} numberOfLines={2}>
              {new Date(task.start_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: true,
              })}
            </Text>
          </YStack>
          <XStack space="$0" alignItems="center" justifyContent="space-evenly" paddingRight={12}>
            <View
              backgroundColor={'#94DAA0'}
              width={36}
              height={24}
              borderRadius={12}
              justifyContent="center"
              alignItems="center"
            >
              {/* <Text fontSize={14} color={'slategray'}>
                {`${task.active_cleaners}/${task.cleaner_amount}`}
              </Text> */}
            </View>
          </XStack>
        </XStack>
      </YStack>
    </XStack>
  </Card>
)

const CleanerCal = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [jobs, setJobs] = useState([])

  const [users, setUsers] = useState([])

  const { org } = useContext(OrgContext)

  const { activeUser } = useContext(UserContext)

  const router = useRouter()

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase.from('jobs').select().eq('id_user', activeUser?.id)
      setJobs(data)
    }
    fetchJobs()
    // const handleScroll = () => {
    //   const position = window.scrollY
    //   setScrollPosition(position)
    // }
    // window.addEventListener('scroll', handleScroll)
    // return () => {
    //   window.removeEventListener('scroll', handleScroll)
    // }
  }, [])

  return (
    <View backgroundColor={'#F2F2F2'}>
      <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}>
        <View paddingTop={80}>
          {/* <Map /> */}
          <Calendar shifts={jobs} />
        </View>
        <XStack
          className={scrollPosition > 20 ? 'fade' : 'item'}
          justifyContent="space-between"
          alignItems="baseline"
          width={340}
        >
          <XStack
            paddingBottom={20}
            paddingTop={20}
            space="$2"
            justifyContent="center"
            alignItems="center"
          >
            <Button onPress={() => console.log('Filter users')} unstyled={true}>
              {filterIcon}
            </Button>
            <Text fontSize={16} fontWeight="bold">
              Filter
            </Text>
          </XStack>
          <Button onPress={() => router.replace('addjob')} unstyled={true}>
            {plusIcon}
          </Button>
        </XStack>
        {jobs && (
          <YStack space="$4">
            {jobs.map((job) => (
              <JobStatusCard key={job.id} job={job} />
            ))}
          </YStack>
        )}
      </YStack>
    </View>
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

export default CleanerCal
