import React, { useState } from 'react'
import { Input, XStack, YStack } from '@my/ui'

interface User {
  id: number
  name: string
  email: string
  phone: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '123-456-7890' },
  { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com', phone: '123-456-7890' },
  { id: 4, name: 'Alice Williams', email: 'alicewilliams@example.com', phone: '123-456-7890' },
]

const UserCard = ({ user }: { user: User }) => (
  <div>
    <h3>{user.name}</h3>
    <p>{user.email}</p>
  </div>
)

const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <XStack
        space="$3"
        alignItems="center"
        borderColor={'slategray'}
        borderWidth={1}
        borderRadius={10}
        width={350}
        height={50}
        padding={8}
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
      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default StaffPage
