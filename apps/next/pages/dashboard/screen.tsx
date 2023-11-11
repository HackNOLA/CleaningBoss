'use client'

import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { YStack, View, XStack } from '@my/ui'
import Card from 'components/card'
import SegmentedControl from 'components/segmentedcontrol'
import Map from 'components/map'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export default function Dashboard() {
  const segments = ['Yesterday', 'Today', 'Tomorrow', 'Custom'] // Define your segments

  const [selectedSegment, setSelectedSegment] = useState(0)

  const handleSegmentChange = (index) => {
    setSelectedSegment(index)
  }

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
      <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}>
        <View height={80} />
        <View justifyContent="center" alignItems="center">
          <Map />
        </View>
        <View height={15} />
        <SegmentedControl segments={segments} onChange={handleSegmentChange} />
        <View height={15} />
        <YStack space="$4">
          <XStack space="$4">
            <Card title="Staffed" icon="users" info="224 of 338 hours scheduled" />
            <Card title="Completed" icon="check-circle" info="4 out of 6 jobs completed" />
          </XStack>
          <XStack space="$4">
            <Card title="Hours" icon="clock" info="224h worked out of 338h scheduled" />
            <Card title="Cleaners" icon="user" info="8/10 Cleaners were active" />
          </XStack>
        </YStack>
      </YStack>
    </View>
  )
}