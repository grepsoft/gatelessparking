import React from 'react'
import { sub, format } from 'date-fns'
import { ControllerRenderProps } from 'react-hook-form'
import { Popover,PopoverContent, PopoverTrigger } from './ui/popover'
import { FormControl } from './ui/form'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'

type PropType = {
    field: ControllerRenderProps<any>,
    disableDates: boolean
}

function DateSelect(params: PropType) {

    const disabled = params.disableDates ? (date: Date) => 
        date < sub(new Date(), { days: 1} ) : []

  return (
    <Popover>
        <PopoverTrigger asChild>
            <FormControl>
                <Button
                    variant={"outline"}
                    className={cn('pl-3 text-left font-normal',
                        !params.field.value && "text-muted-foreground"
                    )} >
                        {params.field.value ? (
                            format(params.field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
            </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
                mode='single'
                selected={params.field.value}
                onSelect={params.field.onChange}
                disabled={disabled}
                initialFocus
            />
        </PopoverContent>
    </Popover>
  )
}

export default DateSelect