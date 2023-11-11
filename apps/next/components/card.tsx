import React from 'react'
import { YStack, Text, View } from 'tamagui'

const Card = (props) => {
  return (
    <View
      shadowOffset={{ width: 0, height: 0 }}
      shadowOpacity={0.1}
      shadowRadius={10}
      borderRadius={10}
      width={160}
      height={140}
      backgroundColor="white"
    >
      <YStack space="$2" justifyContent="flex-start" alignItems="flex-start">
        <YStack padding={5}>
          <Text fontWeight="bold" padding={5}>
            {props.title}
          </Text>
          {/* <Feather style={{ color: 'blue' }} padding={5} name={props.icon} size={18} color="black" /> */}
          <Text position="absolute" fontSize={12} padding={5} paddingTop={30}>
            {' '}
            {props.info}{' '}
          </Text>
        </YStack>
      </YStack>
    </View>
  )
}

export default Card
