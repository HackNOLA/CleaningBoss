import {
    Anchor,
    Button,
    Paragraph,
    Sheet,
    useToastController,
    YStack,
    Input, 
  } from '@my/ui'
  import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
  import React, { useState } from 'react'
  import { useLink } from 'solito/link'
  
  export function Signup() {
    const linkProps = useLink({
      href: '/user/nate',
    })
  
    return (
      <YStack f={1} jc="center" ai="center" p="$4" space>
        <YStack space="$4" maw={600}>
          <Input  placeholder="Username" />
          <Input placeholder="Password" />
          <Button
            onPress={() => {
              console.log('pressed')
            }}
            borderColor={"black"}
          >Sign up</Button>
          <Paragraph>Already have an account? <Anchor href="/">Sign in</Anchor></Paragraph>
        </YStack>
      </YStack>
    )
  }
  
  function SheetDemo() {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState(0)
    const toast = useToastController()
  
    return (
      <>
        <Button
          size="$6"
          icon={open ? ChevronDown : ChevronUp}
          circular
          onPress={() => setOpen((x) => !x)}
        />
        <Sheet
          modal
          animation="lazy"
          open={open}
          onOpenChange={setOpen}
          snapPoints={[80]}
          position={position}
          onPositionChange={setPosition}
          dismissOnSnapToBottom
        >
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
          <Sheet.Frame ai="center" jc="center">
            <Sheet.Handle />
            <Button
              size="$6"
              circular
              icon={ChevronDown}
              onPress={() => {
                setOpen(false)
                toast.show('Sheet closed!', {
                  message: 'Just showing how toast works...',
                })
              }}
            />
          </Sheet.Frame>
        </Sheet>
      </>
    )
  }
  