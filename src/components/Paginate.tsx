import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const MAX_OFFSET = 4999

type PaginateProps = {
    itemsPerPage: number,
    offset: number,
    setOffset: (offset: number) => void,
    totalCount?: number
}

const Paginate: React.FC<PaginateProps> = ({ itemsPerPage, offset, setOffset, totalCount = 3 }) => {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.min(Math.ceil(totalCount / itemsPerPage), MAX_OFFSET / itemsPerPage));
  }, [itemsPerPage, offset, totalCount]);

  const handlePageClick = (event: any) => {
    const newOffset = Math.min((event.selected * itemsPerPage) % totalCount, MAX_OFFSET)
    setOffset(newOffset);
  };

  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        className='w-full flex flex-row justify-between'
        activeLinkClassName='bg-gray-300 rounded-full px-2 py-1 text-gray-800'
        renderOnZeroPageCount={() => null}
    />
  );
}

export { Paginate };