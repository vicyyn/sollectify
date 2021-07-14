import { useState } from 'react'
import { Search } from './Vectors'

const SearchBar = () => {
    const [search, setSearch] = useState('')

    return (
        <div className='bg-white dark:bg-dark-3 shadow-4_2 flex items-center w-full h-10 box-border rounded-2xl px-6' >
            <Search className='w-4 h-4 mr-2 dark:text-white' />
            <input
                className='bg-transparent focus:outline-none w-full font-medium text-sm dark:text-white text-dark-2 dark:placeholder-white placeholder-dark-3'
                placeholder='Search'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchBar