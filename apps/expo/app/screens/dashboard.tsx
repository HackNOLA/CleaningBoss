import { createClient } from '@supabase/supabase-js'
import { UserCheck, CheckCircle2, Clock4, User } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { Paragraph, YStack, Text, Button, View, XStack } from 'tamagui'
import SegmentedControl from './components/segementedcontrol' // Make sure the path is correct
import { Feather } from '@expo/vector-icons'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

const cardArr = [
  { header: 'Staffed', icon: UserCheck, text: '80% of jobs are currently completed' },
  { header: 'Completed', icon: CheckCircle2, text: '4 out 6 jobs are completed' },
  { header: 'Hours', icon: Clock4, text: '224h worked out of 338h scheduled' },
  { header: 'Cleaners', icon: User, text: '8/10 were active' },
]

export default function Dashboard() {
  const { height } = Dimensions.get('window')
  const segments = ['Yesterday', 'Today', 'Tomorrow', 'Custom'] // Define your segments

  const [selectedSegment, setSelectedSegment] = useState(0)

  const handleSegmentChange = (index) => {
    setSelectedSegment(index)
    // Perform actions based on the selected index if needed
  }

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
    <View>
      <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={70}>
        <MapView style={styles.map} />
        <View height={15} />
        <SegmentedControl segments={segments} onChange={handleSegmentChange} />
        <View height={15} />

        {/* <View position="absolute" top={100} /> */}
        <YStack space="$4">
          <XStack space="$4">
            <View
              shadowOffset={{ width: 0, height: 0 }}
              shadowOpacity={0.1}
              shadowRadius={10}
              borderRadius={10}
              width={160}
              height={140}
              backgroundColor={'white'}
            >
              <YStack space="$2" justifyContent="flex-start" alignItems="flex-start">
                <YStack padding={5} paddingTop={30}>
                  <Text fontWeight={'bold'} padding={5}>
                    Staffed
                  </Text>
                  <Feather
                    style={{ color: 'blue' }}
                    padding={5}
                    name="users"
                    size={18}
                    color="black"
                  />
                  <Text padding={5}>224h worked out of 338h scheduled</Text>
                </YStack>
              </YStack>
            </View>
            <View
              shadowOffset={{ width: 0, height: 0 }}
              shadowOpacity={0.1}
              shadowRadius={10}
              borderRadius={10}
              width={160}
              height={140}
              backgroundColor={'white'}
            >
              <YStack space="$2" justifyContent="flex-start" alignItems="flex-start">
                <YStack padding={5} paddingTop={30}>
                  <Text fontWeight={'bold'} padding={5}>
                    Completed
                  </Text>
                  <Feather
                    style={{ color: 'blue' }}
                    padding={5}
                    name="check-circle"
                    size={18}
                    color="black"
                  />
                  <Text padding={5}>4 of out 6 jobs completed</Text>
                </YStack>
              </YStack>
            </View>
          </XStack>
          <XStack space="$4">
            <View
              shadowOffset={{ width: 0, height: 0 }}
              shadowOpacity={0.1}
              shadowRadius={10}
              borderRadius={10}
              width={160}
              height={140}
              backgroundColor={'white'}
            >
              <YStack space="$2" justifyContent="flex-start" alignItems="flex-start">
                <YStack padding={5} paddingTop={30}>
                  <Text fontWeight={'bold'} padding={5}>
                    Hours
                  </Text>
                  <Feather
                    style={{ color: 'blue' }}
                    padding={5}
                    name="clock"
                    size={18}
                    color="black"
                  />
                  <Text padding={5}>224h worked out of 338h scheduled</Text>
                </YStack>
              </YStack>
            </View>
            <View
              shadowOffset={{ width: 0, height: 0 }}
              shadowOpacity={0.1}
              shadowRadius={10}
              borderRadius={10}
              width={160}
              height={140}
              backgroundColor={'white'}
            >
              <YStack space="$2" justifyContent="flex-start" alignItems="flex-start">
                <YStack padding={5} paddingTop={30}>
                  <Text fontWeight={'bold'} padding={5}>
                    Cleaners
                  </Text>
                  <Feather
                    style={{ color: 'blue' }}
                    padding={5}
                    name="user"
                    size={18}
                    color="black"
                  />
                  <Text padding={5}>{'8/10 Cleaners were active'}</Text>
                </YStack>
              </YStack>
            </View>
          </XStack>
          <XStack></XStack>
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
