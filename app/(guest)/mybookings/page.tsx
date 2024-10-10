import CancelBookingButton from '@/components/cancel-booking-button'
import EditBookingButton from '@/components/edit-booking-button'
import { connectToDB } from '@/lib/db'
import { getStreetFromAddress } from '@/lib/utils'
import { Booking, BookingModel } from '@/schemas/booking'
import { ParkingLocation, ParkingLocationModel } from '@/schemas/parking-locations'
import { BookingStatus } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { format, formatRelative } from 'date-fns'
import React from 'react'

async function MyBookingsPage() {

    const { userId } = auth()

    if (!userId) {
        await auth().redirectToSignIn({ returnBackUrl: '/mybookings'})
    }

    await connectToDB()


    const bookings: Booking[] = await BookingModel.find({
        userid: userId
    }).populate({
        path: 'locationid', model: ParkingLocationModel
    })

  return (
    <div className='-mt-16 p-4'>
        <div className="sm:container bg-gray-50 shadow">
            <header className="text-2xl sm:text-4xl text-center w-full p-4">My Bookings</header>
            <hr />
            {
                bookings.map(booking => (
                    <div key={booking.id}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 p-2 items-center">
                            <div className="flex flex-col space-y-1 items-start">
                                <p className="text-sm text-slate-400">{booking.status}</p>
                                <p className="text-xl font-bole">
                                    {getStreetFromAddress(((booking.locationid as unknown) as ParkingLocation).address)}</p>
                                <p className="text-sm">{format(booking.bookingdate, 'MMM, dd yyy')}</p>
                                <p className='text-sm'>
                                {format(booking.starttime, 'hh:mm a')} - {format(booking.endtime, 'hh:mm a')}</p>
                            </div>
                            {
                                booking.status === BookingStatus.BOOKED &&
                                <div className='flex sm:flex-col sm:space-y-2 items-end'>
                                    <CancelBookingButton param={JSON.parse(JSON.stringify(booking.id))} />
                                    <EditBookingButton booking={JSON.parse(JSON.stringify(booking))} />
                                </div>
                            }
                        </div>
                        <hr />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default MyBookingsPage