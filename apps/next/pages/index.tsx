/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9ImftiM2VaH
 */
import Link from 'next/link'
import Image from 'next/image'
import { Input, Button, YStack, XStack, H1, Text } from '@my/ui'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-500 to-cyan-500 to-[#83e289af] ">
      <header className="fixed top-0 w-full bg-transparent dark:bg-gray-800 z-10 border-b-1 border-slate-500 mt-8">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link className="text-2xl font-bold text-gray-100 dark:text-gray-100" href="#">
            Cleaning Boss
          </Link>
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M2 4.5A1.5 1.5 0 013.5 3h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 012 4.5zm0 5A1.5 1.5 0 013.5 8h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 012 9.5zm1.5 5a1.5 1.5 0 000 3h13a1.5 1.5 0 000-3h-13z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link
              className="text-gray-100 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="text-gray-100 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              href="#pricing"
            >
              Pricing
            </Link>
          </nav>
        </div>
      </header>
      <main className="mt-16">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <YStack justifyContent="center" alignItems="center">
              <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[600px_1fr]">
                <Image
                  className="w-80 lg:w-full"
                  alt="Hero"
                  height={200}
                  src="/landing_splash.png"
                  width="550"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <YStack className="space-y-2" alignItems="center" justifyContent="center">
                    <XStack className="space-x-2">
                      <Text
                        letterSpacing={20}
                        className="text-xl text-gray-100 font-bold tracking-tighter sm:text-xl xl:text-3xl/none"
                      >
                        CLEANING
                      </Text>
                      <Text
                        letterSpacing={10}
                        className="text-xl text-gray-100 font-bold tracking-tighter sm:text-xl xl:text-3xl/none"
                      >
                        BOSS
                      </Text>
                    </XStack>
                    <Text className="text-xl text-gray-100 font-100 tracking-tighter sm:text-xl xl:text-3xl/none">
                      CLEANING BUSINESS SOFTWARE
                    </Text>
                    <Text className="text-xl text-gray-100 font-100 tracking-tighter sm:text-xl xl:text-3xl/none">
                      FOR OPERATIONAL EXCELLENCE
                    </Text>
                  </YStack>
                  <div className="w-full max-w-sm space-y-4 pt-8">
                    <Text fontWeight={'bold'} fontSize={30} color={'white'}>
                      Join the Waitlist
                    </Text>
                    <YStack className="w-full lg:w-2/3" display="flex" space="$2">
                      <Input
                        borderColor={'transparent'}
                        // className="max-w-lg flex-1"
                        width={'100%'}
                        placeholder="name@email.com"
                        type="email"
                      />
                      <Button backgroundColor={'#788aff'} color={'white'}>
                        Subscribe
                      </Button>
                    </YStack>
                  </div>
                </div>
              </div>
            </YStack>
          </div>
        </section>
      </main>
    </div>
  )
}
