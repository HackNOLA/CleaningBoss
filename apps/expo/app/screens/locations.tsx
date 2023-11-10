import { createClient } from '@supabase/supabase-js'
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { YStack, View, Input, Button, XStack } from 'tamagui'

import Card from './components/card'

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

    fetchCities()
  }, [])

  return (
    <View>
      <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={70}>
        <MapView style={styles.map} />
        <View height={15} />
        <XStack alignItems="center" space="$10">
          <Input flex={1} size="$4" placeholder="Search" />
          <Button size="$4">Go</Button>
        </XStack>
        <View height={15} />

        {/* <View position="absolute" top={100} justifyContent="center" alignItems="center" /> */}
        <YStack space="$4">
          <Card title="Staffed" icon="users" info="224 of 338 hours scheduled" />
          <Card title="Completed" icon="check-circle" info="4 out of 6 jobs completed" />
          <Card title="Hours" icon="clock" info="224h worked out of 338h scheduled" />
        </YStack>
      </YStack>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 280,
  },
})
