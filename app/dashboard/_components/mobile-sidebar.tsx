import React from 'react'
import {
    Sheet,
    SheetContent,
  } from "@/components/ui/sheet"
import Sidebar from '@/components/sidebar'

function MobileSidebar({ open, setOpen} : {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className='p-0 w-[256px]'>
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar