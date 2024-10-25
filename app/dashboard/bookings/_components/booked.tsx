import { getBookings } from '@/actions/actions'
import Timeline from '@/components/timeline'
import TimelineTicks from '@/components/timeline-ticks'
import { blockLength, blockPostion, sortcomparer } from '@/lib/utils'
import { Booking } from '@/schemas/booking'
import { BookingStatus } from '@/types'
import { format } from 'date-fns'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function Booked({ date, locationid }: {
  date: Date, locationid: string
}) {

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (locationid && date) {

      (async () => {
        setLoading(true)
        const result = await getBookings(date, locationid, BookingStatus.BOOKED)
        setBookings(result.data as Booking[])
        setLoading(false)
      })()
    }
  }, [date, locationid])

  return (
    <>
      {
        loading ? <Loader /> : 
        bookings.length > 0 ? 
        <div className='relative h-full p-2 bg-white rounded-md shadow overflow-x-auto'>
            <Timeline />
            <TimelineTicks />
            <div className='relative' style={{ height: `${bookings.length * 60}px`}}>
              {
                bookings.sort(sortcomparer).map((booking, index) => (
                  <div key={index}
                    style={{
                      width: `${blockLength(booking.starttime, booking.endtime)}px`,
                      left: `${blockPostion(booking.starttime)}px`,
                      top: `${(index + 1) * 36}px`
                    }}
                    className='h-8 bg-blue-500 text-white absolute rounded-md'
                  >
                    <p className='text-sm p-1 overflow-hidden overflow-ellipsis whitespace-nowrap'>
                    {format(booking.starttime, 'HH:mm')}-{format(booking.endtime, 'HH:mm')}
                    </p>
                    
                  </div>
                ))
              }
            </div>
        </div>
        :
        <p className="text-center pt-12 pb-12 text-xl sm:text-4xl text-slate-300">No bookings</p>
      }

    </>
  )
}

export default Booked