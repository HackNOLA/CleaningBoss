import React, { useEffect, useState, useRef } from 'react'
import { Card, XStack, YStack, Text, Image } from '@my/ui'
import { User } from '../pages/staff'
import { useSwipeable } from 'react-swipeable'

export const UserCard = ({ user, onClick }: { user: User; onClick: any }) => {
  const [inSwiping, setInSwiping] = useState(false)
  const [currentMenuContainerWidth, setCurrentMenuContainerWidth] = useState(0) // 当前偏移量
  const [maxMenuContainerWidth, setMaxMenuContainerWidth] = useState(100) // 最大的偏移量
  const [menuRealWidth, setMenuRealWidth] = useState(50) // 最终展示的大小
  const [menuMode, setMenuMode] = useState(false) // 是否已经展开了删除按钮
  const menuTextRef = useRef()
  const menuRef = useRef()
  const dialogRef = useRef()
  const hideMenu = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCurrentMenuContainerWidth(0)
        setTimeout(() => {
          setMenuMode(false)
        }, 100)
      })
    })
  }
  useEffect(() => {
    console.log('useEffect')
    const fn = (e) => {
      // 除了菜单按钮之外的点击都要右滑
      if (e.target === menuRef.current || e.target === menuTextRef.current) {
        return
      }
      menuMode && hideMenu()
      // 浏览器
      document.removeEventListener('mousedown', fn)
      document.removeEventListener('touchstart', fn)
    }
    if (menuMode) {
      document.addEventListener('mousedown', fn)
      document.addEventListener('touchstart', fn)
    }
    return () => {
      console.log('hhhhh')
    }
  }, [menuMode])
  const handlers = useSwipeable({
    // onSwipedLeft: () => console.log("hhh"),
    // onSwipedRight: () => console.log("huhuhu"),
    onSwiping: ({ initial, dir, deltaX }) => {
      // setInSwiping(true);
      // 通知父容器容器
      const delta = -deltaX
      if (menuMode && dir === 'Right') {
        hideMenu()
      } else if (!menuMode && delta > 0) {
        const finalWidth = Math.min(Math.max(0, delta), maxMenuContainerWidth)
        // const finalWidth = Math.min(delta, menuRealWidth);
        // console.log("finalWidth", Math.max(0, delta));
        setCurrentMenuContainerWidth(finalWidth)
      }
      setInSwiping(true)
    },
    onSwiped: ({ initial, dir, deltaX }) => {
      // 当前移动的距离
      if (currentMenuContainerWidth >= menuRealWidth) {
        setCurrentMenuContainerWidth(menuRealWidth)
        setMenuMode(true)
      } else {
        hideMenu()
      }
      setInSwiping(false)
    },
    preventDefaultTouchmoveEvent: inSwiping,
    trackMouse: true,
  })
  const openDialog = () => {
    // dialogRef.current && dialogRef.current.openDialog();
  }
  const closeDialog = () => {
    // dialogRef.current && dialogRef.current.closeDialog();
  }

  return (
    <Card
      onPress={onClick}
      {...handlers}
      className="load-hidden"
      backgroundColor={'white'}
      width={350}
      height={86}
    >
      <XStack transform={`translateX(-${currentMenuContainerWidth}px)`}>
        <Card.Header>
          <Image
            zIndex={0}
            source={{
              uri: user.profile_pic || 'https://source.unsplash.com/random',
            }}
            width={50}
            height={50}
            borderRadius={40}
            alt="avatar"
            opacity={menuMode ? '0' : '1'}
          />
        </Card.Header>
        <YStack
          top={16}
          transform={`translateX(${-currentMenuContainerWidth + (menuMode ? 30 : 0)}px)`}
        >
          <XStack width={250} justifyContent="space-between">
            <Text fontSize={14} fontWeight="bold">
              {`${user.first_name} ${user.last_name}`}
            </Text>

            <Text display={menuMode ? 'none' : 'block'} color={'blue'} fontSize={14}>
              {user.role}
            </Text>
          </XStack>
          <Text>{user.email}</Text>
          <Text>{user.phone}</Text>
        </YStack>
        <XStack
          display={menuMode ? 'flex' : 'none'}
          position="absolute"
          right={-50}
          top={0}
          height={86}
          width={maxMenuContainerWidth}
          backgroundColor={'red'}
          justifyContent="center"
          alignItems="center"
          borderTopRightRadius={10}
          borderBottomRightRadius={10}
        >
          <Text
            ref={menuTextRef}
            onPress={openDialog}
            color={'white'}
            fontSize={14}
            fontWeight="bold"
            width={maxMenuContainerWidth}
            textAlign="center"
          >
            Delete
          </Text>
        </XStack>
      </XStack>
    </Card>
  )
}
