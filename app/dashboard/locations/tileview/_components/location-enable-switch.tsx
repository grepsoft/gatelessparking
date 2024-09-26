'use client'

import { toggleLocation } from '@/actions/actions'
import { Switch } from '@/components/ui/switch'
import { ParkingLocationStatus } from '@/types'
import { Loader } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useTransition } from 'react'

type SwitchProps = {
    id: string,
    name: string,
    status: string
}
function LocationToggleSwitch({ props }: { props: string }) {

    const { id, status, name } = JSON.parse(props) as SwitchProps
    const [isPending, startTransition] = useTransition()

    const pathname = usePathname()
    const active = status === ParkingLocationStatus.AVAILABLE

    const handleToggleSwitch = () => {
        startTransition(async () => {
            await toggleLocation({
                id: id, 
                path: pathname
            })
        })
    }
    return (
        <div className={`flex justify-between ${active ? 'text-green-500' : 'text-gray-200'}`}>
            {name}
            {
                isPending ? <Loader /> : <Switch checked={active} onClick={handleToggleSwitch} />
            }
        </div>
    )
}

export default LocationToggleSwitch