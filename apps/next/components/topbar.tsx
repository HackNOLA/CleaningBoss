import { useRouter } from 'next/router'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/we15CCHfj08
 */
export default function TopBar({ title = 'Cleaning Boss' }) {
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
