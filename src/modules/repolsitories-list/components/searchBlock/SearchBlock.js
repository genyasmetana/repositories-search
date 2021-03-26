import React, { useState } from 'react'
import { useHistory } from 'react-router'

import './searchBlock.scss'

export const SearchBlock = ({ searchValue, searchHandler, setPageHandler }) => {
  const [search, setSearch] = useState(searchValue)
  const history = useHistory()

  const onChangeHandler = (e) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    setPageHandler(null)
    searchHandler(search)
    history.push({ search: '' })
  }

  return (
    <div className='search-block'>
      <input className='search-block__input' value={search} onChange={onChangeHandler} />

      <button
        className='default-btn'
        disabled={!search}
        onClick={() => {
          onSubmit()
        }}
      >
        Search
      </button>
    </div>
  )
}
