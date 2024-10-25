import React, { useCallback } from 'react'

function Timeline() {

    const timeslots = useCallback(() => {
        const formatTime = (hour: number, minutes: number) => {
            let period = 'AM'
            if (hour >= 12) {
                period = 'PM'
            }
    
            if (hour > 12) {
                hour -= 12
            }
    
            if (hour === 0) {
                hour = 12
            }
    
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
            return `${hour}:${formattedMinutes} ${period}`
        }
    
        const generateTimeSlots = () => {
            const timeslots = []
            for (let hour = 0; hour < 24; hour++) {
                timeslots.push(formatTime(hour, 0))
            }
            
            return timeslots
        }
    
        return generateTimeSlots()
    }, [])


  return (
    <div className='absolute flex items-center top-16 bg-purple-300'>
        {timeslots().map((time, index) => (
            <div key={index} className='absolute' 
            style={{left: `${60 * index}px`}}>
                <p className="text-md -rotate-45 w-[100px] -left-4 absolute">
                    {time}
                </p>
            </div>
        ))}
    </div>
  )
}

export default Timeline