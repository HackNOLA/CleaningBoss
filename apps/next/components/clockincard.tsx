import React, { useState, useEffect } from 'react'
import { Modal, TextField } from '@mui/material'
import { Button, Text, YStack, XStack } from '@my/ui'
import { createClient } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import supabase from 'context/supabasecontext'

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

const ClockInCard = ({ job, open, setOpen, viewOnly = false }) => {
  const [clockInTime, setClockInTime] = useState('')
  const [clockOutTime, setClockOutTime] = useState('')

  useEffect(() => {
    if (!job) return
    if (!job.clock_in_time) return
    setClockInTime(job.clock_in_time)
    if (!job.clock_out_time) return
    setClockOutTime(job.clock_out_time)
  }, [job])

  const handleClockIn = async () => {
    const currentTime = new Date().toLocaleTimeString()
    // setClockInTime(currentTime)
    try {
      job.clock_in_time = currentTime
      const { data, error } = await supabase.from('jobs').update(job).eq('id', job.id)
    } catch (error) {
      console.log(error)
      return
    }
    handleClose()
  }

  const handleClockOut = async () => {
    const currentTime = new Date().toLocaleTimeString()
    // setClockOutTime(currentTime)
    try {
      job.clock_out_time = currentTime
      job.completed = true
      const { data, error } = await supabase.from('jobs').update(job).eq('id', job.id)
    } catch (error) {
      console.log(error)
      return
    }
    handleClose()
  }

  const handleClose = () => {
    setOpen(!open)
    setClockInTime('')
    setClockOutTime('')
  }

  return (
    <>
      <AnimatePresence>
        {open && (
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
            <YStack paddingTop={100}>
              <Text>Clock In/Out</Text>
              <XStack paddingTop={20}>
                <TextField label="Clock In Time" value={clockInTime} disabled fullWidth />
                <TextField label="Clock Out Time" value={clockOutTime} disabled fullWidth />
              </XStack>
              <YStack space="$4" paddingTop={20} justifyContent="center" alignItems="center">
                <XStack space="$4">
                  <Button color={'white'} backgroundColor={'#EB4A3C'} onPress={handleClose}>
                    Close
                  </Button>
                  {!job.clock_in_time && !viewOnly && (
                    <Button color={'white'} backgroundColor={'#33CC4B'} onPress={handleClockIn}>
                      Clock In
                    </Button>
                  )}{' '}
                  {job.clock_in_time && !job.clock_out_time && !viewOnly && (
                    <Button color={'white'} backgroundColor={'#33CC4B'} onPress={handleClockOut}>
                      Clock Out
                    </Button>
                  )}
                  {job.clock_out_time && (
                    <XStack space="$2" justifyContent="center" alignItems="center">
                      <Text fontSize={14} fontWeight={'bold'} color={'#000000'}>
                        Completed
                      </Text>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="36"
                        height="36"
                        fill="#00FF00"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 18 21 6l-1.41-1.41z" />
                      </svg>
                    </XStack>
                  )}
                </XStack>
              </YStack>
            </YStack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ClockInCard
