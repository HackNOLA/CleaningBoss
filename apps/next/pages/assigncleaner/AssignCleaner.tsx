import React, { useContext, useEffect, useState } from 'react'
import { XStack, YStack, Text, View, Button } from '@my/ui'
import { useRouter } from 'next/router'
import { OrgContext } from 'context/orgcontext'
import TopBar from 'components/topbar'
import { CurrentToast } from 'components/CurrentToast'
import Slider from 'react-slick'
import { TaskCard } from 'components/taskCard'
import { supabase, tasks, slider_settings, slides, SlideCard } from '.'

export const AssignCleaner = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [shifts, setShifts] = useState([])

  const [bgColor, setBgColor] = useState('green' as any)

  const { org } = useContext(OrgContext)

  const router = useRouter()

  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchShifts = async () => {
      const { data } = await supabase.from('shifts').select().eq('id_company', org?.id)
      setShifts(data)
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

  const filteredTasks = tasks.filter((task) =>
    task.location.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Button onPress={() => router.replace('/addshift')} unstyled={true}>
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
