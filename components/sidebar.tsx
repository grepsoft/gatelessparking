import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import ActiveLink from './active-link'
import { UserButton } from '@clerk/nextjs'

export interface MenuItem {
    id: string,
    href: string,
    title: string
}

function Sidebar() {


  return (
    <div className="flex flex-col z-10 w-[256px] bg-gray-800 text-white 
        h-full overflow-auto p-4">
        <h1 className='text-2xl pl-4'>
            <Link href="/dashboard">Dashboard</Link>
        </h1>
        <div className="flex flex-col justify-between h-full">
          <ul className='w-full pt-8 space-y-2 flex flex-col'>
            <li>
              <ActiveLink href='/dashboard/locations/tileview'>
                Locations
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href='/dashboard/bookings'>
                Bookings
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href='/dashboard/revenue'>
                Revenue
              </ActiveLink>
            </li>
          </ul>

          <div className="pl-4 text-blue-600">
            <UserButton />
          </div>
        </div>
    </div>
  )
}

export default Sidebar