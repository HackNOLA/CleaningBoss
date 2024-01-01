import React, { useEffect, useState } from 'react'
import { Card, XStack, YStack, Text } from '@my/ui'
import { createClient } from '@supabase/supabase-js'
import ClockInCard from './clockincard'
import supabase from 'context/supabasecontext'

export const JobStatusCard = ({ job }: { job: any }) => {
  const [shift, setShift] = useState<any>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchShift = async () => {
      const { data } = await supabase.from('shifts').select('*').eq('id', job.id_shift).single()
      setShift(data)
    }

    fetchShift()
  }, [])

  return (
    <Card
      onPress={() => setOpen(!open)}
      className="load-hidden"
      backgroundColor={'white'}
      width={350}
      height={100}
    >
      <XStack paddingLeft={20} top={16}>
        <YStack alignItems="flex-start" padding="$2">
          {shift && (
            <>
              <XStack width={250} justifyContent="space-between">
                <Text fontSize={14} fontWeight="bold">
                  {`${shift.location_name}`}
                </Text>

                <Text color={'black'} fontSize={14}>
                  {/* calculate difference of hours between job start time and end time */}

                  {job.date}
                </Text>
              </XStack>
              <Text fontSize={14} fontWeight="bold">
                {`${shift.label}`}
              </Text>
            </>
          )}
          <XStack width={270} space="$2" alignItems="center" justifyContent="space-between">
            <XStack space="$2" alignItems="center" justifyContent="space-evenly">
              <Text color={'blue'} fontSize={14}>
                {new Date(job.start_time).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
                {' - '}
                {new Date(job.end_time).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </Text>
            </XStack>
            {/* create indicator for has not clocked in*/}
            {!job.clock_in_time && (
              <XStack space="$2" alignItems="center" justifyContent="space-evenly">
                <Text color={'red'} fontSize={14}>
                  {'Not clocked in'}
                </Text>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  fill="#FF0000"
                >
                  <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2zm0 8h-2v2h2z" />
                </svg>
              </XStack>
            )}
            {/* create indicator for has clocked in*/}
            {job.clock_in_time && (
              <XStack space="$2" alignItems="center" justifyContent="space-evenly">
                <Text color={'green'} fontSize={14}>
                  {!job.clock_out_time ? 'Clocked in' : 'Clocked out'}
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
      </XStack>
      {open && <ClockInCard job={job} open={open} setOpen={setOpen} viewOnly={true} />}
    </Card>
  )
}
