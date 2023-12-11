import { HomeScreen } from 'app/features/home/screen'
import Head from 'next/head'
import { SignIn, useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import { OrgContext } from 'context/orgcontext'
import { UserContext } from 'context/usercontext'
import { useContext } from 'react'

export default function Page() {
  const { signedIn }: any = useAuth()
  const { setEmail, setActiveUser } = useContext(UserContext)

  return (
    <>
      <Head>
        <title>Cleaning Boss</title>
      </Head>
      {/* { signedIn && <HomeScreen /> }
      { !signedIn && <>
      </> } */}
      <div className="min-h-screen">
        <Image src={'/auth_splash.png'} width={600} height={200} />
        <HomeScreen setEmail={setEmail} setActiveUser={setActiveUser} />
      </div>
    </>
  )
}
