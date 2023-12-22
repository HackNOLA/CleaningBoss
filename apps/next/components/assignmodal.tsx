import { useEffect } from 'react'
import { YStack, XStack, Button, Text, Image, View } from '@my/ui'
import { motion, AnimatePresence } from 'framer-motion'

const CleanerAvatar = ({ cleaner }: { cleaner: Cleaner }) => (
  <div className={'cleaner'}>
    <Image
      source={{
        uri: 'https://source.unsplash.com/random',
      }}
      width={44}
      height={44}
      borderRadius={50}
      alt="avatar"
    />
    <Text fontSize={14} color="#363A63">
      {cleaner.name}
    </Text>
  </div>
)

export default function AssignModal({
  onClose,
  onAssign,
  staff,
  showModal = false,
  location,
  selectedDay,
  start_time,
  end_time,
  shift,
  submit,
  selectedCleaners,
  unAssign,
  unassignedStaff,
  jobs,
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedCleaners, unassignedStaff])

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  }

  if (staff && jobs) {
    var filteredAssignedStaff = staff.filter((s) => {
      return jobs.find((j) => j.id_user === s.id)
    })

    var filteredUnassignedStaff = staff.filter((s) => {
      return !jobs.find((j) => j.id_user !== s.id)
    })
  }

  const timeFormat = (time) => {
    // time format: 2021-06-01T09:00:00.000Z
    // return 09:00 AM
    const date = new Date(time)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    const strTime = formattedHours + ':' + formattedMinutes + ' ' + ampm
    return strTime
  }

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
            style={{
              width: '80%',
              maxWidth: '500px',
              height: '60%',
              position: 'fixed',
              top: '20%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              zIndex: 999,
            }}
          >
            <YStack>
              <XStack space="$2" justifyContent="space-between">
                <YStack space="$0">
                  <Text fontSize={20}>{location.name}</Text>
                  <Text fontSize={14} color="#999999">
                    {shift.label}
                    {'/'}
                    {selectedDay}
                  </Text>
                </YStack>
                <YStack space="$0">
                  <Text fontSize={14} color="#999999">
                    {'From: '}
                    {timeFormat(start_time)}
                  </Text>
                  <Text fontSize={14} color="#999999">
                    {'To: '}
                    {timeFormat(end_time)}
                  </Text>
                </YStack>
              </XStack>

              <YStack paddingTop="$2" width="100%">
                <Text fontSize={18} color="#000000">
                  {'Assigned Cleaners'}
                </Text>
                {filteredAssignedStaff && (
                  <XStack space="$4" paddingTop="$4">
                    {filteredAssignedStaff.map((s) => (
                      <YStack justifyContent="center" alignItems="center" key={s.id}>
                        <Button
                          onPress={() => {
                            unAssign(s.id)
                          }}
                          width={100}
                          borderRadius={50}
                          circular={true}
                        >
                          <CleanerAvatar cleaner={s} />
                        </Button>
                        <Text fontSize={14}>
                          {s.first_name} {s.last_name}
                        </Text>
                      </YStack>
                    ))}
                  </XStack>
                )}
                <Text fontSize={18} color="#000000" paddingTop="$8">
                  {'Available Cleaners'}
                </Text>
                {filteredUnassignedStaff && (
                  <XStack space="$4" paddingTop="$4">
                    {filteredUnassignedStaff.map((s) => (
                      <YStack justifyContent="center" alignItems="center" key={s.id}>
                        <Button
                          onPress={() => {
                            onAssign(s.id)
                          }}
                          width={100}
                          borderRadius={50}
                          circular={true}
                        >
                          <CleanerAvatar cleaner={s} />
                        </Button>
                        <Text fontSize={14}>
                          {s.first_name} {s.last_name}
                        </Text>
                      </YStack>
                    ))}
                  </XStack>
                )}
              </YStack>
              <YStack paddingTop={20}>
                <Text fontSize={14} color="#000000">
                  {'Selected Cleaners:'}
                </Text>
                {
                  <>
                    {selectedCleaners && (
                      <XStack space="$2">
                        {selectedCleaners.map((s) =>
                          staff.map(
                            (c) =>
                              c.id === s.id_user && (
                                <YStack justifyContent="center" alignItems="center" key={c.id}>
                                  <Button
                                    onPress={() => {
                                      onAssign(c.id)
                                    }}
                                    width={800}
                                    borderRadius={50}
                                    circular={true}
                                  >
                                    <CleanerAvatar cleaner={c} />
                                  </Button>
                                  <Text fontSize={12}>
                                    {c.first_name} {c.last_name}
                                  </Text>
                                </YStack>
                              )
                          )
                        )}
                      </XStack>
                    )}
                  </>
                }
                {
                  <>
                    {unassignedStaff && (
                      <XStack space="$2">
                        {unassignedStaff.map((s) =>
                          staff.map(
                            (c) =>
                              c.id === s.id_user && (
                                <YStack justifyContent="center" alignItems="center" key={c.id}>
                                  <Button
                                    onPress={() => {
                                      onAssign(c.id)
                                    }}
                                    width={800}
                                    borderRadius={50}
                                    circular={true}
                                  >
                                    <CleanerAvatar cleaner={c} />
                                  </Button>
                                  <Text fontSize={12}>
                                    {c.first_name} {c.last_name}
                                  </Text>
                                </YStack>
                              )
                          )
                        )}
                      </XStack>
                    )}
                  </>
                }
              </YStack>
            </YStack>

            <YStack top={40} space="$2" alignItems="center">
              <XStack space="$4">
                <Button onPress={onClose} borderColor={'#33CC4B'} width={130} borderRadius={50}>
                  <Text fontSize={16}>Cancel</Text>
                </Button>
                <Button onPress={submit} width={130} borderRadius={50} backgroundColor={'#33CC4B'}>
                  <Text color="white" fontSize={16}>
                    Save
                  </Text>
                </Button>
              </XStack>
            </YStack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
