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

const supabase = createClient(
  'https://jqlnugxsnwftfvzsqfvv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxbG51Z3hzbndmdGZ2enNxZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMzc5MTEsImV4cCI6MjAxMjcxMzkxMX0.ziDaVJRdM87tJ08XOf9XH2gTpoSbid4ZXZdSGmEGH18'
)

export default function Dashboard() {
  const segments = ['Yesterday', 'Today', 'Tomorrow', 'Custom'] // Define your segments

  const [selectedSegment, setSelectedSegment] = useState(0)

  const { email, activeUser, setActiveUser, setClerkId } = useContext(UserContext)
  const { orgName, setOrg } = useContext(OrgContext)
  const { userId: clerkId } = useAuth()
  // const [bgColor, setBgColor] = useState('green' as any)

  const handleSegmentChange = (index) => {
    setSelectedSegment(index)
  }

  useEffect(() => {
    const getUserInfo = async () => {
      if (clerkId) {
        console.log('clerkId', clerkId)
        deleteCookie('userId')
        setCookie('userId', clerkId, {
          maxAge: 30 * 24 * 60 * 60,
          domain: 'cleaningboss-dev.vercel.app',
        })
      }
    }
    if (activeUser) {
      deleteCookie('activeUser')
      setCookie('activeUser', activeUser, {
        maxAge: 30 * 24 * 60 * 60,
        domain: 'cleaningboss-dev.vercel.app',
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

    // console.log(activeUser, orgName)
  }

  return (
    <View>
      <YStack display="flex" justifyContent="center" alignItems="center" paddingBottom={0}>
        <View height={80} />
        <Toast />
        {/* <CurrentToast bgColor={'green'} /> */}
        <View justifyContent="center" alignItems="center">
          <Map />
        </View>
        <View height={15} />
        <SegmentedControl segments={segments} onChange={handleSegmentChange} />
        <View height={15} />
        <YStack space="$4">
          <XStack space="$4">
            <Card title="Staffed" icon="users" info="224 of 338 hours scheduled" />
            <Card title="Completed" icon="check-circle" info="4 out of 6 jobs completed" />
          </XStack>
          <XStack space="$4">
            <Card title="Hours" icon="clock" info="224h worked out of 338h scheduled" />
            <Card title="Cleaners" icon="user" info="8/10 Cleaners were active" />
          </XStack>
        </YStack>
      </YStack>
    </View>
  )
}
