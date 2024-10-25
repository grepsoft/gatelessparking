import { deleteBooking, getBookings } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import { getStreetFromAddress } from '@/lib/utils'
import { Booking } from '@/schemas/booking'
import { ParkingLocation } from '@/schemas/parking-locations'
import { BookingStatus } from '@/types'
import { format } from 'date-fns'
import { Loader, TrashIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Cancelled({date, locationid}: {
  date: Date, locationid: string
}) {

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)

  const pathname = usePathname()

  const populateBookings = async () => {
    setLoading(true)
    const result = await getBookings(date, locationid, BookingStatus.CANCELLED)
    setBookings(result.data as Booking[])
    setLoading(false)
  }

  useEffect(() => {
    if (date && locationid) {
      populateBookings()
    }
}, [date, locationid])

  const handleDeleteBooking = async (id: string) => {
    await deleteBooking(id)
    populateBookings()
  }
  return (
    <div>
      {
        loading ? <Loader /> : 
        bookings.length > 0 ? bookings.map((booking: Booking) => (
          <div key={booking._id as string}>
              <div className="bg-gray-50">
                <div className="flex flex-col pl-4 p-4">
                  <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-2 justify-between p-2'>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <p className="text-xl font-bold">{getStreetFromAddress(((booking.locationid as unknown) as ParkingLocation).address)}</p>
                        <p className="text-sm pl-4">{format(booking.bookingdate, 'MMM, dd yyyy')}</p>
                      </div>
                      <p className="text-sm">
                        {format(booking.starttime, 'hh:mm a')} - {format(booking.endtime, 'hh:mm a')}
                      </p>
                    </div>

                    <Button variant='destructive' onClick={() => handleDeleteBooking(booking._id as string)}>
                      <TrashIcon className='mr-2 h-4 w-4'>Delete</TrashIcon>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="pt-1"></div>
          </div>
        )) : <p className="text-center pt-12 pb-12 text-xl sm:text-4xl text-slate-300">No bookings</p>
      }
    </div>
  )
}

export default Cancelled