import React, { useState } from 'react'

import { DialogWindow } from '../../../../shared/dialog'
import { RepositoriesEditForm } from '../repositoriesEditForm/RepositoriesEditForm'

import './repositoriesList.scss'

export const RepositoryList = ({ repositories }) => {
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const onEditRepo = (itemId) => {
    const selectedItem = repositories.filter((item) => {
      return item.id === itemId
    })
    setModalOpen(true)
    setSelectedRepo(selectedItem)
  }

  const onCloseModal = function () {
    setModalOpen(false)
  }

  return (
    <div>
      <table>
        <thead>
          <tr className='t_cols'>
            <th>#</th>
            <th>Name</th>
            <th>Total Count Starts</th>
            <th>Total Count Forks</th>
          </tr>
        </thead>
        <tbody>
          {repositories.map((item, i) => (
            <tr key={item.id} className='t_cols'>
              <td>
                <button onClick={() => onEditRepo(item.id)}>{++i}</button>
              </td>
              <td>
                <a target='_blank' rel='noreferrer' href={item.url}>
                  {item.name}
                </a>
              </td>
              <td>{item.stargazers.totalCount}</td>
              <td>{item.forks.totalCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <DialogWindow onClose={onCloseModal} opened={isModalOpen}>
        <RepositoriesEditForm onCloseModal={onCloseModal} initialData={selectedRepo} />
      </DialogWindow>
    </div>
  )
}
