import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import { findBook, findFolder } from '../books-helpers'
import './BookPageNav.css'

export default class BookPageNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { books, folders, } = this.context
    const { bookId } = this.props.match.params
    const book = findBook(books, bookId) || {}
    const folder = findFolder(folders, book.folder_id)
    return (
      <div className='BookPageNav'>
        <button
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='BookPageNav__back-button'
        >
          <br />
          Back
        </button>
        {folder && (
          <h3 className='BookPageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}
