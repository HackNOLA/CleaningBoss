import { useContext, useEffect, useState } from 'react'
import { Input, XStack, YStack, Text, View, Button } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import Map from 'components/map'
import TopBar from 'components/topbar'
import { LocationCard } from '../../components/locationCard'
import { Link } from 'solito/link'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export interface Location {
  id: number
  address: string
  name: string
  staffAmount: number
  image: string
}

const locations = [
  {
    id: 1,
    name: 'First Baptist Church',
    address: '123 main st, Gonzales, LA 78125',
    staffAmount: 9,
    image: 'Image.png',
  },
  {
    id: 2,
    name: 'Andrew’s Insurance',
    address: '1800 German Ave, New Orleans, LA, 70117',
    staffAmount: 9,
    image: 'img2.png',
  },
  {
    id: 3,
    name: 'Sunshine Nursing Home',
    address: '1800 Denem Dr., New Iberia, LA, 70162',
    staffAmount: 9,
    image: 'img3.png',
  },
  {
    id: 4,
    name: 'Lotus Care Center',
    address: '2121 Hillhaven Drive, LA, 90013',
    staffAmount: 9,
    image: 'img3.png',
  },
  {
    id: 5,
    name: 'New Providence Church',
    address: '3041 Evergreen Lane, LA, 90018',
    staffAmount: 9,
    image: 'img3.png',
  },
  {
    id: 6,
    name: 'Bank of America',
    address: '2950 Brannon Street, LA, 90017',
    staffAmount: 9,
    image: 'img3.png',
  }
]

const AddLocations = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [locations_list, setLocations] = useState([])

  const { org } = useContext(OrgContext)

  const router = useRouter()
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase.from('location').select().eq('id_company', org?.id)
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  if (!locations) {
    return <div>Loading...</div>
  }

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}> 
      <View width={'100%'}>{scrollPosition < 20 && <TopBar title="Locations" />}</View>
      <View paddingTop={80}>
          <Map locations_list={locations} />
        </View>
      <YStack backgroundColor="#f2f2f2" padding={16} paddingTop={25} className="addlocationmap">
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
            width="21"
            height="21"
            stroke="#646896"
            viewBox="0 0 50 50"
        >
            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
        </svg>

          <input
            value={searchTerm}
            placeholder="Search Location"
            onChange={handleSearchChange}
          />
        </XStack>
        <XStack
          className={scrollPosition > 20 ? 'fade' : 'item'}
          justifyContent="space-between"
          alignItems="center"
          width={'100%'}
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
            <Text fontSize={16} fontWeight="600" color="#111860">
              Filter
            </Text>
          </XStack>
          <Button onPress={() => router.replace('addlocation')} unstyled={true}>
            {plusIcon}
          </Button>
        </XStack>
        <YStack space="$4" className="loaction_pagemap">
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => {
                router.push(`/locations/${location.id}`)
              }}
            />
          ))}
          </YStack>
        </YStack>
        <YStack className="dashbaord_btm">
        <CleanerBottomNav page={page} setPage={setPage} />
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

function CleanerBottomNav({ page, setPage }) {
  return (
    <>
      <div
        style={{ zIndex: 99 }}
        className="fixed bottom-0 left-0 right-0 h-24 bg-white  shadow-lg flex items-center justify-around"
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
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#24662E" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 17.0002H16M11.0177 2.76424L4.23539 8.03937C3.78202 8.39199 3.55534 8.5683 3.39203 8.7891C3.24737 8.98469 3.1396 9.20503 3.07403 9.4393C3 9.70376 3 9.99094 3 10.5653V17.8002C3 18.9203 3 19.4804 3.21799 19.9082C3.40973 20.2845 3.71569 20.5905 4.09202 20.7822C4.51984 21.0002 5.07989 21.0002 6.2 21.0002H17.8C18.9201 21.0002 19.4802 21.0002 19.908 20.7822C20.2843 20.5905 20.5903 20.2845 20.782 19.9082C21 19.4804 21 18.9203 21 17.8002V10.5653C21 9.99094 21 9.70376 20.926 9.4393C20.8604 9.20503 20.7526 8.98469 20.608 8.7891C20.4447 8.5683 20.218 8.39199 19.7646 8.03937L12.9823 2.76424C12.631 2.49099 12.4553 2.35436 12.2613 2.30184C12.0902 2.2555 11.9098 2.2555 11.7387 2.30184C11.5447 2.35436 11.369 2.49099 11.0177 2.76424Z" stroke="#24662E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
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
           <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#24662E" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 8H3M16 2V5M8 2V5M12 18V12M9 15H15M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="#24662E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
            </div>
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
              <svg fill="#24662E" width="24px" height="24px" viewBox="0 -8 72 72" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
              <g id="Layer_5" data-name="Layer 5">
              <path d="M61.26,46.71h-.64c-.35,0-.35-.42-.35-.42V16.7a1.35,1.35,0,0,0-1.34-1.36H48.63a.33.33,0,0,1-.35-.36V9.28c0-.06,0-.12.21-.12a.75.75,0,0,0,.74-.75V7.07a.75.75,0,0,0-.74-.75H24.56a.75.75,0,0,0-.74.75V8.41a.75.75,0,0,0,.74.75.21.21,0,0,1,.22.22v5.47s0,.49-.28.49H13.37A1.35,1.35,0,0,0,12,16.7V46.38c0,.29-.15.33-.45.33h-.51a.75.75,0,0,0-.74.75V49a.75.75,0,0,0,.74.76H61.26A.75.75,0,0,0,62,49V47.46A.75.75,0,0,0,61.26,46.71ZM39.36,21.83h4.43a.6.6,0,0,1,.59.6v4.51a.6.6,0,0,1-.59.6H39.36a.59.59,0,0,1-.59-.6V22.43A.59.59,0,0,1,39.36,21.83ZM38.77,19V14.53a.59.59,0,0,1,.59-.6h4.43a.6.6,0,0,1,.59.6V19a.6.6,0,0,1-.59.6H39.36A.59.59,0,0,1,38.77,19Zm.59,10.41h4.43a.6.6,0,0,1,.59.6v4.51a.6.6,0,0,1-.59.6H39.36a.59.59,0,0,1-.59-.6V30.05A.59.59,0,0,1,39.36,29.45ZM40,38.51a.6.6,0,0,1,.59.6v7a.6.6,0,0,1-.59.6H33.16a.6.6,0,0,1-.6-.6v-7a.6.6,0,0,1,.6-.6ZM34.3,19a.6.6,0,0,1-.59.6H29.28a.59.59,0,0,1-.59-.6V14.53a.59.59,0,0,1,.59-.6h4.43a.6.6,0,0,1,.59.6V19Zm-5,2.79h4.43a.6.6,0,0,1,.59.6v4.51a.6.6,0,0,1-.59.6H29.28a.59.59,0,0,1-.59-.6V22.43A.59.59,0,0,1,29.28,21.83Zm0,7.62h4.43a.6.6,0,0,1,.59.6v4.51a.6.6,0,0,1-.59.6H29.28a.59.59,0,0,1-.59-.6V30.05A.59.59,0,0,1,29.28,29.45ZM50,22.29a.6.6,0,0,1,.59-.6H55a.6.6,0,0,1,.6.6V26.8a.6.6,0,0,1-.6.6H50.61a.6.6,0,0,1-.59-.6Zm0,7.9a.6.6,0,0,1,.59-.6H55a.6.6,0,0,1,.6.6V34.7a.6.6,0,0,1-.6.6H50.61a.6.6,0,0,1-.59-.6Zm0,7.62a.6.6,0,0,1,.59-.6H55a.6.6,0,0,1,.6.6v4.51a.6.6,0,0,1-.6.6H50.61a.6.6,0,0,1-.59-.6ZM16.67,22.29a.6.6,0,0,1,.59-.6h4.43a.59.59,0,0,1,.59.6V26.8a.59.59,0,0,1-.59.6H17.26a.6.6,0,0,1-.59-.6Zm0,7.9a.6.6,0,0,1,.59-.6h4.43a.59.59,0,0,1,.59.6V34.7a.59.59,0,0,1-.59.6H17.26a.6.6,0,0,1-.59-.6Zm0,7.62a.6.6,0,0,1,.59-.6h4.43a.59.59,0,0,1,.59.6v4.51a.59.59,0,0,1-.59.6H17.26a.6.6,0,0,1-.59-.6Z"/>
              </g>
              </svg>
            </div>
            <span className="mt-1 text-xs userocations">Locations</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col items-center justify-center text-center">
            <div
              onClick={() => setPage(2)}
              className={`w-10 h-10 rounded-full bg-[${
                page === 2 ? '#33CC4B' : 'transparent'
              }] flex items-center justify-center`}
            >
            <svg width="18px" height="20px" viewBox="0 0 24 24" fill="none" stroke="#24662E" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3.46776C17.4817 4.20411 18.5 5.73314 18.5 7.5C18.5 9.26686 17.4817 10.7959 16 11.5322M18 16.7664C19.5115 17.4503 20.8725 18.565 22 20M2 20C3.94649 17.5226 6.58918 16 9.5 16C12.4108 16 15.0535 17.5226 17 20M14 7.5C14 9.98528 11.9853 12 9.5 12C7.01472 12 5 9.98528 5 7.5C5 5.01472 7.01472 3 9.5 3C11.9853 3 14 5.01472 14 7.5Z" stroke="#24662E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default AddLocations
