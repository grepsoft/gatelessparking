import React, { useCallback } from 'react'

function TimelineTicks() {

    const markers = useCallback(() => {
        const markers = []
        const increment = 30
        const totalMarkers = 23.5 * (60 / increment)
    
        for (let i=0; i<= totalMarkers; i++) {
            const isHourMarker = i % 2 == 0
            const leftPosition = i * 30
    
            markers.push(
                <div key={i} 
                className={`w-1 ${isHourMarker ? 'h-8 bg-gray-500' : 'h-4 bg-gray-400'} absolute`}
                style={{ left: `${leftPosition}px`}}>
    
                </div>
            )
        }

        return markers
    }, [])


    return (
        <div className='flex pt-32 relative items-center'>
            {markers()}
        </div>
    )
}

export default TimelineTicks