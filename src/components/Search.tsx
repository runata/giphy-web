import React, { useMemo } from 'react'
import { debounce } from 'lodash'

type SearchProps = {
}

const Search: React.FC<SearchProps> = () => {    
    const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const q = event.target.value
        console.log(q)
    }

    const debouncedChangeHandler = useMemo(() => debounce(changeHandler , 500), [])

    return (
        <div>
            <input 
                onChange={debouncedChangeHandler} 
                type="text" 
                placeholder="Type to search for images..."
            />
        </div>
    )
}

export { Search }