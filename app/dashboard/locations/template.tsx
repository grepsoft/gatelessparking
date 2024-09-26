import React from 'react'
import AddLocationButton from './_components/add-location-button'
import LayoutSwitcher from '../_components/layout-switcher'
import { Separator } from '@/components/ui/separator'

function LocationsTemplate({
  children
}: { children: React.ReactNode}) {
  return (
    <div>
      <AddLocationButton />
      <Separator className='bg-blue-200 w-full my-4' />
      <LayoutSwitcher />
      {children}
    </div>
  )
}

export default LocationsTemplate