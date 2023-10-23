import { useState, useEffect, useRef } from 'react'
import { Paragraph, YStack, Text } from 'tamagui'
import { Stack, Link, router } from 'expo-router'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, Feather } from '@expo/vector-icons'

const TabArr = [
  { route: 'Home', label: 'Home', icon: 'home', component: Screen },
  { route: 'Calendar', label: 'Calendar', icon: 'calendar-plus-o', component: Screen },
  { route: 'Locations', label: 'Locations', icon: 'building-o', component: Screen },
  { route: 'Users', label: 'Users', icon: 'users', component: Screen },
]

const Tab = createBottomTabNavigator()

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -1 },
  1: { scale: 1.2, translateY: -2 },
}
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
}
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected
  const viewRef = useRef(null)
  const circleRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1)
      circleRef.current.animate(circle1)
      textRef.current.transitionTo({ scale: 1 })
    } else {
      viewRef.current.animate(animate2)
      circleRef.current.animate(circle2)
      textRef.current.transitionTo({ scale: 0 })
    }
  }, [focused])

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          {item.icon !== 'users' ? (
            <FontAwesome size={22} name={item.icon} color={focused ? 'black' : 'black'} />
          ) : (
            <Feather size={22} name={item.icon} color={focused ? 'black' : 'black'} />
          )}
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

function Screen() {
  const { width, height } = Dimensions.get('window')
  return (
    <>
      <YStack
        top={height / 3}
        padding={40}
        space="$4"
        maw={400}
        justifyContent="center"
        alignItems="center"
      >
        <Paragraph>Screen</Paragraph>
      </YStack>
    </>
  )
}

export default function Dash() {
  const { width, height } = Dimensions.get('window')
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#555FD0',
          },
          headerLeft: () => (
            <>
              <Text color={'white'}>Logo</Text>
            </>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="settings" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          )
        })}
      </Tab.Navigator>
      <View style={{ backgroundColor: 'white', height: 5 }} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 110,
    position: 'absolute',
    borderRadius: 16,
    width: '100%',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
  },
})
