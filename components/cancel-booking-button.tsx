'use client'

import { cancelBooking } from '@/actions/actions'
import { usePathname } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { Button } from './ui/button'
import { BanIcon } from 'lucide-react'
import ConfirmationDialog from './confirmation-dialog'

function CancelBookingButton({
    param
}: { param: string }) {

    const bookingid = param
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const handleCancelBooking = () => {
        setOpen(true)
    }

    const handleConfirm = () => {
        setOpen(false)
        startTransition(async () => {
            const result = await cancelBooking({ bookingid: bookingid, path: pathname })
            console.log(result)
        })
    }

    return (
        <>
            {isPending ? 'Cancelling...' :
                <Button className='w-[100px]' variant='outline' onClick={handleCancelBooking}>
                    <BanIcon className='text-red-500 mr-2 h-4 w-4' /> Cancel
                </Button>
            }
            <ConfirmationDialog
                message='By continuing you are going to cancel the booking?'
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirm} />

        </>
    )
}

export default CancelBookingButton