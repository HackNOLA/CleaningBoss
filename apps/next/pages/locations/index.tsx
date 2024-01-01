import { useContext, useEffect, useState } from 'react'
import { Input, XStack, YStack, Text, View, Button } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import Map from 'components/map'
import { LocationCard } from '../../components/locationCard'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Radiogroup from 'components/radiogroup'
import Selection from 'components/select'
import TopBar from 'components/topbar'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

import supabase from 'context/supabasecontext'

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

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [locations, setLocations] = useState([])

  const { org } = useContext(OrgContext)

  const [calculateDriveTimes, setCalculateDriveTimes] = useState('')

  const router = useRouter()

  const [timeTrialOption, setTimeTrialOption] = useState('')

  const [shiftHours, onSelectShiftHours] = useState('')

  const [open, setOpen] = useState(false)

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
  const onSelectTimeTrialOption = (timeTrialOption: string) => {
    setTimeTrialOption(timeTrialOption)
  }
  if (!locations) {
    return <div>Loading...</div>
  }

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const onSelectCalculateDriveTimes = (calculateDriveTimes: string) => {
    setCalculateDriveTimes(calculateDriveTimes)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <View backgroundColor={'#F2F2F2'}>
      <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}>
        <View paddingTop={80} paddingBottom={40}>
          <Map locations={locations} />
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
          <input value={searchTerm} placeholder="Search Location" onChange={handleSearchChange} />
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
            <Button
              onClick={handleOpen}
              onPress={() => console.log('Filter users')}
              unstyled={true}
            >
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
            <LocationCard
              key={location.id}
              location={location}
              onClick={() => {
                router.push(`/locations/${location.id}`)
              }}
            />
          ))}
        </YStack>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="filter_modal"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className="select_box">
              <YStack className="cros_btn_top">
                <View className="modaltop" width={'345'}>
                  {scrollPosition < 20 && <TopBar title="Filter Location" />}{' '}
                </View>
                <Button
                  onClick={handleOpen}
                  onPress={() => console.log('Filter users')}
                  unstyled={true}
                >
                  {crossIcon}
                </Button>
              </YStack>

              <YStack
                space="$2"
                alignItems="flex-start"
                width={320}
                className="Preventradio"
                paddingBottom={16}
                paddingTop={60}
              >
                <Text
                  fontSize={16}
                  style={{ color: '#111860', fontWeight: '500', lineHeight: '1.6' }}
                >
                  Has Scheduled Shifts?
                </Text>
                <Radiogroup
                  items={['Yes', 'No']}
                  onChange={onSelectShiftHours}
                  value={shiftHours}
                />
              </YStack>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <YStack space="$2" alignItems="flex-start" width={'100%'}>
                <Text fontSize={16} color="#111860" fontWeight="500" lineHeight="1.6">
                  Number of Staffed Cleaners
                </Text>
                <Selection
                  items={['Yes', 'No']}
                  onChange={onSelectCalculateDriveTimes}
                  value={calculateDriveTimes}
                  placeholder="Select"
                />
              </YStack>

              <YStack space="$2" alignItems="flex-start" width={'100%'} className="Require_box">
                <Text fontSize={16} color="#111860" fontWeight="500" lineHeight="1.6">
                  Client since
                </Text>
                <Selection
                  items={['Yes', 'No']}
                  onChange={onSelectTimeTrialOption}
                  value={timeTrialOption}
                  placeholder="Select"
                />
              </YStack>
              <YStack space="$2" alignItems="center" className="modal_filterbtn" paddingTop={40}>
                <XStack space="$4">
                  <Button
                    onPress={handleClose}
                    borderColor={'#33CC4B'}
                    width={152.5}
                    height={48}
                    borderRadius={30}
                    marginRight={4}
                  >
                    <Text fontSize={16} color="#164E1F" fontWeight="600" lineHeight="1.6">
                      Cancel
                    </Text>
                  </Button>
                  <Button
                    onPress={() => {}}
                    width={152.5}
                    height={48}
                    backgroundColor={'#33CC4B'}
                    borderRadius={30}
                    marginLeft={4}
                  >
                    <Text color="white" fontSize={16} fontWeight="600" lineHeight={1.6}>
                      Apply Filters
                    </Text>
                  </Button>
                </XStack>
              </YStack>
            </Typography>
          </Box>
        </Modal>
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

const crossIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="#7579A3"
    width="24"
    height="24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
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
