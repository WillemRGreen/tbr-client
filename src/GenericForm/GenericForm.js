import React from 'react'
import './GenericForm.css'

export default function GenericForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['generic-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}
