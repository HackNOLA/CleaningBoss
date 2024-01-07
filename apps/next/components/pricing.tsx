/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dzFmkPdMHEI
 */
import { Button, XStack } from '@my/ui'

export default function Component() {
  return (
    <div id="pricing" className="grid gap-4 md:gap-8 lg:grid-cols-2 px-4 md:px-6 py-6 md:py-8">
      <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800">
        <div className="px-6 py-8 md:py-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Admin Plan</h3>
          <p className=" text-sm text-transparent dark:text-gray-400">
            Perfect for larger businesses or enterprises
          </p>
          <div className="mt-6">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">$45</span>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">/month</span>
          </div>
        </div>
        <div className="px-6 pt-6 pb-8">
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-500" />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Full Access</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-500" />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Unlimited Use</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-500" />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Free Support</span>
            </li>
          </ul>
          <XStack className="mt-8">
            <Button
              backgroundColor={'#5465ff'}
              justifyContent="center"
              textAlign="center"
              className="mt-8 w-full"
              color={'#fff'}
              alignSelf="center"
            >
              Join Now!
            </Button>
          </XStack>
        </div>
      </div>
      <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800">
        <div className="px-6 py-8 md:py-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">User Additional</h3>
          <p className="text-sm text-transparent dark:text-gray-400">
            Perfect for larger businesses or enterprises
          </p>
          <div className="mt-6">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">$2.50</span>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">/user</span>
          </div>
        </div>
        <div className="px-6 pt-6 pb-8">
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-500" />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Full Access</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-500" />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Unlimited Use</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-6 h-6 text-green-500" />
              <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Free Support</span>
            </li>
          </ul>
          <XStack className="mt-8">
            <Button
              backgroundColor={'#5465ff'}
              justifyContent="center"
              textAlign="center"
              className="mt-8 w-full"
              color={'#fff'}
              alignSelf="center"
            >
              Add User Now!
            </Button>
          </XStack>
        </div>
      </div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
