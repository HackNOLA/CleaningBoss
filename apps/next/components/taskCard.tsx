import React, { useEffect, useState, useRef, use } from 'react'
import { Card, XStack, YStack, Text } from '@my/ui'
import supabase from 'context/supabasecontext'
import { useSwipeable } from 'react-swipeable'

export const rightarrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="#23e342"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export const svgviewerOutput = (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 16V12M12 8H12.01M2 8.52274V15.4773C2 15.7218 2 15.8441 2.02763 15.9592C2.05213 16.0613 2.09253 16.1588 2.14736 16.2483C2.2092 16.3492 2.29568 16.4357 2.46863 16.6086L7.39137 21.5314C7.56432 21.7043 7.6508 21.7908 7.75172 21.8526C7.84119 21.9075 7.93873 21.9479 8.04077 21.9724C8.15586 22 8.27815 22 8.52274 22H15.4773C15.7218 22 15.8441 22 15.9592 21.9724C16.0613 21.9479 16.1588 21.9075 16.2483 21.8526C16.3492 21.7908 16.4357 21.7043 16.6086 21.5314L21.5314 16.6086C21.7043 16.4357 21.7908 16.3492 21.8526 16.2483C21.9075 16.1588 21.9479 16.0613 21.9724 15.9592C22 15.8441 22 15.7218 22 15.4773V8.52274C22 8.27815 22 8.15586 21.9724 8.04077C21.9479 7.93873 21.9075 7.84119 21.8526 7.75172C21.7908 7.6508 21.7043 7.56432 21.5314 7.39137L16.6086 2.46863C16.4357 2.29568 16.3492 2.2092 16.2483 2.14736C16.1588 2.09253 16.0613 2.05213 15.9592 2.02763C15.8441 2 15.7218 2 15.4773 2H8.52274C8.27815 2 8.15586 2 8.04077 2.02763C7.93873 2.05213 7.84119 2.09253 7.75172 2.14736C7.6508 2.2092 7.56432 2.29568 7.39137 2.46863L2.46863 7.39137C2.29568 7.56432 2.2092 7.6508 2.14736 7.75172C2.09253 7.84119 2.05213 7.93873 2.02763 8.04077C2 8.15586 2 8.27815 2 8.52274Z"
      stroke="#DF893A"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

export interface Task {
  id: number
  time: string
  location: string
  day: string
  activeCleaners: number
  totalCleaners: number
}

export const TaskCard = ({ task, onPress = () => {} }: { task: Task }) => {
  const [cleanerAmount, setCleanerAmount] = useState(0)
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
    const fetchCleanerAmount = async () => {
      const { data, error } = await supabase.from('jobs').select('id').eq('id_shift', task.id)
      if (error) {
        console.log(error)
      } else {
        setCleanerAmount(data.length)
      }
    }
    fetchCleanerAmount()
  })

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
    <Card
      {...handlers}
      onPress={onPress}
      width={350}
      className="load-hidden"
      backgroundColor={'white'}
    >
      <XStack transform={`translateX(-${currentMenuContainerWidth}px)`}>
        <YStack
          borderTopLeftRadius={10}
          borderBottomLeftRadius={10}
          backgroundColor={'blue'}
          width={10}
          height={120}
        ></YStack>
        <Card.Header></Card.Header>
        <YStack top={16} transform={`translateX(${currentMenuContainerWidth}px)`}>
          <XStack width={250} justifyContent="space-between" alignItems="center">
            <YStack width={200}>
              <Text fontSize={16} fontWeight="600" color="#111860" lineHeight="1.92">
                {`${task.location_name}`}
              </Text>

              <Text
                fontSize={16}
                fontWeight="400"
                width={250}
                paddingRight={12}
                numberOfLines={2}
                color="#363A63"
                line-height="19.2"
              >
                {task.label}
              </Text>
            </YStack>
            <YStack
              space="$0"
              alignItems="center"
              paddingRight={10}
              display={menuMode ? 'none' : 'block'}
            >
              <YStack>
                <Text
                  fontSize={14}
                  color={'slategray'}
                  // color="#3A4ADF"
                  lineHeight="1.68"
                  fontWeight="400"
                >
                  From:{' '}
                  {new Date('20' + task.check_in_time.substring(2)).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </YStack>
              <YStack>
                <Text
                  fontSize={14}
                  color={'slategray'}
                  // color="#3A4ADF"
                  lineHeight="1.68"
                  fontWeight="400"
                >
                  To:{' '}
                  {new Date('20' + task.check_out_time.substring(2)).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </YStack>
            </YStack>
          </XStack>
          <XStack width={290} justifyContent="space-between" paddingTop={10} alignItems="center">
            <Text
              fontSize={14}
              fontWeight="400"
              width={271}
              color="#111860"
              lineHeight="1.92"
              display="flex"
              gap={10}
              alignItems="center"
            >
              {svgviewerOutput} There is {task.cleaner_amount - cleanerAmount} unstaffed day
            </Text>

            <YStack>{rightarrow}</YStack>
          </XStack>
        </YStack>
        <XStack
          display={menuMode ? 'flex' : 'none'}
          position="absolute"
          right={-50}
          top={0}
          height={120}
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
