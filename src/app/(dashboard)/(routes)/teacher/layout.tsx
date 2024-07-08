import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { isTeacher } from '@/lib/teacher'
import { redirect } from 'next/navigation'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    const {userId} = auth();

    if(!isTeacher(userId)) return redirect("/")
  return (
    <div className='h-full'>
     {children}
    </div>
  )
}

export default DashboardLayout