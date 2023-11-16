import React, { createContext, useState } from 'react'

interface OrgContextType {
  orgName: string
  setOrgName: React.Dispatch<React.SetStateAction<string>>
  org: object
  setOrg: React.Dispatch<React.SetStateAction<object>>
}

export const OrgContext = createContext<OrgContextType>({
  orgName: '',
  setOrgName: () => {},
  org: {},
  setOrg: () => {},
})

const OrgProvider: React.FC = ({ children }: any) => {
  const [org, setOrg] = useState({})
  const [orgName, setOrgName] = useState('')

  return (
    <OrgContext.Provider value={{ org, setOrg, orgName, setOrgName }}>
      {children}
    </OrgContext.Provider>
  )
}

export default OrgProvider
