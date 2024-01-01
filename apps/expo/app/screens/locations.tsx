import { createClient } from '@supabase/supabase-js'
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { YStack } from 'tamagui'
import supabase from 'context/supabasecontext'

export default function Locations() {
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
      <YStack paddingBottom={800} justifyContent="center" alignItems="center">
        <MapView style={styles.map} />
      </YStack>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '500%',
  },
})
