import React, { useCallback, useMemo } from 'react'
import { debounce } from 'lodash'

type SearchProps = {
    setSearchQuery: (q: string) => void
}

const Search: React.FC<SearchProps> = ({ setSearchQuery }) => {
    const changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            setSearchQuery(event.target.value)
        }
    }, [setSearchQuery])

    const debouncedChangeHandler = useMemo(() => debounce(changeHandler , 500), [changeHandler])

    return (
        <input
            className='w-full h-12 p-4 border-2 border-gray-300 rounded-lg'
            onChange={debouncedChangeHandler} 
            type="text" 
            placeholder="Start typing to search for GIFs..."
        />
    )
}

export { Search }