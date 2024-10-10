'use client'

import React, { useState } from 'react'
import SearchForm from './search-form'
import { LatLng, MapAddressType, MapParams } from '@/types'
import { findNearbyLocations } from '@/actions/actions'
import { ParkingLocation } from '@/schemas/parking-locations'
import Map from './map'
import SearchResult from './search-result'

export type SearchParams = {
  address: string,
  gpscoords: LatLng,
  arrivingon: Date,
  arrivingtime: Date,
  leavingtime: Date
}

function SearchComponent() {
  const [search, setSearch] = useState<MapParams[]>([])
  const [searchRadius, setSearchRadius] = useState(500)
  const [message, setMessage] = useState("Enter an address, date, time and click search")
  const [searchParams, setSearchParams] = useState<SearchParams | undefined>()

  const handleSearchDone = async (params: SearchParams) => {
    console.log(params)

    setMessage("Searching...")
    setSearch([])
    const searchResult = await findNearbyLocations(searchRadius, params as SearchParams)

    const mapParams: MapParams[] = searchResult.map((loc: ParkingLocation) => ({
      address: loc.address,
      gpscoords: loc.gpscoords,
      price: loc.price,
      numberofspots: loc.numberofspots,
      bookedspots: loc.bookedspots,
      status: loc.status,
      type: MapAddressType.PARKINGLOCATION,
      id: loc._id
    }))

    if (mapParams.length > 0) {
      mapParams.unshift({
        address: params.address as string,
        gpscoords: params.gpscoords as LatLng,
        type: MapAddressType.DESTINATION,
        radius: searchRadius,
        id: ""
      })

      setSearch([...mapParams])
      setSearchParams(params)
    } else {
      setMessage("No nearby parking locations found.")
    }
  }

  return (
    <div className="flex-flex-col -mt-16 w-full p-4 py-10 item-start gap-x-2 rounded-2xl bg-gray-50 ring-1 ring-inset ring-gray-900/5">
        <SearchForm onSearch={handleSearchDone}/>
        {
          search.length > 0 ? 
          <div className="flex">
            <div className="p-1 flex-none w-56 overflow-auto h-[600px]">
              <SearchResult locations={search} params={searchParams as SearchParams} />
            </div>
            <div className="flex-1">
              <Map mapParams={JSON.stringify(search)} />
            </div>
          </div>
          : <p className="text-center pt-12 pb-12 text-xl sm:text-4xl text-slate-300">{message}</p>
        }
    </div>
  )
}

export default SearchComponent