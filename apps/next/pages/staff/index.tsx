import React, { useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'

interface User {
  id: number
  name: string
  email: string
  phone: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '(123)-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '(123)-456-7890' },
  { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com', phone: '(123)-456-7890' },
  { id: 4, name: 'Joe Fraiser', email: 'alicewilliams@example.com', phone: '(123)-456-7890' },
  { id: 5, name: 'Cotton Berry', email: 'alicewilliams@example.com', phone: '(123)-456-7890' },
  { id: 6, name: 'Will Williams', email: 'alicewilliams@example.com', phone: '(123)-456-7890' },
  { id: 7, name: 'Havy Ngyuen', email: 'alicewilliams@example.com', phone: '(123)-456-7890' },
]

const UserCard = ({ user }: { user: User }) => (
  <Card className="load-hidden" backgroundColor={'white'} width={350}>
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
            {user.name}
          </Text>

          <Text color={'blue'} fontSize={14}>
            {'Cleaner'}
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

  useEffect(() => {
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <YStack height={'100ch'} paddingTop={160}>
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
        <XStack
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
          <Button onPress={() => console.log('Add user')} unstyled={true}>
            {plusIcon}
          </Button>
        </XStack>
      </YStack>
      <YStack space="$4" paddingTop={60}>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
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