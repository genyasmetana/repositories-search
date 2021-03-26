import React, { Fragment, useEffect, useState } from 'react'

import './dialog.scss'

export const DialogWindow = ({ opened, children, onOpen, onClose }) => {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    setOpen(opened)
  }, [opened])

  return (
    isOpen && (
      <Fragment>
        <div onClick={() => onClose()} className='dialog-backdrop'></div>
        <div className='dialog-window'>{children}</div>
      </Fragment>
    )
  )
}
