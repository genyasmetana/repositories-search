import { useHistory } from 'react-router-dom'
import React from 'react'
import './pagination.scss'

export const Pagination = ({ pagination, pageHandler }) => {
  const history = useHistory()

  const setNewSearchPage = () => {
    pageHandler(pagination.endCursor)
    history.push({ search: `?page=${pagination.endCursor}` })
  }

  return (
    <div className='btn-wrapper'>
      <button
        className='load-more'
        disabled={!pagination.hasNextPage}
        onClick={() => setNewSearchPage()}
      >
        Load More
      </button>
    </div>
  )
}
