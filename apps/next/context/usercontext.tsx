import React, { createContext, useState } from 'react'

interface UserContextType {
  clerkId: string
  setClerkId: React.Dispatch<React.SetStateAction<string>>
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  activeUser: object
  setActiveUser: React.Dispatch<React.SetStateAction<object>>
}

export const UserContext = createContext<UserContextType>({
  clerkId: '',
  setClerkId: () => {},
  email: '',
  setEmail: () => {},
  activeUser: {},
  setActiveUser: () => {},
})

const UserProvider: React.FC = ({ children }: any) => {
  const [activeUser, setActiveUser] = useState({})
  const [clerkId, setClerkId] = useState('')
  const [email, setEmail] = useState('')

  return (
    <UserContext.Provider
      value={{ activeUser, setActiveUser, clerkId, setClerkId, email, setEmail }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
