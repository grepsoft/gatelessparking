'use client'

import React from 'react'
import SearchForm from './search-form'

function SearchComponent() {
  return (
    <div className="flex-flex-col -mt-16 w-full p-4 py-10 item-start gap-x-2 rounded-2xl bg-gray-50 ring-1 ring-inset ring-gray-900/5">
        <SearchForm />
    </div>
  )
}

export default SearchComponent