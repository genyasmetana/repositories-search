import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { searchRepositoriesListAction } from './actions'
import { Pagination } from '../../shared/pagination'
import { RepositoryList } from './components/repositoriesList/RepositoriesList'
import { SearchBlock } from './components/searchBlock/SearchBlock'

import './repositorieListPage.scss'

export const RepositorieListPage = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(null)
  const [search, setSearch] = useState('language:react stars:>1000')

  useEffect(() => {
    dispatch(searchRepositoriesListAction(search, page))
  }, [dispatch, search, page])

  const repositoriesListData = useSelector((state) => {
    return state.repositoriesList
  })

  return (
    <div>
      <SearchBlock searchValue={search} searchHandler={setSearch} setPageHandler={setPage} />

      {repositoriesListData.loading ? (
        <div className='spinner-wrapper'>
          <div className='spinner-wrapper__item' />
        </div>
      ) : (
        <div className='repository-wrapper'>
          <RepositoryList repositories={repositoriesListData.data.nodes} />
          <Pagination pagination={repositoriesListData.data.pageInfo} pageHandler={setPage} />
        </div>
      )}
    </div>
  )
}
