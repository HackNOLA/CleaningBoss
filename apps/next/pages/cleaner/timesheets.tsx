import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import { UserContext } from 'context/usercontext'
import ClockInCard from 'components/clockincard'

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

const ShiftCard = ({ job, shift, handleOpen }: { job: any; shift: any }) => (
  <Card
    onPress={() => handleOpen(job)}
    className="load-hidden"
    backgroundColor={'white'}
    width={350}
    height={100}
  >
    <XStack>
      <Card.Header>{}</Card.Header>
      <YStack top={16} alignItems="flex-start">
        <XStack width={250} justifyContent="space-between">
          <Text fontSize={14} fontWeight="bold">
            {`${shift.location_name}`}
          </Text>

          <Text color={'blue'} fontSize={14}>
            {/* calculate difference of hours between job start time and end time */}

            {new Date(job.end_time).getHours() - new Date(job.start_time).getHours()}
            {' hours'}
          </Text>
        </XStack>
        <Text fontSize={14} fontWeight="bold">
          {`${shift.label}`}
        </Text>

        <XStack width={270} space="$2" alignItems="center" justifyContent="space-between">
          <XStack space="$2" alignItems="center" justifyContent="space-evenly">
            <Text color={'blue'} fontSize={14}>
              {new Date(job.start_time).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
              {' - '}
              {new Date(job.end_time).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </Text>
          </XStack>
          {/* create indicator for has not clocked in*/}
          {!job.clock_in_time && (
            <XStack space="$2" alignItems="center" justifyContent="space-evenly">
              <Text color={'red'} fontSize={14}>
                {'Not clocked in'}
              </Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="#FF0000"
              >
                <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2zm0 8h-2v2h2z" />
              </svg>
            </XStack>
          )}
          {/* create indicator for has clocked in*/}
          {job.clock_in_time && (
            <XStack space="$2" alignItems="center" justifyContent="space-evenly">
              <Text color={'green'} fontSize={14}>
                {!job.clock_out_time ? 'Clocked in' : 'Clocked out'}
              </Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="#00FF00"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 18 21 6l-1.41-1.41z" />
              </svg>
            </XStack>
          )}
        </XStack>
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

  const [open, setOpen] = useState(false)

  const [selectedJob, setSelectedJob] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const fetchOrg = async () => {
      const { data: jobData } = await supabase.from('jobs').select().eq('id_user', activeUser?.id)
      if (!jobData) return
      if (!jobData.length) return
      const { data: shiftData } = await supabase
        .from('shifts')
        .select()
        .eq('id', jobData[0].id_shift)
      if (!shiftData) return
      setShifts(shiftData)

      setJobs(jobData)

      // const { data: shiftData } = await supabase
      //   .from('shifts')
      //   .select()
      //   .eq('id', jobData[0].id_shift)
      // console.log(shiftData)
      // setShifts(shiftData)
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
  }, [selectedJob])

  const handleOpen = (job) => {
    console.log(job)
    setSelectedJob(job)
    setOpen(true)
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
        {jobs && jobs.length ? (
          jobs.map((job) => (
            <YStack space="$4" key={job.id}>
              <Text fontWeight="bold" fontSize={16}>
                {job.date}
              </Text>
              <ShiftCard handleOpen={handleOpen} shift={shifts[0]} job={job} key={job.id} />
            </YStack>
          ))
        ) : (
          <Text>No shifts found</Text>
        )}
      </YStack>
      <YStack space="$4" paddingTop={40} justifyContent="center" alignItems="center">
        {shifts && selectedJob && (
          <ClockInCard
            handleOpen={handleOpen}
            job={selectedJob}
            shift={shifts[0]}
            open={open}
            setOpen={setOpen}
          />
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
