import { Separator } from '@/components/ui/separator'
import React from 'react'
import BookingList from './bookings-list'

function BookingsPage() {
  return (
    <div className='p-0'>
      <h2 className="text-2xl text-gray-800 p-2">Bookings</h2>
      <Separator className='bg-gray-300 w-full mb-4' />
      <BookingList />
    </div>
  )
}

export default BookingsPage