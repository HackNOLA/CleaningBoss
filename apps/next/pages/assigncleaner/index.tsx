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

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

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

  const [users, setUsers] = useState([])

  const [bgColor, setBgColor] = useState('green' as any)

  const { org } = useContext(OrgContext)

  const router = useRouter()

  const [page, setPage] = useState(0)

  useEffect(() => {
    // const fetchOrg = async () => {
    //   const { data } = await supabase.from('users').select().eq('id_company', org?.id)
    //   setUsers(data)
    // }
    // fetchOrg()
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

  const filteredTasks = tasks.filter((task) =>
    task.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  function AdminBottomNav({ page, setPage }) {
<<<<<<< HEAD
  return (
    <>
      <div

        style={{ zIndex: 99 }}
        className="fixed bottom-0 left-0 right-0 h-24 bg-white  shadow-lg flex items-center justify-around bottomdashboard"
      >
        <Link href="#">
          <div className="flex flex-col items-center justify-center text-center z-2">
            <div
              style={{ backgroundColor: page === 0 ? '#33CC4B' : 'transparent' }}
              onClick={() => setPage(0)}
              className={`w-10 h-10 rounded-full bg-[${
                page === 0 ? '#33CC4B' : 'transparent'
              }] flex items-center justify-center  z-4`}
            >
              <svg
                className={` w-6 h-6 text-${page === 0 ? 'white' : 'black'}`}
                fill="none"
                height="18"
                stroke="#24662E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="mt-1 text-xs" color="#1A4C22" >Dashboard</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col items-center justify-center text-center">
            <div
              onClick={() => setPage(1)}
              style={{ backgroundColor: page === 1 ? '#33CC4B' : 'transparent' }}
              className={`w-10 h-10 rounded-full bg-[${
                page === 1 ? '#33CC4B' : 'transparent'
              }] flex items-center justify-center`}
            >
              <svg
                className={` w-6 h-6 text-${page === 1 ? 'white' : 'black'}`}
                fill="none"
                height="18"
                stroke="#24662E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <span className="mt-1 text-xs">Calendar</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col items-center justify-center text-center">
            <div
              onClick={() => setPage(2)}
              style={{ backgroundColor: page === 2 ? '#33CC4B' : 'transparent' }}
              className={`w-10 h-10 rounded-full bg-[${
                page === 2 ? '#33CC4B' : 'transparent'
              }] flex items-center justify-center`}
            >
              <svg
                className={` w-6 h-6 text-${page === 2 ? 'white' : 'black'}`}
                fill="none"
                height="18"
                stroke="#24662E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height="20" rx="2" ry="2" width="16" x="4" y="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M12 6h.01" />
                <path d="M12 10h.01" />
                <path d="M12 14h.01" />
                <path d="M16 10h.01" />
                <path d="M16 14h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
            </div>
            <span className="mt-1 text-xs">Locations</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col items-center justify-center text-center">
            <div
              style={{ backgroundColor: page === 3 ? '#33CC4B' : 'transparent' }}
              onClick={() => setPage(3)}
              className={`w-10 h-10 rounded-full bg-[${
                page === 3 ? '#33CC4B' : 'transparent'
              }] flex items-center justify-center`}
            >
              <svg
                className={` w-6 h-6 text-${page === 3 ? 'white' : 'black'}`}
                fill="none"
                height="18"
                stroke="#24662E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="mt-1 text-xs">Users</span>
          </div>
        </Link>
      </div>
    </>
  )
}

  return (
    <YStack justifyContent="center" alignItems="center">
      <View width={'100%'}>{scrollPosition < 20 && <TopBar title="Assign Cleaners" />}</View>
      <CurrentToast bgColor={bgColor} />
        <View backgroundColor={'#F2F2F2'}>
          <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}>
            <View paddingTop={80}>
              {/* <Map /> */}
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
                <Button onPress={() => router.replace('addjob')} unstyled={true}>
                  {plusIcon}
                </Button>
              </XStack>
            </XStack>
            <YStack space="$4">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </YStack>
          </YStack>
        </View>
        {scrollPosition < 30 && (
=======
    return (
      <>
>>>>>>> ff652a7cde7c3e4b7680483a8bf1c1f1910463e9
        <div
          style={{ zIndex: 99 }}
          className="fixed bottom-0 left-0 right-0 h-24 bg-white  shadow-lg flex items-center justify-around slick_sliderr"
        >
          <Link href="#">
            <div className="flex flex-col items-center justify-center text-center z-2">
              <div
                style={{ backgroundColor: page === 0 ? '#33CC4B' : 'transparent' }}
                onClick={() => setPage(0)}
                className={`w-10 h-10 rounded-full bg-[${
                  page === 0 ? '#33CC4B' : 'transparent'
                }] flex items-center justify-center  z-4`}
              >
                <svg
                  className={` w-6 h-6 text-${page === 0 ? 'white' : 'black'}`}
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
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="mt-1 text-xs">Dashboard</span>
            </div>
          </Link>
          <Link href="#">
            <div className="flex flex-col items-center justify-center text-center">
              <div
                onClick={() => setPage(1)}
                style={{ backgroundColor: page === 1 ? '#33CC4B' : 'transparent' }}
                className={`w-10 h-10 rounded-full bg-[${
                  page === 1 ? '#33CC4B' : 'transparent'
                }] flex items-center justify-center`}
              >
                <svg
                  className={` w-6 h-6 text-${page === 1 ? 'white' : 'black'}`}
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
              </div>
              <span className="mt-1 text-xs">Calendar</span>
            </div>
          </Link>
          <Link href="#">
            <div className="flex flex-col items-center justify-center text-center">
              <div
                onClick={() => setPage(2)}
                style={{ backgroundColor: page === 2 ? '#33CC4B' : 'transparent' }}
                className={`w-10 h-10 rounded-full bg-[${
                  page === 2 ? '#33CC4B' : 'transparent'
                }] flex items-center justify-center`}
              >
                <svg
                  className={` w-6 h-6 text-${page === 2 ? 'white' : 'black'}`}
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
                  <rect height="20" rx="2" ry="2" width="16" x="4" y="2" />
                  <path d="M9 22v-4h6v4" />
                  <path d="M8 6h.01" />
                  <path d="M16 6h.01" />
                  <path d="M12 6h.01" />
                  <path d="M12 10h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 10h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 10h.01" />
                  <path d="M8 14h.01" />
                </svg>
              </div>
              <span className="mt-1 text-xs">Locations</span>
            </div>
          </Link>
          <Link href="#">
            <div className="flex flex-col items-center justify-center text-center">
              <div
                style={{ backgroundColor: page === 3 ? '#33CC4B' : 'transparent' }}
                onClick={() => setPage(3)}
                className={`w-10 h-10 rounded-full bg-[${
                  page === 3 ? '#33CC4B' : 'transparent'
                }] flex items-center justify-center`}
              >
                <svg
                  className={` w-6 h-6 text-${page === 3 ? 'white' : 'black'}`}
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="mt-1 text-xs">Users</span>
            </div>
          </Link>
        </div>
      </>
    )
  }

<<<<<<< HEAD
          <YStack space="$2" width={'320'} alignItems="center">
            <Text fontSize={16} className="slick_text"color="#111860" lineHeight="1.6" fontWeight="500" textAlign="left">
                Available Cleaners
            </Text>
            <Slider 
            style={{width:'100%'}}
            width={'100%'}
            {...slider_settings}>
            {slides.map((slide) => (
=======
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
              <Button onPress={() => router.replace('addjob')} unstyled={true}>
                {plusIcon}
              </Button>
            </XStack>
          </XStack>
          <YStack space="$4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </YStack>
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
>>>>>>> ff652a7cde7c3e4b7680483a8bf1c1f1910463e9
                <SlideCard key={slide.id} slide={slide} />
              ))}
            </Slider>
            {/* <AdminBottomNav page={page} setPage={setPage} /> */}
          </YStack>
        </div>
      )}
<<<<<<< HEAD
      <YStack>
           <AdminBottomNav page={page} setPage={setPage} />
     </YStack>
  </YStack>

=======
    </YStack>
>>>>>>> ff652a7cde7c3e4b7680483a8bf1c1f1910463e9
  )
}

export default AssignCleaner
