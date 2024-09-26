'use client'

import { deleteLocation } from '@/actions/actions'
import ConfirmationDialog from '@/components/confirmation-dialog'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState, useTransition } from 'react'

type Props = {
    id: string,
}

function LocationDeleteButton({ props }: { props: string }) {
    const { id } = JSON.parse(props) as Props
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)

    const pathname = usePathname()

    const handleConfirm = () => {
        setOpen(false)
        startTransition(async () => {
            await deleteLocation({
                id: id,
                path: pathname
            })
        })
    }
    return (
        <>
            {
                isPending ? "Deleting..." :
                    <Button variant="ghost" onClick={() => setOpen(true)}>
                        <Trash2Icon color='red' />
                    </Button>
            }

            <ConfirmationDialog 
            message='By continuing you are going to delete the location?' 
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={handleConfirm} />
        </> 
    )
}

export default LocationDeleteButton