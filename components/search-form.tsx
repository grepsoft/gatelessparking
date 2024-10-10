import React, { useEffect } from 'react'
import { Input } from './ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Label } from './ui/label'
import { z } from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import DateSelect from './date-select'
import TimeSelect from './time-select'
import { LatLng } from '@/types'
import AddressAutoCompleteInput from './address-autocomplete.input'
import { format } from 'date-fns'

const FormSchema = z.object({
    address: z.string(),
    arrivingon: z.date({
        required_error: "Date is required"
    }),
    // gps coords
    gpscoords: z.object({
        lat: z.number(),
        lng: z.number()
    }),
    arrivingtime: z.string({
        required_error: "Time is required"
    }),
    leavingtime: z.string({
        required_error: "Time is required"
    })
})

function SearchForm({
    onSearch
}: {
    onSearch: (data: any) => void
}) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            leavingtime: ''
        }
    })

    const arrivingTime = useWatch({
        control: form.control,
        name: 'arrivingtime'
    })

    useEffect(() => {
        if (arrivingTime) {
            form.resetField('leavingtime')
        }
    }, [arrivingTime, form])

    function onSubmit(formData: z.infer<typeof FormSchema>) {
        
        const data = { ...formData, arrivingon: format(formData.arrivingon, 'yyyy-MM-dd')}

        onSearch(data)
    }

    const handleAddressSelect = (address: string, gpscoords: LatLng) => {
        form.setValue('address', address)
        form.setValue('gpscoords', gpscoords)

    }
    return (
        <div className="flex flex-col lg:flex-row">
            <div className='grid gap-y-1.5 lg:w-1/2'>
                <Label htmlFor='parkingat'>Address</Label>
                <AddressAutoCompleteInput onAddressSelect={handleAddressSelect} selectedAddress='' />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-y-2 grid grid-cols-1 lg:grid-cols-4 gap-x-32 items-end">

                    <FormField 
                        control={form.control}
                        name='arrivingon'
                        render={({ field }) => (
                            <FormItem className='lg:w-[250px] grid'>
                                <FormLabel>Arriving on</FormLabel>
                                <FormControl>
                                    <DateSelect field={field} disableDates={true} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name='arrivingtime'
                        render={({ field }) => (
                            <FormItem className='lg:w-[250px] grid'>
                                <FormLabel>Arriving on</FormLabel>
                                <FormControl>
                                    <TimeSelect onChange={field.onChange} defaultValue={field.value} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name='leavingtime'
                        render={({ field }) => (
                            <FormItem className='lg:w-[250px] grid'>
                                <FormLabel>Leaving on</FormLabel>
                                <FormControl>
                                    <TimeSelect 
                                    disableTime={form.getValues('arrivingtime')}
                                    onChange={field.onChange} defaultValue={field.value} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type='submit'>Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default SearchForm