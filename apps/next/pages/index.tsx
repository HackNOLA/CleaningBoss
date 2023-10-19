import { HomeScreen } from 'app/features/home/screen'
import Head from 'next/head';
import { SignIn, useAuth } from "@clerk/nextjs";
 

export default function Page() {
  const { signedIn } : any = useAuth();
  return (
    <>
      <Head>
        <title>Cleaning Boss</title>
      </Head>
      {/* { signedIn && <HomeScreen /> }
      { !signedIn && <>
      </> } */}
      <HomeScreen /> 
    </>
  )
}
