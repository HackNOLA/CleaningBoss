import { useState, useEffect } from 'react'
import { Paragraph, YStack } from 'tamagui'
import { Stack, Link, router } from 'expo-router'
import { Dimensions } from 'react-native'

export default function Dash() {
  const { width, height } = Dimensions.get('window')
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <YStack top={height / 3} padding={40} space="$4" maw={400}>
        <Paragraph>Dashboard</Paragraph>
      </YStack>
    </>
  )
}
