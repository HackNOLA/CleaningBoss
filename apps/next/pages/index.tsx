/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9ImftiM2VaH
 */
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Input, Button, YStack, XStack, H1, Text } from '@my/ui'
import Pricing from 'components/pricing'
import { motion, AnimatePresence } from 'framer-motion'
import supabase from 'context/supabasecontext'
import { useToast } from '@/components/ui/use-toast'

const NavItem = ({ children, delay }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay }}
    >
      {children}
    </motion.li>
  )
}

export default function Component() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data: existing, error: existing_error } = await supabase
      .from('waitlist')
      .select('*')
      .eq('email', email)

    if (!existing?.length) {
      console.log(existing_error)
    } else {
      toast({
        title: "You're already on the waitlist!",
        description: "We'll let you know when we're ready to launch.",
      })
      return
    }

    const { data: new_waitlister, error: new_waitlister_error } = await supabase
      .from('waitlist')
      .insert({ email })
      .select()
    if (new_waitlister_error) {
      console.log(new_waitlister_error)
    } else {
      toast({
        title: 'Thanks for joining the waitlist!',
        description: "We'll let you know when we're ready to launch.",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-500  to-[#83e289af] ">
      <header className="top-0 w-full bg-blue-500 dark:bg-gray-800 z-10 border-b-1 border-slate-500 p-4 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link className="text-2xl font-bold text-gray-100 dark:text-gray-100" href="#">
            {/* Cleaning Boss */}
          </Link>
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M2 4.5A1.5 1.5 0 013.5 3h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 012 4.5zm0 5A1.5 1.5 0 013.5 8h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 012 9.5zm1.5 5a1.5 1.5 0 000 3h13a1.5 1.5 0 000-3h-13z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            {open && (
              <AnimatePresence>
                <div className="absolute top-20 left-0 w-full bg-transparent dark:bg-gray-800">
                  <nav className="flex flex-col px-4 py-2 space-y-4">
                    <NavItem delay={0.2}>
                      <Link
                        className="text-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 text-xl"
                        href="#features"
                      >
                        Features
                      </Link>
                    </NavItem>
                    <NavItem delay={0.4}>
                      <Link
                        className="text-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 text-xl"
                        href="#pricing"
                      >
                        Pricing
                      </Link>
                    </NavItem>
                    {/* <NavItem delay={0.6}>
                      <Link
                        className="text-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 text-xl"
                        href="/signin"
                      >
                        Login
                      </Link>
                    </NavItem> */}
                  </nav>
                </div>
              </AnimatePresence>
            )}
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
            {/* <Link
              className="text-gray-100 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              href="/signin"
            >
              Login
            </Link> */}
          </nav>
        </div>
      </header>
      <main className="mt-16">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <YStack justifyContent="center" alignItems="center">
              <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[600px_1fr]">
                <Image
                  className="w-80 lg:w-2/3"
                  alt="Hero"
                  height={200}
                  src={'/landing_splash.png'}
                  width="550"
                  style={{ zIndex: 0 }}
                />
                <div className="flex flex-col justify-center space-y-4">
                  <YStack className="space-y-2" alignItems="center" justifyContent="center">
                    <XStack className="space-x-2">
                      <Text
                        // letterSpacing={10}
                        className="text-xl text-gray-100 font-bold tracking-tighter sm:text-xl xl:text-3xl/none"
                      >
                        CLEANING BOSS
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button onPress={handleSubmit} backgroundColor={'#788aff'} color={'white'}>
                        Subscribe
                      </Button>
                    </YStack>
                  </div>
                </div>
              </div>
              <div id="features" className="flex flex-col gap-6 pt-24">
                <div className="flex gap-4">
                  <div className="flex flex-col justify-center w-1/2">
                    <Text
                      paddingBottom={12}
                      color={'black'}
                      className="text-md font-bold lg:text-5xl"
                    >
                      Improve Your Operations
                    </Text>
                    <Text className="text-[#000] dark:text-gray-400 lg:text-3xl">
                      Unleash your inner boss with Cleaning Boss; a transformative tool crafted
                      exclusively for cleaning business owners. Welcome to the future of managing
                      your cleaning business.
                    </Text>
                  </div>
                  <img
                    alt="Feature 1"
                    className="rounded-lg object-cover w-1/2"
                    height="300"
                    src="/side.png"
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'contain',
                    }}
                    width="500"
                  />
                </div>
                <div className="flex gap-4">
                  <img
                    alt="Feature 2"
                    className="rounded-lg object-cover w-1/2"
                    height="300"
                    src="/tilt.png"
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'contain',
                    }}
                    width="500"
                  />
                  <div className="flex flex-col justify-center w-1/2">
                    <Text
                      paddingBottom={12}
                      color={'black'}
                      className="text-md font-bold lg:text-5xl"
                    >
                      GPS Timekeeping & Employee Scheduling at Anytime, Anywhere!
                    </Text>
                    <p className="text-[#000] dark:text-gray-400">
                      GPS Timekeeping & Employee Scheduling at Anytime, Anywhere! Step into the 21st
                      century. Forget paperwork; manage your work schedules, and monitor your
                      employees’ in real-time, right as it happens.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col justify-center w-1/2">
                    <Text
                      paddingBottom={12}
                      color={'black'}
                      className="text-md font-bold lg:text-5xl"
                    >
                      Smart Cleaning Checklists for Effective Task Management
                    </Text>
                    <p className="text-[#000] dark:text-gray-400">
                      Ditch the traditional checklist for a smart, interactive one that makes
                      tracking tasks a breeze. Cleaning has never been made so simple.
                    </p>
                  </div>
                  <img
                    alt="Feature 3"
                    className="rounded-lg object-cover w-1/2"
                    height="300"
                    src="/front.png"
                    style={{
                      aspectRatio: '400/300',
                      objectFit: 'contain',
                    }}
                    width="500"
                  />
                </div>
              </div>
              <Pricing />
            </YStack>
          </div>
        </section>
      </main>
    </div>
  )
}
