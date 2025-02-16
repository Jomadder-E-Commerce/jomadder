import { Input } from '@/components/ui/input'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import React from 'react'

const DynamicSearchInput = ({ searchId, ...rest }) => {
    return (
        <div className="w-60 relative group">
            <MagnifyingGlassIcon className="absolute group-focus-within:text-primary left-2 size-4 translate-y-1/2 bottom-1/2" />
            <Input
                type="text"
                placeholder="Search By Phone"
                value={searchId}
                {...rest}
                className="pl-7"
            />
        </div>
    )
}

export default DynamicSearchInput