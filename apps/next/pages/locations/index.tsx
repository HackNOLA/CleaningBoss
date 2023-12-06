import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import Map from 'components/map'

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

const locations = [
  {
    id: 1,
    address: '1234 Main St, Gonzales, LA 70737',
    name: 'Main Office',
    staffAmount: 5,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 2,
    address: '1234 Main St, Gonzales, LA 70737',
    name: 'Main Office',
    staffAmount: 5,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 3,
    address: '1234 Main St, Gonzales, LA 70737',
    name: 'Main Office',
    staffAmount: 5,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 4,
    address: '1234 Main St, Gonzales, LA 70737',
    name: 'Main Office',
    staffAmount: 5,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 5,
    address: '1234 Main St, Gonzales, LA 70737',
    name: 'Main Office',
    staffAmount: 5,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 6,
    address: '1234 Main St, Gonzales, LA 70737',
    name: 'Main Office',
    staffAmount: 5,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 7,
    address: '1234 Main St, Gonzales, LA 70737',
    name: 'Main Office',
    staffAmount: 5,
    image: 'https://source.unsplash.com/random',
  },
  {
    id: 8,
    address: '1234 Main St, Gonzales, LA 70737',
    name: 'Main Office',
    staffAmount: 5,
    image: 'https://source.unsplash.com/random',
  },
]

const LocationCard = ({ location }: { location: Location }) => (
  <Card className="load-hidden" backgroundColor={'white'}>
    <XStack>
      <Image
        zIndex={0}
        source={{
          uri: 'https://source.unsplash.com/random',
        }}
        width={80}
        height={80}
        borderTopLeftRadius={10}
        borderBottomLeftRadius={10}
        alt="avatar"
      />
      <Card.Header></Card.Header>
      <YStack top={16}>
        <XStack width={250} justifyContent="space-between">
          <Text fontSize={14} fontWeight="bold">
            {`${location.name}`}
          </Text>
          <XStack space="$0" alignItems="center" justifyContent="space-evenly" paddingRight={12}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.75 12.1667C3.11254 10.7215 4.96243 9.83333 7 9.83333C9.03757 9.83333 10.8875 10.7215 12.25 12.1667M9.625 4.875C9.625 6.32475 8.44975 7.5 7 7.5C5.55025 7.5 4.375 6.32475 4.375 4.875C4.375 3.42525 5.55025 2.25 7 2.25C8.44975 2.25 9.625 3.42525 9.625 4.875Z"
                stroke="#3A4ADF"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <Text color={'blue'} fontSize={14}>
              {`${location.staffAmount || 0}`}
            </Text>
          </XStack>

          {/* <Text color={'blue'} fontSize={14}>
          </Text> */}
        </XStack>
        <Text fontSize={14} color={'slategray'} width={250} paddingRight={12} numberOfLines={2}>
          {location.address1}
        </Text>
      </YStack>
    </XStack>
  </Card>
)

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [locations, setLocations] = useState([])

  const { org } = useContext(OrgContext)

  const router = useRouter()

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase.from('location').select().eq('id_company', org?.id)
      console.log(data)
      setLocations(data)
    }
    fetchLocations()
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

  if (!locations) {
    return <div>Loading...</div>
  }

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <View backgroundColor={'#F2F2F2'}>
      <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}>
        <View paddingTop={80} paddingBottom={40}>
          <Map markers={locations} />
        </View>
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
            placeholder="Search Location"
            onChange={handleSearchChange}
          />
        </XStack>
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
          <Button onPress={() => router.replace('addlocation')} unstyled={true}>
            {plusIcon}
          </Button>
        </XStack>
        <YStack space="$4">
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
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

export default Locations
