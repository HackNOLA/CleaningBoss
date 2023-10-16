import {
    Button,
    Paragraph,
    useToastController,
    YStack,
    Input, 
  } from '@my/ui'
  import React, { useState } from 'react'
  import { useLink } from 'solito/link'
import { Stack, Link } from 'expo-router'
import { Dimensions } from 'react-native'

export default function Screen() {
    const { width, height } = Dimensions.get('window');

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false
        }}
      />
       <YStack top={height / 2} padding={40} space="$4" maw={400}>
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <Button
        backgroundColor={"#86C562"} 
          shadowColor={"black"}
          shadowOpacity={0.5}
          shadowRadius={5}
          shadowOffset={{ width: 0, height: 0 }}
          onPress={() => {
            console.log('pressed')
          }}
          borderColor={"black"}
        >Sign Up</Button>
        <YStack alignItems='center' space="$4" maw={600}>
        <Paragraph>Already have an account? <Link  href="/">Sign in</Link></Paragraph>
        </YStack>
      </YStack>

    </>
  )
}
