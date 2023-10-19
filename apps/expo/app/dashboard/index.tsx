import { useState, useEffect } from 'react'
import { Paragraph } from 'tamagui'
import { Stack, Link, router } from 'expo-router'

export default function Dash() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Paragraph>Dashboard</Paragraph>
    </>
  )
}
