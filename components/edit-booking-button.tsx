'use client'

import { updateBooking } from '@/actions/actions'
import { Booking } from '@/schemas/booking'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { PencilIcon } from 'lucide-react'
import { Form, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import DateSelect from './date-select'
import TimeSelect from './time-select'

const FormSchema = z.object({
  arrivingon: z.date({
    required_error: "Date is required.",
  }),
  arrivingtime: z.string({
    required_error: "Time is required"
  }),
  leavingtime: z.string({
    required_error: "Time is required"
  })
})

function EditBookingButton({ booking }: { booking: Booking }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      arrivingon: new Date(booking.bookingdate),
      arrivingtime: format(booking.starttime, 'HH:mm'),
      leavingtime: format(booking.endtime, 'HH:mm')
    }
  })

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const response = await updateBooking(booking._id as string,
      formData.arrivingon,
      formData.arrivingtime,
      formData.leavingtime,
      pathname
    )

    const { code, message } = response

    if (code == 0) {
      setOpen(false)
    }

    toast.success(message)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className='w-[100px]' variant={'outline'}>
            <PencilIcon className='text-blue-500 mr-2 h-4 w-4' />Edit
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Booking</SheetTitle>
            <div>
              <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="pt-4 grid grid-cols-1 gap-y-8 items-end">

                  <FormField
                    control={form.control}
                    name='arrivingon'
                    render={({ field }) => (
                      <FormItem className='grid'>
                        <FormLabel>Arriving on</FormLabel>
                        <DateSelect disableDates={true} field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='arrivingtime'
                    render={({ field }) => (
                      <FormItem className='grid'>
                        <FormLabel>Arriving on</FormLabel>
                        <TimeSelect onChange={field.onChange} defaultValue={field.value} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='leavingtime'
                    render={({ field }) => (
                      <FormItem className='grid'>
                        <FormLabel>Leaving on</FormLabel>
                        <TimeSelect onChange={field.onChange} defaultValue={field.value} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit'>
                    Save
                  </Button>
                </form>
              </Form>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default EditBookingButton