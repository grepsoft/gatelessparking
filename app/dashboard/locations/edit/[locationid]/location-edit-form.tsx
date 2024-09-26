'use client'

import { ParkingLocation } from '@/schemas/parking-locations'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateLocation } from '@/actions/actions'
import { usePathname } from 'next/navigation'
import { Loader } from 'lucide-react'

const FormSchema = z.object({
    numberofspots: z
        .coerce
        .number({ invalid_type_error: "must be a number" })
        .positive({ message: 'Value must be positive' })
        .finite({ message: "Must be a valid number" }),
    hourly: z
        .coerce
        .number({ invalid_type_error: "must be a number" })
        .positive({ message: 'Value must be positive' })
        .finite({ message: "Must be a valid number" })
})

type FormInput = z.infer<typeof FormSchema>

function LocationEditForm({ location }: { location: string }) {

    const parsedLocation = JSON.parse(location) as ParkingLocation
    const [progress, setProgress] = useState(false)
    const pathname = usePathname()

    const form = useForm<FormInput>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            numberofspots: parsedLocation.numberofspots,
            hourly: parsedLocation.price.hourly
        }
    })

    const onSubmit = async (data: FormInput) => {
        setProgress(true)
        await updateLocation({
            id: parsedLocation._id as string,
            path: pathname,
            location: {
                address: parsedLocation.address,
                numberofspots: data.numberofspots,
                price: {
                    hourly: data.hourly
                }
            }
        })
        setProgress(false)
    }

    return (
        <div className='sm:container mt-2
        sm:w-1/2 flex flex-col bg-white pt-10 pb-10 p-4 rounded gap-y-4 items-center'>
            <p className='sm:text-2xl'>{parsedLocation.address}</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='container flex flex-col gap-y-4'>
                    <FormField
                        control={form.control}
                        name='hourly'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='e.g. 10' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='numberofspots'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='e.g. 10' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col mt-4">
                        {
                            progress ? <Loader /> :
                                <>
                                    <Button type='submit'>Save</Button>
                                    <Button type='button' variant='ghost'
                                        onClick={() => window.history.back()} >Back</Button>
                                </>

                        }
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default LocationEditForm