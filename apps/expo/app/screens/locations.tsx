import { useEffect } from 'react'
import { Paragraph, YStack } from 'tamagui'
import { Dimensions } from 'react-native'
import { createClient } from '@supabase/supabase-js'
import React from 'react'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export default function Locations() {
    const { height } = Dimensions.get('window')
  
    useEffect(() => {
      const fetchCities = async () => {
        const { data } = await supabase
          .from('users')
          .select('id')
          .eq('email', 'akin@operationspark.org')
        console.log(data)
      }
      // check to see if user's org exist
      // if not, create org
      // if so,
      // check to see if user's role is admin
  
      fetchCities()
    }, [])
  
    return (
      <>
        <YStack
          top={height / 3}
          padding={40}
          space="$4"
          justifyContent="center"
          alignItems="center"
        >
          <Paragraph>Locations</Paragraph>
        </YStack>
      </>
    )
  }