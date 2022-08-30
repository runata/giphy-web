import React, { useCallback, useEffect, useState } from 'react'
import { Search } from './components'
import { Paginate } from './components/Paginate'
import { Pagination } from './types'

const API_KEY = '1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq'
const API_URL = 'https://api.giphy.com/v1/stickers/search'
const RATING = 'g'
const LIMIT = 3

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [offset, setOffset] = useState(0);
  const [pagination, setPagination] = useState<Pagination>()

  const fetchImages = useCallback(async (offset: number = 0) => {
    try {
      const response = await fetch(`${API_URL}?q=${searchQuery}&api_key=${API_KEY}&rating=${RATING}&limit=${LIMIT}&offset=${offset}`)
      const result = await response.json()
      setImages(result.data.map((sticker: any) => sticker.images.downsized_medium.url))
      setPagination(result.pagination)
    } catch (err) {
        alert(`Oops! Something went wrong.\n ${err}`)
    }
  }, [searchQuery])

  const handleQueryChange = (q: string) => {
    setSearchQuery(q)
    setOffset(0)
  }

  useEffect(() => {
    fetchImages(offset)
  }, [fetchImages, offset])

  return (
    <div className='w-full h-screen flex flex-col p-4 sm:p-12 items-center justify-between'>
      <div className='w-full sm:w-1/2'>
        <Search setSearchQuery={handleQueryChange} />
      </div>
      <div className='w-full flex flex-col sm:flex-row my-4 sm:my-12 justify-self-stretch justify-evenly'>{images.map((image) => (<img key={image} src={image} />))}</div>
      <div className='w-full sm:w-1/2'>
        <Paginate itemsPerPage={LIMIT} totalCount={pagination?.total_count} offset={offset} setOffset={setOffset} />
      </div>
    </div>
  )
}

export default App
