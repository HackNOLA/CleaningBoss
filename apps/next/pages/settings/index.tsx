import React, { useState, useEffect } from 'react'
import { useSignIn, useAuth } from '@clerk/clerk-react'

import { Input, Button, Toast, H3, XStack, useToastState, YStack } from '@my/ui'

import { useRouter } from 'next/router'

import { Alert, Dimensions, View } from 'react-native'

export default function Signout() {
  const router = useRouter()
  const { isLoaded, signOut } = useAuth()
  if (!isLoaded) {
    return null
  }

  return (
    <YStack justifyContent="center" alignItems="center">
      <View style={{ height: 100 }} />
      <XStack>
        <Toast />
        <View style={{ width: 300 }}>
          <Button
            onPress={async () => {
              await signOut()
              router.replace('/')
            }}
          >
            Sign Out
          </Button>
        </View>
      </XStack>
    </YStack>
  )
}
