import Head from 'next/head'
import { SignIn, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Link } from 'solito/link'
import StaffPage from 'pages/staff'
import Dashboard from './screen'
import Script from 'next/script'
import { ToggleGroup, YStack } from '@my/ui'

export default function Page() {
  const { signedIn }: any = useAuth()
  const [page, setPage] = useState(0)
  const [title, setTitle] = useState('Cleaning Boss')
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    switchTitle(page)
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [page])

  const switchTitle = (page: number) => {
    switch (page) {
      case 0:
        setTitle('Cleaning Boss')
        break
      case 1:
        setTitle('Calendar')
        break
      case 2:
        setTitle('Locations')
        break
      case 3:
        setTitle('Users')
        break
      default:
        setTitle('Cleaning Boss')
    }
  }

  return (
    <>
      <Head>
        <title>Cleaning Boss</title>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css" rel="stylesheet" />
        <style>
          {`
          .item {
            /* Your header styles */
            transition: opacity 0.3s ease; /* Add a transition effect for a smooth fade */
          }

          .fade {
            opacity: 0; /* Adjust the opacity value to control the fading effect */
          }

          .mapboxgl-ctrl-geocoder  {
            display: flex !important;
            // position: fixed !important;
            align-items: center !important;
          }

          li {
            list-style: none;
            background-color: #fff;
            padding: 0.5rem;
          }

          svg {
            width: 32px !important;
          }

          .mapboxgl-ctrl-geocoder--input {
            width: 100% !important;
            border-radius: 0.375rem !important;
            border: 1px solid #E5E5E5 !important;
            padding: 0.5rem !important;
            font-size: 0.875rem !important;
            line-height: 1.25rem !important;
            color: #4B5563 !important;
            background-color: #F9FAFB !important;
          }

          .mapboxgl-ctrl-geocoder--pin-right {
            display: flex !important;
            justify-content: center !important;
          }
          `}
        </style>
      </Head>
      {/* { signedIn && <HomeScreen /> }
      { !signedIn && <>
      </> } */}
      {/* <Dashboard /> */}
      <TopBar title={title} />
      <div
        style={{ height: '100ch' }}
        className="flex justify-center	items-center p-4 bg-[#F2F2F2] "
      >
        {page === 0 && (
          <>
            <div style={{ backgroundColor: '#F2F2F2', height: '100ch', width: '100wh' }}>
              <Dashboard />
            </div>
          </>
        )}
        {page === 1 && (
          <>
            <div style={{ backgroundColor: '#F2F2F2', height: '100ch', width: '100wh' }}></div>
          </>
        )}
        {page === 2 && (
          <>
            <div style={{ backgroundColor: '#F2F2F2', height: '100ch', width: '100wh' }}></div>
          </>
        )}
        {page === 3 && (
          <>
            <StaffPage />
          </>
        )}
      </div>
      {scrollPosition < 20 && <BottomNav page={page} setPage={setPage} />}
    </>
  )
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/we15CCHfj08
 */
function TopBar({ title = 'Cleaning Boss' }) {
  const router = useRouter()
  return (
    <div
      style={{ display: 'flex' }}
      className="flex items-center justify-between p-4 bg-[#4E5DDE] h-20 fixed w-full"
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-black dark:text-white">{title}</span>
      </div>
      <div className="flex items-center space-x-4">
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
          <path d="M17 6.1H3" />
          <path d="M21 12.1H3" />
          <path d="M15.1 18H3" />
        </svg>
        <span className="sr-only">Open chat</span>
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
      </div>
    </div>
  )
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qJwy6u9bScs
 */
function BottomNav({ page, setPage }) {
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
              <svg
                className={` w-6 h-6 text-${page === 0 ? 'white' : 'black'}`}
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
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="mt-1 text-xs">Dashboard</span>
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
              <svg
                className={` w-6 h-6 text-${page === 1 ? 'white' : 'black'}`}
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
                <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <span className="mt-1 text-xs">Calendar</span>
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
              <svg
                className={` w-6 h-6 text-${page === 2 ? 'white' : 'black'}`}
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
                <rect height="20" rx="2" ry="2" width="16" x="4" y="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M12 6h.01" />
                <path d="M12 10h.01" />
                <path d="M12 14h.01" />
                <path d="M16 10h.01" />
                <path d="M16 14h.01" />
                <path d="M8 10h.01" />
                <path d="M8 14h.01" />
              </svg>
            </div>
            <span className="mt-1 text-xs">Locations</span>
          </div>
        </Link>
        <Link href="#">
          <div className="flex flex-col items-center justify-center text-center">
            <div
              style={{ backgroundColor: page === 3 ? '#33CC4B' : 'transparent' }}
              onClick={() => setPage(3)}
              className={`w-10 h-10 rounded-full bg-[${
                page === 3 ? '#33CC4B' : 'transparent'
              }] flex items-center justify-center`}
            >
              <svg
                className={` w-6 h-6 text-${page === 3 ? 'white' : 'black'}`}
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="mt-1 text-xs">Users</span>
          </div>
        </Link>
      </div>
    </>
  )
}
