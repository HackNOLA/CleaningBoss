import React, { useContext, useEffect, useState } from 'react'
import { Input, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import Calendar from 'components/calendar'
import TopBar from 'components/topbar'
import { CurrentToast } from 'components/CurrentToast'
import type { NextPage } from 'next'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'solito/link'
import { TaskCard } from 'components/taskCard'
import supabase from 'context/supabasecontext'

const slides = [
  {
    id: 1,
    image: './Photocleint.png',
    name: 'John Smith',
  },
  {
    id: 2,
    image: './Photocleint.png',
    name: 'John Smith',
  },
  {
    id: 3,
    image: './Photocleint.png',
    name: 'John Smith',
  },
  {
    id: 4,
    image: './Photocleint.png',
    name: 'John Smith',
  },
  {
    id: 5,
    image: './Photocleint.png',
    name: 'John Smith',
  },
  {
    id: 6,
    image: './Photocleint.png',
    name: 'John Smith',
  },
  {
    id: 7,
    image: './Photocleint.png',
    name: 'John Smith',
  },
  {
    id: 8,
    image: './Photocleint.png',
    name: 'John Smith',
  },

  {
    id: 9,
    image: './/Photocleint.png',
    name: 'John Smith',
  },
]

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

const SlideCard = ({ slide }: { slide: Slide }) => (
  <div className={'cleaner'}>
    <img src={slide.image} alt="Slide 1" width={44} height={44} margin={0} />
    <Text fontSize={14} color="#363A63">
      {slide.name}
    </Text>
  </div>
)

const slider_settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
}

const AssignCleaner = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [shifts, setShifts] = useState([])

  const [bgColor, setBgColor] = useState('green' as any)

  const { org } = useContext(OrgContext)

  const router = useRouter()

  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchShifts = async () => {
      const { data: shifts } = await supabase.from('shifts').select().eq('id_company', org?.id)
      setShifts(shifts)
    }
    fetchShifts()
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

  if (shifts) {
    var filteredTasks = shifts.filter((shift) =>
      shift.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

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

  return (
    <YStack justifyContent="center" alignItems="center" backgroundColor={'#F2F2F2'}>
      <View width={'100%'}>{scrollPosition < 20 && <TopBar title="Assign Cleaners" />}</View>
      <CurrentToast bgColor={bgColor} />
      <View backgroundColor={'#F2F2F2'}>
        <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}>
          <View paddingTop={80}>{/* <Map /> */}</View>
          <XStack
            className={scrollPosition > 20 ? 'fade' : 'item'}
            justifyContent="space-between"
            alignItems="baseline"
            width={340}
          >
            <XStack
              paddingBottom={20}
              paddingTop={20}
              paddingLeft={20}
              fontColor={'#33CC4B'}
              space="$2"
              justifyContent="space-between"
              width={'100%'}
              alignItems="center"
            >
              <Text fontSize={16} color="#111860" fontWeight="500" lineheight="16">
                Available Shifts
              </Text>
              <Button onPress={() => router.replace('/shift/add')} unstyled={true}>
                {plusIcon}
              </Button>
            </XStack>
          </XStack>
          {shifts && (
            <YStack space="$4">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </YStack>
          )}
          {!shifts && (
            <Text fontSize={16} color="#111860" fontWeight="500" lineheight="16">
              No shifts available
            </Text>
          )}
        </YStack>
      </View>
      {scrollPosition < 30 && (
        <div
          style={{ zIndex: 99 }}
          className="fixed bottom-0 left-0 right-0 h-24 bg-white  shadow-lg flex items-center justify-around"
        >
          <YStack space="$2" width={'100%'} alignItems="center">
            <Slider style={{ width: '100%' }} width={'100%'} {...slider_settings}>
              {slides.map((slide) => (
                <SlideCard key={slide.id} slide={slide} />
              ))}
            </Slider>
            {/* <AdminBottomNav page={page} setPage={setPage} /> */}
          </YStack>
        </div>
      )}
    </YStack>
  )
}

export default AssignCleaner
