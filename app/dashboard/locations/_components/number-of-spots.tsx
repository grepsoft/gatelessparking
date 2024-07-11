import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMySpotStore } from '@/store'
import { ListSpotPropsType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
    numberofspots: z
        .coerce
        .number({ invalid_type_error: "must be a number" })
        .positive({ message: 'Value must be positive' })
        .finite({ message: "Must be a valid number" })
})

type NumberOfSpotsInput = z.infer<typeof FormSchema>

function NumberOfSpots({
    onNext, onPrev
}: ListSpotPropsType) {

    const mySpotStore = useMySpotStore()

    const form = useForm<NumberOfSpotsInput>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            numberofspots: mySpotStore.data.numberofspots
        }
    })

    const onSubmit = (data: NumberOfSpotsInput) => {
        mySpotStore.updateState({
            numberofspots: data.numberofspots
        })
        console.log("on next...")
        onNext()
    }

    return (
        <div className="grid w-full gap-1 5">
            <h2 className="text-xl sm:text-2xl py-4 font-semibold">Number of parking spots</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='numberofspots'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='e.g. 3' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between py-4">
                        <Button type='button' variant='ghost' onClick={onPrev}>Prev</Button>
                        <Button type='submit' variant='ghost'>Next</Button>

                    </div>
                </form>
            </Form>
        </div>
    )
}

export default NumberOfSpots