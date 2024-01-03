import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { TaskCard } from 'components/taskCard'
import { OrgContext } from 'context/orgcontext'
import Calendar from 'components/calendar'
import supabase from 'context/supabasecontext'

interface Task {
  id: number
  time: string
  location: string
  day: string
  activeCleaners: number
  totalCleaners: number
}

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [shifts, setShifts] = useState([])

  const [users, setUsers] = useState([])

  const { org } = useContext(OrgContext)

  const router = useRouter()

  useEffect(() => {
    const fetchShifts = async () => {
      const { data } = await supabase.from('shifts').select().eq('id_company', org?.id)
      setShifts(data)
    }
    fetchShifts()
    // const handleScroll = () => {
    //   const position = window.scrollY
    //   setScrollPosition(position)
    // }
    // window.addEventListener('scroll', handleScroll)
    // return () => {
    //   window.removeEventListener('scroll', handleScroll)
    // }
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  if (shifts) {
    var filteredTasks = shifts.filter((task) =>
      task.location_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  return (
    <View backgroundColor={'#F2F2F2'}>
      <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}>
        <View paddingTop={80}>
          {/* <Map /> */}
          <Calendar shifts={shifts} />
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
        <YStack space="$4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={() => {
                router.replace(`/shift/${task.id}`)
              }}
            />
          ))}
        </YStack>
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

export default Tasks
