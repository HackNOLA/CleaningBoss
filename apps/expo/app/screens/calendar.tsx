import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { YStack } from 'tamagui'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export default function CalendarScreen() {
  const [selected, setSelected] = useState('')
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
      <YStack padding={40} justifyContent="center" alignItems="center">
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString)
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'orange' },
          }}
        />
      </YStack>
    </>
  )
}
