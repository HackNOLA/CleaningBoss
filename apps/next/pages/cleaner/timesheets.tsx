import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import { UserContext } from 'context/usercontext'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

interface Shift {
  id: number
  timeLength: number
  name: string
  time_start: string
  time_end: string
  company_name: string
  eta: string
}

const exampleShifts: Shift[] = [
  {
    id: 1,
    timeLength: 2,
    name: 'Morning',
    time_start: '2021-10-04T08:00:00.000Z',
    time_end: '2021-10-01T10:00:00.000Z',
    company_name: 'Cleaning Boss',
    eta: '2021-10-01T08:00:00.000Z',
  },
  {
    id: 2,
    timeLength: 2,
    name: 'Afternoon',
    time_start: '2021-10-04T08:00:00.000Z',
    time_end: '2021-10-01T10:00:00.000Z',
    company_name: 'Cleaning Boss',
    eta: '2021-10-01T08:00:00.000Z',
  },
  {
    id: 3,
    timeLength: 2,
    name: 'Evening',
    time_start: '2021-10-02T08:00:00.000Z',
    time_end: '2021-10-01T10:00:00.000Z',
    company_name: 'Cleaning Boss',
    eta: '2021-10-01T08:00:00.000Z',
  },
  {
    id: 4,
    timeLength: 2,
    name: 'Clean XYZ',
    time_start: '2021-10-01T08:00:00.000Z',
    time_end: '2021-10-01T10:00:00.000Z',
    company_name: 'Cleaning Boss',
    eta: '2021-10-01T08:00:00.000Z',
  },
  //make sure to add more shifts on another day to test scrolling
]

const ShiftCard = ({ job, shift }: { job: any; shift: any }) => (
  <Card className="load-hidden" backgroundColor={'white'} width={350} height={100}>
    <XStack>
      <Card.Header></Card.Header>
      <YStack top={16}>
        <XStack width={250} justifyContent="space-between">
          {/* <Text fontSize={14} fontWeight="bold">
            {`${job.company_name}`}
          </Text> */}

          {/* <Text color={'blue'} fontSize={14}>
            {job.timeLength} hours
          </Text> */}
        </XStack>
        {/* <Text color={'slategray'} fontSize={12} fontWeight="bold">
          {job.name}
        </Text> */}
        {/* <Text>{job.phone}</Text> */}
      </YStack>
    </XStack>
  </Card>
)

const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [jobs, setJobs] = useState([])

  const { activeUser } = useContext(UserContext)

  const { org } = useContext(OrgContext)

  const [shifts, setShifts] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (activeUser) {
      console.log(activeUser)
    }
    const fetchOrg = async () => {
      const { data: jobData } = await supabase.from('jobs').select().eq('id_user', activeUser?.id)
      if (!jobData) return
      console.log(jobData)
      setJobs(jobData)

      const { data: shiftData } = await supabase
        .from('shifts')
        .select()
        .eq('id', jobData[0].id_shift)
      console.log(shiftData)
      setShifts(shiftData)
    }

    const fetchShifts = async () => {
      if (!jobs) return
    }

    const getShifts = async () => {
      const shifts = await fetchShifts()
      // setShifts(shifts)
    }

    getShifts()
    fetchOrg()

    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  if (!jobs) return <div>Loading...</div>

  return (
    <YStack height={'100ch'} paddingTop={160}>
      <YStack
      // justifyContent="center"
      // alignItems="center"
      >
        <XStack
          className={scrollPosition > 20 ? 'fade' : 'item'}
          justifyContent="space-between"
          alignItems="baseline"
        >
          <XStack paddingTop={10} space="$4" justifyContent="center" alignItems="flex-end">
            <Button onPress={() => console.log('Filter jobs')} unstyled={true}>
              {filterIcon}
            </Button>
            <View
              backgroundColor={'white'}
              width={250}
              height={40}
              borderWidth={1}
              borderColor={'slategray'}
              borderRadius={10}
              justifyContent="center"
              alignItems="center"
            >
              {calendarIcon}
              {/* Monday to next Wednesday */}
              <Text paddingTop={5}>
                {`${new Date().toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                  day: 'numeric',
                })}
                - ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                  day: 'numeric',
                })}`}
              </Text>
            </View>
          </XStack>
          <Button onPress={() => router.replace('adduser')} unstyled={true}>
            {plusIcon}
          </Button>
        </XStack>
      </YStack>
      <YStack space="$4" paddingTop={60}>
        {jobs.length ? (
          jobs.map((job) => (
            <YStack space="$4" key={job.id}>
              <Text fontWeight="bold" fontSize={16}>
                {job.date}
              </Text>
              <YStack space="$4">
                {jobs.map((job) => (
                  <ShiftCard job={job} key={job.id} />
                ))}
              </YStack>
            </YStack>
          ))
        ) : (
          <Text>No shifts found</Text>
        )}
      </YStack>
    </YStack>
  )
}

const filterIcon = (
  <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.5 16H23.5M6 9H27M13 23H20"
      stroke="#4E5DDE"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

const calendarIcon = (
  <svg
    className={` w-6 h-6 text-black}`}
    fill="none"
    height="16"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
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
        filterUnits="jobspaceOnUse"
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

export default StaffPage
