import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { FormControl } from './ui/form'
import { getTimeSlots } from '@/lib/utils'

type PropType = {
    onChange: (value: string) => void,
    defaultValue: string | undefined,
    disableTime?: string
}

function TimeSelect(props: PropType) {

    const disableTime: Date = 
    new Date(`2000-01-01T${props.disableTime}:00`)

  return (
    <Select onValueChange={props.onChange} value={props.defaultValue}>
        <FormControl>
            <SelectTrigger>
                <SelectValue placeholder={<p className='text-muted-foreground'>Select a time</p>} />
            </SelectTrigger>
        </FormControl>
        <SelectContent>
            {
                getTimeSlots().map(time => (
                    new Date(`2000-01-01T${time.time}:00`) <= disableTime ?
                    <SelectItem disabled key={time.time} value={time.time}>{time.display}</SelectItem>
                    :
                    <SelectItem key={time.time} value={time.time}>{time.display}</SelectItem>
                ))
            }
        </SelectContent>
    </Select>
  )
}

export default TimeSelect