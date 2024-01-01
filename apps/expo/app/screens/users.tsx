import { createClient } from '@supabase/supabase-js'
import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import { Paragraph, YStack } from 'tamagui'
import supabase from 'context/supabasecontext'

export default function Users() {
  const { height } = Dimensions.get('window')

  useEffect(() => {
    const fetchCities = async () => {
      const { data } = await supabase
        .from('users')
        .select('id')
        .eq('email', 'akin@operationspark.org')
    }
    // check to see if user's org exist
    // if not, create org
    // if so,
    // check to see if user's role is admin

    fetchCities()
  }, [])

  return (
    <>
      <YStack top={height / 3} padding={40} space="$4" justifyContent="center" alignItems="center">
        <Paragraph>Users</Paragraph>
      </YStack>
    </>
  )
}
