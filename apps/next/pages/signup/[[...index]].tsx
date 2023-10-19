import { Signup } from 'app/features/auth/signup'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Signup />
    </>
  )
}
