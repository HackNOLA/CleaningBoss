import React, { useContext, useEffect, useState } from 'react'
import { Input, Card, XStack, YStack, Text, View, Button, Image } from '@my/ui'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { OrgContext } from 'context/orgcontext'
import TopBar from 'components/topbar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import supabase from 'context/supabasecontext'

interface CheckList {
  id: number
  name: string
  list: Array<{ id: number; name: string; completed: boolean }>
}

const exampleCheckLists = [
  {
    id: 1,
    name: 'Conference Room',
    list: [
      {
        id: 1,
        name: 'Clean the kitchen',
        completed: false,
      },
      {
        id: 2,
        name: 'Clean the bathroom',
        completed: false,
      },
      {
        id: 3,
        name: 'Clean the living room',
        completed: false,
      },
      {
        id: 4,
        name: 'Clean the bedroom',
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Basement',
    list: [
      {
        id: 1,
        name: 'Clean the kitchen',
        completed: false,
      },
      {
        id: 2,
        name: 'Clean the bathroom',
        completed: false,
      },
      {
        id: 3,
        name: 'Clean the living room',
        completed: false,
      },
      {
        id: 4,
        name: 'Clean the bedroom',
        completed: false,
      },
    ],
  },
  {
    id: 3,
    name: 'Kitchen',
    list: [
      {
        id: 1,
        name: 'Clean the kitchen',
        completed: false,
      },
      {
        id: 2,
        name: 'Clean the bathroom',
        completed: false,
      },
      {
        id: 3,
        name: 'Clean the living room',
        completed: false,
      },
      {
        id: 4,
        name: 'Clean the bedroom',
        completed: false,
      },
    ],
  },
  {
    id: 4,
    name: 'Attic',
    list: [
      {
        id: 1,
        name: 'Clean the kitchen',
        completed: false,
      },
      {
        id: 2,
        name: 'Clean the bathroom',
        completed: false,
      },
      {
        id: 3,
        name: 'Clean the living room',
        completed: false,
      },
      {
        id: 4,
        name: 'Clean the bedroom',
        completed: false,
      },
    ],
  },
]

const CheckListCard = ({ checkList }: { checkList: CheckList }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsOpen(!isOpen)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Card className="load-hidden" backgroundColor={'white'} width={350} height={250}>
      <YStack padding={10}>
        <XStack width={340} justifyContent="space-between">
          <Text fontSize={14} fontWeight="bold">
            {`${checkList.name}`}
          </Text>
          <XStack space="$0" alignItems="center" justifyContent="space-evenly" paddingRight={12}>
            <div
              onClick={(e) => {
                setIsOpen(true)
                handleClick(e)
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10C16.9 10 16 10.9 16 12ZM14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12ZM6 10C7.1 10 8 10.9 8 12C8 13.1 7.1 14 6 14C4.9 14 4 13.1 4 12C4 10.9 4.9 10 6 10Z"
                  fill="#A0A0A0"
                />
              </svg>
              <ListItemDemo1
                anchorEl={anchorEl}
                open={isOpen}
                setIsOpen={setIsOpen}
                onClose={handleClose}
              />
            </div>
          </XStack>
        </XStack>

        <YStack>
          {checkList.list.map((item) => (
            <XStack
              key={item.id}
              space="$2"
              alignItems="center"
              width={250}
              height={40}
              padding={8}
            >
              <input type="checkbox" />
              <Text fontSize={14} fontWeight="bold">
                {item.name}
              </Text>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </Card>
  )
}
const ManageChecklist = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [scrollPosition, setScrollPosition] = useState(0)

  const [users, setUsers] = useState([])

  const { org } = useContext(OrgContext)

  const router = useRouter()

  useEffect(() => {
    // const fetchOrg = async () => {
    //   const { data } = await supabase.from('users').select().eq('id_company', org?.id)
    //   setUsers(data)
    // }
    // fetchOrg()

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

  if (!users) return <div>Loading...</div>

  const filteredChecklist = exampleCheckLists.filter((checkList) =>
    checkList.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <YStack height={'100ch'} backgroundColor={'#F2F2F2'}>
      <TopBar title="Manage Checklist" page={3} />
      <YStack
        space="$4"
        paddingTop={160}
        paddingLeft={20}
        paddingRight={20}
        justifyContent="center"
        className={scrollPosition > 20 ? 'fade' : 'item'}
      >
        <View justifyContent="center">
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
              placeholder="Search Checklist"
              onChange={handleSearchChange}
            />
          </XStack>
        </View>
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
          <Button onPress={() => router.replace('/addjob')} unstyled={true}>
            {plusIcon}
          </Button>
        </XStack>
      </YStack>
      <YStack
        space="$4"
        paddingTop={60}
        justifyContent="center"
        alignItems="center"
        paddingBottom={30}
      >
        {filteredChecklist.map((checkList) => (
          <CheckListCard key={checkList.id} checkList={checkList} />
        ))}
      </YStack>
    </YStack>
  )
}

function ListItemDemo1({ anchorEl, open, onClose: handleClose, setIsOpen }) {
  const router = useRouter()

  return (
    <div
    // style={{
    //   display: open ? 'block' : 'none', // or more than the
    // }}
    >
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{
          zIndex: 3001, // or more than the
        }}
      >
        <MenuItem onClick={() => router.replace('/checklist/edit')}>Edit Checklist</MenuItem>
        {/* <MenuItem onClick={() => setIsOpen(false)}>My account</MenuItem> */}
        <MenuItem onClick={() => console.log('delete checklist')}>Delete Checklist</MenuItem>
      </Menu>
    </div>
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

export default ManageChecklist
