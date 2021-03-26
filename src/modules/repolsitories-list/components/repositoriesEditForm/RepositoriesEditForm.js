import React from 'react'
import { ErrorMessage, Formik } from 'formik'
import { useDispatch } from 'react-redux'

import { updateRepositoryAction } from '../../actions'
import './repositoriesEditForm.scss'

export const RepositoriesEditForm = ({ initialData, onCloseModal }) => {
  const dispatch = useDispatch()
  const initialValues = { name: initialData[0].name }

  const validation = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Cant be empty'
    }
    return errors
  }

  const onSubmit = (values, { setSubmitting }) => {
    const repoData = {
      ...initialData[0],
      ...values,
    }
    dispatch(updateRepositoryAction(repoData))
    setSubmitting(false)
    onCloseModal()
  }

  return (
    <div>
      <h1>Change Repositorie Name</h1>
      <Formik initialValues={initialValues} validate={validation} onSubmit={onSubmit}>
        {({
          values,
          isValid,

          resetForm,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form className='custom-form' onSubmit={handleSubmit}>
            <div className='field-row'>
              <input
                type='text'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className='custom-form__input'
              />

              <ErrorMessage className='error' component='div' name='name' />
            </div>

            <div className='btn-wrapper'>
              <button
                className='default-btn'
                type='reset'
                onClick={() => {
                  resetForm()
                  onCloseModal()
                }}
              >
                Cancel
              </button>

              <button className='default-btn' type='submit' disabled={!isValid}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
