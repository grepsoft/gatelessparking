'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import AddLocationDialog from './add-location-dialog'

function AddLocationButton() {
    const [open, setOpen] = useState(false)
  return (
    <div>
        <div className="flex flex-col">
            <Button className='self-end' onClick={() => setOpen(true)}>
                <PlusIcon className='mr-2' />Add Location
            </Button>
            {/* location add dialog */}
            <AddLocationDialog open={open} setOpen={setOpen} />
        </div>
    </div>
  )
}

export default AddLocationButton