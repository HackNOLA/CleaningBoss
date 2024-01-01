import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import TopBar from 'components/topbar'
import { OrgContext } from 'context/orgcontext'
import supabase from 'context/supabasecontext'
import { JobStatusCard } from 'components/jobstatuscard'
import { UserContext } from 'context/usercontext'

interface User {
  id: number
  name: string
  email: string
  phone: string
}

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

const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [users, setUsers] = useState([])

  const [jobs, setJobs] = useState([])

  const { org } = useContext(OrgContext)

  const { activeUser } = useContext(UserContext)

  const router = useRouter()

  useEffect(() => {
    const fetchOrg = async () => {
      const { data: users } = await supabase.from('users').select().eq('id_company', org?.id)
      if (!users) return
      setUsers(users)
      for (let user of users) {
        const { data: jobData } = await supabase.from('jobs').select().eq('id_user', user?.id)
        if (!jobData) return
        jobData.map((job) => {
          job.user = user
          return job
        })
        setJobs((jobs) => [...jobs, ...jobData])
        //   setJobs(jobData)
      }
    }
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

  const formatToCSV = () => {
    // data will be array of arrays
    // first row will be headers: name, role, job date, job clock_in_time, job clock_out_time job status
    // subsequent rows will be data

    const data = []
    const headers = [
      'name',
      'role',
      'job date',
      'job clock_in_time',
      'job clock_out_time',
      'job status',
    ]
    data.push(headers)
    const jobData = jobs.map((job) => {
      const row = []
      row.push(`${job.user.first_name} ${job.user.last_name}`)
      row.push(job.user.role)
      row.push(job.date)
      row.push(job.clock_in_time)
      row.push(job.clock_out_time)
      row.push(job.completed ? 'completed' : 'incomplete')
      data.push(row)
    })

    //input jobData into new rows in data
    data.concat(jobData)
    // convert data to csv
    return data
  }

  const convertToCsv = (array) => {
    return array.map((row) => row.join(',')).join('\n')
  }

  const exportToCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + convertToCsv(formatToCSV())
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'timesheet.csv')
    document.body.appendChild(link)
    link.click()
  }

  const downloadCSV = () => {
    const data = formatToCSV()
    const csvContent = 'data:text/csv;charset=utf-8,' + data
    const encodedUri = encodeURI(csvContent)
    window.open(encodedUri)
  }

  if (!users) return <div>Loading...</div>

  const filteredJobs = jobs.filter((job) => users.find((user) => user.id === job.id_user))

  return (
    <YStack height={'100ch'} alignItems="center">
      <TopBar title="Timesheets" page={9} onPress={exportToCsv} />
      <YStack
      // justifyContent="center"
      // alignItems="center"
      >
        <XStack
          space="$3"
          alignItems="center"
          borderColor={'slategray'}
          borderWidth={1}
          borderRadius={5}
          width={350}
          height={50}
          padding={8}
          className={scrollPosition > 20 ? 'fade' : 'item'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
          </svg>
          <input
            value={searchTerm}
            // borderColor={'transparent'}
            placeholder="Search User"
            onChange={handleSearchChange}
          />
        </XStack>
        {/* <XStack
          className={scrollPosition > 20 ? 'fade' : 'item'}
          justifyContent="space-between"
          alignItems="baseline"
        >
          <XStack paddingTop={40} space="$2" justifyContent="center" alignItems="center">
            <Button onPress={() => console.log('Filter users')} unstyled={true}>
              {filterIcon}
            </Button>
            <Text fontSize={16} fontWeight="bold">
              Filter
            </Text>
          </XStack>
          <Button onPress={() => router.replace('adduser')} unstyled={true}>
            {plusIcon}
          </Button>
        </XStack> */}
      </YStack>
      <YStack space="$4" paddingTop={60}>
        {users.map((user) => (
          <>
            <Text fontSize={16} fontWeight="bold">
              {`${user.first_name} ${user.last_name}`}
            </Text>
            {jobs.map((job) => (
              <>{job.user.id === user.id && <JobStatusCard key={job.id} job={job} />}</>
            ))}
          </>
        ))}
      </YStack>
    </YStack>
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

export default StaffPage
