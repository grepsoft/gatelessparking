import { ListIcon, MapIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function LayoutSwitcher() {
  return (
    <>
        <div className="flex justify-end space-x-2 text-blue-600 p-2">
            <Link href="/dashboard/locations/tileview" className='bg-white p-1 rounded' >
                <ListIcon />
            </Link>
            <Link href="/dashboard/locations/mapview" className='bg-white p-1 rounded' >
                <MapIcon />
            </Link>
        </div>
    </>
  )
}

export default LayoutSwitcher