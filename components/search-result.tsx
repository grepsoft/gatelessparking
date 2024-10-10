import { MapAddressType, MapParams } from '@/types'
import React from 'react'
import { SearchParams } from './search-component'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { cn, formatAmountForDisplay, getStreetFromAddress } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

function SearchResult({
    locations, params
}: {
    locations: MapParams[],
    params: SearchParams
}) {
    console.log(locations)
  return (
    <>
    {
        locations.filter(loc => loc.type === MapAddressType.PARKINGLOCATION).map((loc, index) => (

            <Card key={loc.address}>
                <CardHeader>
                    <CardTitle className='text-white w-6 h-6 rounded-full bg-black text-center'>
                        {index + 1}
                    </CardTitle>
                    <CardDescription className='text-lg font-bold'>
                        {getStreetFromAddress(loc.address)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 grid grid-cols-1 items-start last:mb-0 last:pb-0">
                        <div className="space-y-2 pb-2">
                            <div className="grid grid-cols-2">
                                <p className="text-sm">
                                    Hourly price:
                                </p>
                                <p className="text-sm">
                                    {formatAmountForDisplay(loc.price?.hourly!, 'CAD')}
                                </p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="text-sm">
                                    Spots available:
                                </p>
                                <p className="text-sm">
                                    {loc.numberofspots! - loc.bookedspots!}
                                </p>
                            </div>
                        </div>

                        <hr />

                        {
                            params && 
                            <Link
                                className={cn(buttonVariants({variant: 'outline'}), 'bg-primary text-white',
                                `${(loc.numberofspots! - loc.bookedspots!) === 0 ? 'hidden' : 'flex' }`
                                )}
                                href={`book/${loc.id}?date=${params.arrivingon}&starttime=${params.arrivingtime}&endtime=${params.leavingtime}`}
                            >Book</Link>
                        }
                    </div>
                </CardContent>
            </Card>
        ))
    }
    </>
  )
}

export default SearchResult