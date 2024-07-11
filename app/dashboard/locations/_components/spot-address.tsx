import AddressAutoCompleteInput from '@/components/address-autocomplete.input'
import { Button } from '@/components/ui/button'
import { useMySpotStore } from '@/store'
import { LatLng, ListSpotPropsType } from '@/types'
import React, { useState } from 'react'


function SpotAddress({ onNext }: ListSpotPropsType) {

    const mySpotStore = useMySpotStore()
    const [message, setMessage] = useState<string>("")

    function onSubmit() {
        if (mySpotStore.data.address) {
            onNext()
        } else {
            setMessage("Address is required")
        }
    }

    const handleAddressSelect = (address: string, gpscoords: LatLng) => {
        setMessage('')
        mySpotStore.updateState({
            address: address,
            gpscooords: gpscoords
        })
    }
  return (
    <div className="grid w-full gap-1 5">
        <h2 className="text-xl sm:text-2xl py-4 font-semibold">Address</h2>
        <AddressAutoCompleteInput onAddressSelect={handleAddressSelect} selectedAddress={mySpotStore.data.address} />
        <p className='text-red-500 text-sm'>{message}</p>
        <div className="flex justify-between py-4">
            <Button type='button' onClick={onSubmit} variant='ghost'>Next</Button>
        </div>
        
    </div>
  )
}

export default SpotAddress