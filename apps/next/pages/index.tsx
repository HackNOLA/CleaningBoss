import { HomeScreen } from 'app/features/home/screen'
import Head from 'next/head'
import { SignIn, useAuth } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  const { signedIn }: any = useAuth()
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
        <HomeScreen />
      </div>
    </>
  )
}
