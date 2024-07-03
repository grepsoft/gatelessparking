import Sidebar from '@/components/sidebar'
import React from 'react'

function DesktopSidebar() {
  return (
    <div className='hidden lg:block'>
      <Sidebar />
    </div>
  )
}

export default DesktopSidebar