import { Feather } from '@expo/vector-icons'
import { createClient } from '@supabase/supabase-js'
import React, { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { YStack, View, Input, Button, XStack, Image, Text } from 'tamagui'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export default function Locations() {
  const { height } = Dimensions.get('window')
  const icon = 'Users'

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
          <Input flex={1} size="$4" placeholder="Search Location" />
          <Button size="$4">Go</Button>
        </XStack>
        <View height={15} />
        <YStack>
          <View
            shadowOffset={{ width: 0, height: 0 }}
            shadowOpacity={0.1}
            shadowRadius={10}
            borderRadius={10}
            width={350}
            height={95}
            backgroundColor="white"
          >
            <YStack space="$2" justifyContent="flex-start" alignItems="flex-start">
              <YStack>
                <Image
                  source={{
                    uri: 'https://placekitten.com/200/300',
                    width: 100,
                    height: 95,
                  }}
                />
                <XStack alignContent='center'>
                <Feather
                  style={{ color: 'blue' }}
                  padding={5}
                  name="user"
                  size={18}
                  color="black"
                />
                </XStack>
              </YStack>
            </YStack>
          </View>
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
