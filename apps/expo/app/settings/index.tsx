import { useAuth } from '@clerk/clerk-react'
import { Button, Toast, XStack, YStack } from '@my/ui'
import { Stack, router } from 'expo-router'
import React from 'react'
import { Alert, View } from 'react-native'

export default function Signout() {
  const { isLoaded, signOut } = useAuth()
  if (!isLoaded) {
    return null
  }

  return (
    <YStack justifyContent="center" alignItems="center">
      <Stack.Screen
        options={{
          title: 'Settings',
          headerLeft: () => (
            <Button
              onPress={() => {
                router.replace('bottomnav')
              }}
            >
              Back
            </Button>
          ),
        }}
      />
      <View style={{ height: 100 }} />
      <XStack>
        <Toast />
        <View style={{ width: 300 }}>
          <Button
            onPress={() => {
              Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Sign Out',
                  onPress: async () => {
                    await signOut()
                    router.replace('index')
                  },
                },
              ])
            }}
          >
            Sign Out
          </Button>
        </View>
      </XStack>
    </YStack>
  )
}
