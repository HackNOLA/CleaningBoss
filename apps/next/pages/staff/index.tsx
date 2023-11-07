import React, { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
  { id: 4, name: 'Alice Williams', email: 'alicewilliams@example.com' },
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
      <input type="text" placeholder="Search users" onChange={handleSearchChange} />
      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default StaffPage
