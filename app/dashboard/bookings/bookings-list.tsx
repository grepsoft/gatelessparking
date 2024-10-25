'use client'

import { getParkingLocation, getParkingLocations } from '@/actions/actions'
import DateSelect from '@/components/date-select'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ParkingLocation } from '@/schemas/parking-locations'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import Booked from './_components/booked'
import Cancelled from './_components/cancelled'

interface FilterParams {
    date: Date,
    id: string
}
const FormSchema = z.object({
    date: z.date({
        required_error: "Date is required.",
    }),
    location: z
        .string({
            required_error: "Please select a location"
        })
})

function BookingList() {

    const [params, setParams] = useState<FilterParams>({
        date: new Date(),
        id: ''
    })
    const [locations, setLocations] = useState<ParkingLocation[]>([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            date: new Date()
        }
    })

    useEffect(() => {
        (async () => {
            const result = await getParkingLocations()
            setLocations(result)
        })()
    }, [])

    function onSubmit(formData: z.infer<typeof FormSchema>) {

        if (!formData.date || !formData.location) {
            toast.info("Please specify date and location")
            return
        }

        setParams({
            date: formData.date,
            id: formData.location
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className="flex sm:flex-row flex-col space-y-4 sm:space-x-2 sm:items-end">
                    <FormField
                        control={form.control}
                        name='date'
                        render={( {field}) => (
                            <FormItem className='w-full lg:w-[250px] grid'>
                                <FormLabel>Date</FormLabel>
                                <DateSelect field={field} disableDates={false} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='location'
                        render={({ field}) => (
                            <FormItem className='w-full lg:w-[250px] grid'>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a location' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            locations.map(location => (
                                                <SelectItem key={location._id as string} 
                                                value={location._id as string}>
                                                    {location.address}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Search</Button>
                </form>
            </Form>

            <Tabs defaultValue='booked' className='w-[320px] sm:w-full pt-8'>
                <TabsList>
                    <TabsTrigger value='booked'>Booked</TabsTrigger>
                    <TabsTrigger value='cancelled'>Cancelled</TabsTrigger>
                </TabsList>
                <TabsContent value='booked'><Booked date={params?.date as Date} locationid={params?.id as string}/></TabsContent>
                <TabsContent value='cancelled'><Cancelled date={params?.date as Date} locationid={params?.id as string} /></TabsContent>
            </Tabs>
        </div>
    )
}

export default BookingList