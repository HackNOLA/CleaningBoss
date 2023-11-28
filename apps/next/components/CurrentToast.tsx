import { YStack, Toast, useToastState } from '@my/ui'
import React from 'react'
import { Dimensions } from 'react-native'

export const CurrentToast = () => {
  const currentToast = useToastState()

  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      shadowColor={'black'}
      shadowOpacity={0.5}
      shadowRadius={5}
      shadowOffset={{ width: 0, height: 0 }}
      y={70}
      height={80}
      opacity={1}
      scale={1}
      viewportName={currentToast.viewportName}
      width={Dimensions.get('window').width}
      borderRadius={0}
      backgroundColor={currentToast.backgroundColor}
    ></Toast>
  )
}
