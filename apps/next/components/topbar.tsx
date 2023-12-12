import { ListItem } from '@mui/material'
import { YGroup, Select } from '@my/ui'
import { useRouter } from 'next/router'
import { ChevronRight, Cloud, Moon, Star, Sun } from '@tamagui/lucide-icons'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/we15CCHfj08
 */
export default function TopBar({ title = 'Cleaning Boss', page }) {
  const router = useRouter()

  return (
    <div
      style={{
        display: 'flex',
        zIndex: 3000, // or more than the
      }}
      className="flex items-center justify-between p-4 bg-[#4E5DDE] h-20 fixed w-full"
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-black dark:text-white">{title}</span>
      </div>
      <div className="flex items-center space-x-4">
        {/* <span className="sr-only">Open chat</span> */}
        {page === 0 && <Settings />}
        {page === 1 && <AssignJob />}
        {page === 2 && <Options />}
      </div>
    </div>
  )
}

const Options = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // console.log(event.currentTarget)
    setIsOpen(!isOpen)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    console.log(isOpen)
    setIsOpen(false)
  }

  return (
    <div
      onClick={(e) => {
        console.log('clicked')
        setIsOpen(true)
        handleClick(e)
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 16 16"
        fill="#FFFFFF"
      >
        <script />
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      </svg>
      <ListItemDemo1
        anchorEl={anchorEl}
        open={isOpen}
        setIsOpen={setIsOpen}
        onClose={handleClose}
      />
    </div>
  )
}

const AssignJob = () => {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        console.log('clicked')
        router.replace('/assigncleaner')
      }}
    >
      <svg
        width="25"
        height="22"
        viewBox="0 0 25 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5556 17.6667L18.7778 19.8889L23.2222 15.4444M12.1111 14.3333H7.66667C5.59582 14.3333 4.56039 14.3333 3.74363 14.6716C2.65462 15.1227 1.7894 15.9879 1.33831 17.077C1 17.8937 1 18.9291 1 21M16 1.32307C17.6288 1.98238 18.7778 3.57923 18.7778 5.44444C18.7778 7.30965 17.6288 8.9065 16 9.56582M13.7778 5.44444C13.7778 7.89904 11.7879 9.88889 9.33333 9.88889C6.87873 9.88889 4.88889 7.89904 4.88889 5.44444C4.88889 2.98985 6.87873 1 9.33333 1C11.7879 1 13.7778 2.98985 13.7778 5.44444Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  )
}

const Settings = () => {
  const router = useRouter()

  return (
    <div onClick={() => router.replace('/settings')}>
      <svg
        className=" w-6 h-6 text-white"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span className="sr-only">Open settings</span>
    </div>
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
        <MenuItem onClick={() => router.replace('/checklist/manage')}>Manage Checklists</MenuItem>
        {/* <MenuItem onClick={() => setIsOpen(false)}>My account</MenuItem> */}
        <MenuItem onClick={() => router.replace('/addlocation')}>Add Location</MenuItem>
      </Menu>
    </div>
  )
}
