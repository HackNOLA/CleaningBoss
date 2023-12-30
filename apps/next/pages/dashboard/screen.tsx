'use client'

import { createClient } from '@supabase/supabase-js'
import { useContext, useEffect, useState } from 'react'
import { YStack, View, XStack, Toast } from '@my/ui'
import Card from 'components/card'
import SegmentedControl from 'components/segmentedcontrol'
import { CurrentToast } from 'components/CurrentToast'
import Map from 'components/map'
import { OrgContext } from 'context/orgcontext'
import { UserContext } from 'context/usercontext'
import { useAuth } from '@clerk/nextjs'
import { setCookie, deleteCookie } from 'cookies-next'

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export default function Dashboard() {
  const segments = ['Yesterday', 'Today', 'Tomorrow'] // Define your segments

  const [selectedSegment, setSelectedSegment] = useState(0)
  const [locations, setLocations] = useState([])
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [completedJobs, setCompletedJobs] = useState(0)
  const [hoursWorked, setHoursWorked] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const [activeCleaners, setActiveCleaners] = useState(0)
  const [shiftStaffAmount, setShiftStaffAmount] = useState(0)

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
    })
    setFilteredJobs(filteredJobs)
    const completedJobs = filteredJobs.filter((job) => job?.completed === true)
    setCompletedJobs(completedJobs.length)
    const activeCleaners = filteredJobs.filter((job) => job?.clock_in_time || job?.clock_out_time)
    setActiveCleaners(activeCleaners.length)
    const hoursWorked = filteredJobs.reduce((acc, job) => {
      const start = new Date(job?.clock_in_time)
      const end = new Date(job?.clock_out_time)
      const diff = end.getTime() - start.getTime()
      const hours = diff / (1000 * 3600)
      return acc + hours
    }, 0)
    setHoursWorked(hoursWorked)
    const totalHours = filteredJobs.reduce((acc, job) => {
      const start = new Date(job?.start_time)
      const end = new Date(job?.end_time)
      const diff = end.getTime() - start.getTime()
      const hours = diff / (1000 * 3600)
      return acc + hours
    }, 0)
    setTotalHours(totalHours)
  }

  useEffect(() => {
    deleteCookie('activeUser')
    const getUserInfo = async () => {
      if (clerkId) {
        deleteCookie('userId')
        setCookie('userId', clerkId, {
          maxAge: 30 * 24 * 60 * 60,
          // domain: 'cleaningboss-dev.vercel.app',
        })
      }
    }
    if (activeUser) {
      setCookie('activeUser', activeUser, {
        maxAge: 30 * 24 * 60 * 60,
        // domain: 'cleaningboss-dev.vercel.app',
      })
      checkOrg(activeUser)
      return
    }
    getUserInfo()
  }, [activeUser])

  const checkOrg = async (activeUser) => {
    if (activeUser?.id_company) {
      const { data: foundOrg } = await supabase
        .from('company')
        .select()
        .eq('id', activeUser?.id_company)

      setOrg(foundOrg[0])
      const { data: shifts } = await supabase
        .from('shifts')
        .select()
        .eq('id_company', activeUser?.id_company)
      if (!shifts) return
      for (let shift of shifts) {
        setShiftStaffAmount(shiftStaffAmount + shift?.cleaner_amount)
        const { data: foundJobs } = await supabase.from('jobs').select().eq('id_shift', shift?.id)
        if (!foundJobs) return
        setJobs([...foundJobs])
      }
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

  const decimalToWhole = () => {
    return Math.round((filteredJobs.length / shiftStaffAmount) * 100)
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
          <XStack space="$4">
            <Card
              title="Staffed"
              icon="users"
              info={`${decimalToWhole()}% of jobs are currently staffed`}
            />
            {filteredJobs && (
              <Card
                title="Completed"
                icon="check-circle"
                info={`${completedJobs} out of ${filteredJobs.length} jobs completed`}
              />
            )}
          </XStack>
          <XStack space="$4">
            <Card
              title="Hours"
              icon="clock"
              info={`${hoursWorked} of ${totalHours} hours scheduled`}
            />
            <Card
              title="Cleaners"
              icon="user"
              info={`${activeCleaners}/${filteredJobs.length} Cleaners were active`}
            />
          </XStack>
        </YStack>
      </YStack>
    </View>
  )
}
