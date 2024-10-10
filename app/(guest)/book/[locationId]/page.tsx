'use client'

import { getParkingLocation } from '@/actions/actions'
import { createCheckoutSession } from '@/actions/stripe'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectSeparator } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { formatAmountForDisplay, getStreetFromAddress } from '@/lib/utils'
import { ParkingLocation } from '@/schemas/parking-locations'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInMinutes, format } from 'date-fns'
import { ArrowRight, Loader } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
    plateno: z.string().min(1, {
        message: 'Plate number must be at least 1 character.'
    })
})

function BookPage() {

    const [loading, setLoading] = useState(false)
    const params = useParams<{ locationId: string}>()
    const locationId = params.locationId
    const searchParams = useSearchParams()
    const date = searchParams.get('date')
    const startTime = searchParams.get('starttime')
    const endTime = searchParams.get('endtime')
    const [location, setLocation] = useState<ParkingLocation>()
    const diffInHours = useMemo(() => 
        differenceInMinutes(new Date(`${date}T${endTime}`), new Date(`${date}T${startTime}`))
    , [date, startTime, endTime]) / 60

    useEffect(() => {
        (async () => {
            const location = await getParkingLocation(locationId)
            setLocation(location as ParkingLocation)
        })()
    }, [])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            plateno: ''
        }
    })

    async function onSubmit(formData: z.infer<typeof FormSchema>) {
 
        const fd = new FormData()
        const amount = diffInHours * location?.price.hourly!
        fd.append('address', getStreetFromAddress(location?.address!))
        fd.append('amount', `${amount}`)
        fd.append('locationid', `${location?._id}`)
        fd.append('bookingdate', date!)
        fd.append('starttime', startTime!)
        fd.append('endtime', endTime!)
        fd.append('plate', formData.plateno)

        // do a checkout
        await createCheckoutSession(fd)
    }


    return (
        <div className='h-full'>
            <main className="sm:-mt-16 sm:container flex flex-col items-center">

                <div className="grid grid-cols-3 w-[400px] sm:w-[700px] p-4 bg-slate-300">

                    <div className="space-y-1 sm:justify-self-center">
                        <h4 className="flex items-center text-gray-500"><ArrowRight className='mr-2 h-4 w-4' />Entrance</h4>
                        <p className="text-sm font-bold">{format(new Date(`${date}T${startTime}`), 'MMM, dd yyyy HH:mm a')}</p>
                    </div>

                    <div className="h-10 self-center justify-self-center">
                        <Separator className='bg-gray-400' orientation='vertical' />
                    </div>

                    <div className="space-y-1 sm:justify-self-center">
                        <h4 className="flex items-center text-gray-500">Exit<ArrowRight className='ml-2 h-4 w-4' /></h4>
                        <p className="text-sm font-bold">{format(new Date(`${date}T${endTime}`), 'MMM, dd yyyy HH:mm a')}</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='bg-white w-[400px] sm:w-[700px] border p-4 shadow flex flex-col pt-12 pb-12 space-y-4' >
                        <div>
                            {location && <p className='font-bold text-xl'>{getStreetFromAddress(location.address)}</p>}
                        </div>

                        <div className="flex flex-col bg-slate-100 p-4 gap-y-2 rounded">
                            <div className="flex justify-between text-sm font-bold">
                                <p>Hourly rate</p>
                                <p>{location ? formatAmountForDisplay(location.price.hourly, 'CAD') : '...'}</p>
                            </div>
                            <div className="flex justify-between text-sm font-bold">
                                <p>{diffInHours} Hours</p>
                                <p>{location ? formatAmountForDisplay(diffInHours * location.price.hourly, 'CAD') : '...'}</p>
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name='plateno'
                            render={({ field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Plate #
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='uppercase' placeholder='ABCD 1234' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    Make sure your license plate matches the vehicle you park to avoid a parking ticket or towing.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />  

                        {
                            loading ? <Loader /> :
                            <Button>Proceed to payment</Button>
                        }
                    </form>
                </Form>
            </main>
            <section className='sm:absolute w-full sm:bottom-0'>
                <Footer />
            </section>
        </div>
    )
}

export default BookPage