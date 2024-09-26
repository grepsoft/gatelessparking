import { connectToDB } from '@/lib/db'
import { ParkingLocation, ParkingLocationModel } from '@/schemas/parking-locations'
import React from 'react'
import LocationCard from './_components/location-card'
import { getStreetFromAddress } from '@/lib/utils'

async function LocationsTileViewPage() {

  await connectToDB()

  const locations: ParkingLocation[] = await ParkingLocationModel.find({}) as [ParkingLocation]

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-2 p-2'>
      {
        locations.map(location => (
          <LocationCard
            key={location.id}
            id={location.id}
            name={getStreetFromAddress(location.address)}
            address={location.address}
            numberOfSpots={location.numberofspots}
            spotsAvailable={4}
            spotsBooked={6}
            status={location.status}
            price={location.price}
          />
        ))
      }
    </div>

  )
}

export default LocationsTileViewPage