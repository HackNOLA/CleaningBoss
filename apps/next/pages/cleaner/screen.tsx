'use client'

import { createClient } from '@supabase/supabase-js'
import React, { useContext, useEffect, useState } from 'react'
import { YStack, View, XStack, Toast } from '@my/ui'
import Card from 'components/card'
import SegmentedControl from 'components/segmentedcontrol'
import { CurrentToast } from 'components/CurrentToast'
import Map from 'components/map'
import { OrgContext } from 'context/orgcontext'
import { UserContext } from 'context/usercontext'
import { useAuth } from '@clerk/nextjs'
import { setCookie, deleteCookie } from 'cookies-next'
import supabase from 'context/supabasecontext'

export default function Dashboard() {
  const segments = ['Yesterday', 'Today', 'Tomorrow', 'Week'] // Define your segments

  const [selectedSegment, setSelectedSegment] = useState(0)

  const [locations, setLocations] = useState([])

  const [jobs, setJobs] = useState([])

  const [filteredJobs, setFilteredJobs] = useState([])

  const [completedJobs, setCompletedJobs] = useState(0)

  const [hoursWorked, setHoursWorked] = useState(0)

  const [futureJobs, setFutureJobs] = useState([])

  const { email, activeUser, setActiveUser, setClerkId } = useContext(UserContext)
  const { orgName, setOrg } = useContext(OrgContext)
  const { userId: clerkId } = useAuth()
  // const [bgColor, setBgColor] = useState('green' as any)

  const handleSegmentChange = (index) => {
    setSelectedSegment(index)

    const filteredJobs = jobs.filter((job) => {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const jobDate = new Date(job?.date)
      if (index === 0) {
        return jobDate.getDate() === yesterday.getDate()
      }
      if (index === 1) {
        return jobDate.getDate() === today.getDate()
      }
      if (index === 2) {
        return jobDate.getDate() === tomorrow.getDate()
      }
      if (index === 3) {
        //if jobDate is between today and 7 days from now
        return jobDate.getDate() >= today.getDate() && jobDate.getDate() <= tomorrow.getDate()
      }
    })
    setFilteredJobs(filteredJobs)

    const completedJobs = filteredJobs.filter((job) => job?.completed === true)
    setCompletedJobs(completedJobs.length)

    const hoursWorked = filteredJobs.reduce((acc, job) => {
      const timeObj1 = new Date('2000-01-01 ' + job.clock_in_time)
      const timeObj2 = new Date('2000-01-01 ' + job.clock_out_time)

      // Calculate the time difference in milliseconds
      const timeDifferenceMillis = timeObj2 - timeObj1
      // Convert milliseconds to hours, minutes, and seconds
      const hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60))
      console.log(hours)
      return acc + hours
    }, 0)
    setHoursWorked(hoursWorked)
  }
  useEffect(() => {
    deleteCookie('activeUser')
    const getUserInfo = async () => {
      if (clerkId) {
        deleteCookie('userId')
        setCookie('userId', clerkId, {
          maxAge: 30 * 24 * 60 * 60,
          domain: 'mycleaningboss.app',
        })
      }
    }
    if (activeUser) {
      setCookie('activeUser', activeUser, {
        maxAge: 30 * 24 * 60 * 60,
        domain: 'mycleaningboss.app',
      })
      checkOrg(activeUser)
      return
    }
    getUserInfo()

    // get future jobs
    const today = new Date()
    // if there are any jobs after today, set them to future jobs
    const futureJobs = jobs.filter((job) => {
      const jobDate = new Date(job?.date)
      return jobDate.getDate() >= today.getDate()
    })
    setFutureJobs(futureJobs)
  }, [activeUser, filteredJobs])

  const checkOrg = async (activeUser) => {
    const { data: foundJobs } = await supabase.from('jobs').select().eq('id_user', activeUser.id)
    setJobs(foundJobs)

    if (activeUser?.id_company) {
      const { data: foundOrg } = await supabase
        .from('company')
        .select()
        .eq('id', activeUser?.id_company)

      setOrg(foundOrg[0])
      const fetchLocations = async () => {
        const { data: locations } = await supabase
          .from('location')
          .select()
          .eq('id_company', foundOrg[0]?.id)
        if (!locations) return
        setLocations(locations)
      }
      fetchLocations()
      return
    }
    await updateOrg(activeUser?.id)
  }

  const updateOrg = async (id_user) => {
    const { data } = await supabase.from('company').select().eq('name', orgName)
    const foundOrg = data[0]

    if (foundOrg) {
      const employee_count = foundOrg.employee_count + 1
      await supabase.from('company').update({ id_creator: id_user, employee_count }).eq('name', org)
      const { data } = await supabase
        .from('users')
        .update({ id_company: foundOrg.id, clerk_id: userId })
        .eq('email', activeUser)

      setOrg(data[0])
    }
  }

  return (
    <View>
      <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}>
        <View height={80} />
        <Toast />
        {/* <CurrentToast bgColor={'green'} /> */}
        <View justifyContent="center" alignItems="center">
          <Map locations={locations} />
        </View>
        <View height={15} />
        <SegmentedControl segments={segments} onChange={handleSegmentChange} />
        <View height={15} />
        <YStack space="$4">
          {selectedSegment !== 3 && (
            <>
              <XStack space="$4">
                <Card
                  title="Completed Shifts"
                  icon="users"
                  info={`You completed ${
                    filteredJobs.filter((job) => job.completed).length
                  } job(s) this day`}
                />
                <Card
                  title="Future Shifts"
                  icon="check-circle"
                  info={`You have future ${futureJobs.length} jobs`}
                />
              </XStack>
              <XStack space="$4" paddingTop={12}>
                <Card
                  title="Hours Worked"
                  icon="clock"
                  info={`You clocked in ${hoursWorked} hours this day`}
                />
                {/* <Card title="Cleaners" icon="user" info="8/10 Cleaners were active" /> */}
              </XStack>
            </>
          )}
          {selectedSegment === 3 && (
            <>
              <XStack space="$4">
                <Card
                  title="Completed Shifts"
                  icon="users"
                  info={`You completed ${
                    filteredJobs.filter((job) => job.completed).length
                  } job(s) this week`}
                />
                <Card
                  title="Future Shifts"
                  icon="check-circle"
                  info={`You have future ${futureJobs.length} jobs`}
                />
              </XStack>
              <XStack space="$4" paddingTop={12}>
                <Card
                  title="Hours Worked"
                  icon="clock"
                  info={`You clocked in ${hoursWorked} hours this week`}
                />
                {/* <Card title="Cleaners" icon="user" info="8/10 Cleaners were active" /> */}
              </XStack>
            </>
          )}
        </YStack>
      </YStack>
    </View>
  )
}
