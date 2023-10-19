import { SignIn } from '@clerk/nextjs'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <style>{`
          .cl-internal-phfxlr { 
            font-family: sans-serif;
          }
        `}</style>
      </Head>
      <div className="w-full h-full justify-center grid-cols-2 grid-rows-1">
        <section className=''>
          <section className="text-gray-600 body-font">
             <SignIn />
          </section>
        </section>
      </div>
    </>
  )
}
