import { ParkingLocation, ParkingLocationModel } from '@/schemas/parking-locations'
import React from 'react'
import LocationEditForm from './location-edit-form'

async function LocationEditPage({
    params
}: { params: { locationid: string}}) {

  const location = await ParkingLocationModel.findById<ParkingLocation>(params.locationid)

  return (
    <LocationEditForm location={JSON.stringify(location)} />
  )
}

export default LocationEditPage