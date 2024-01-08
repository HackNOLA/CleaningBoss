import './toast.css'
import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import 'raf/polyfill'
import './global.css'

import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import { ClerkProvider } from '@clerk/nextjs'
import UserProvider from 'context/usercontext'
import OrgProvider from 'context/orgcontext'
import { Toaster } from '@/components/ui/toaster'

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css')
}

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <UserProvider>
        <OrgProvider>
          <ClerkProvider
            {...pageProps}
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            <Head>
              <title>Cleaning Boss</title>
              <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider>
              <Component {...pageProps} />
              <Toaster />
            </ThemeProvider>
          </ClerkProvider>
        </OrgProvider>
      </UserProvider>
    </>
  )
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme()

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any)
      }}
    >
      <Provider disableRootThemeClass defaultTheme={theme}>
        {children}
      </Provider>
    </NextThemeProvider>
  )
}

export default MyApp
