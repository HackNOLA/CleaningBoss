import React, { useState, useRef, useEffect } from 'react'
import { Card, XStack, YStack, Text, Image } from '@my/ui'
import { Location } from '../pages/locations'
import { useSwipeable } from 'react-swipeable'

export const LocationCard = ({ location, onClick }: { location: Location; onClick: any }) => {
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
    return () => {}
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
    <Card onPress={onClick} {...handlers} className="load-hidden" backgroundColor={'white'}>
      <XStack transform={`translateX(-${currentMenuContainerWidth}px)`}>
        <Image
          zIndex={0}
          source={{
            uri: location.photo || 'https://source.unsplash.com/random/?building',
          }}
          width={80}
          height={80}
          borderTopLeftRadius={10}
          borderBottomLeftRadius={10}
          alt="avatar"
        />
        <Card.Header></Card.Header>
        <YStack top={16}>
          <XStack width={250} justifyContent="space-between">
            <Text fontSize={14} fontWeight="bold">
              {`${location.name}`}
            </Text>
            <XStack space="$0" alignItems="center" justifyContent="space-evenly" paddingRight={12}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.75 12.1667C3.11254 10.7215 4.96243 9.83333 7 9.83333C9.03757 9.83333 10.8875 10.7215 12.25 12.1667M9.625 4.875C9.625 6.32475 8.44975 7.5 7 7.5C5.55025 7.5 4.375 6.32475 4.375 4.875C4.375 3.42525 5.55025 2.25 7 2.25C8.44975 2.25 9.625 3.42525 9.625 4.875Z"
                  stroke="#3A4ADF"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Text color={'blue'} fontSize={14}>
                {`${location.staffAmount || 0}`}
              </Text>
            </XStack>

            {/* <Text color={'blue'} fontSize={14}>
        </Text> */}
          </XStack>
          <Text fontSize={14} color={'slategray'} width={250} paddingRight={12} numberOfLines={2}>
            {location.address1}
          </Text>
        </YStack>
        <XStack
          display={menuMode ? 'flex' : 'none'}
          position="absolute"
          right={-50}
          top={0}
          height={80}
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
