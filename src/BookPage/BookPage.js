import React from 'react'
import Book from '../IndBook/IndBook'
import ApiContext from '../ApiContext'
import { findBook } from '../books-helpers'
import ApiService from '../services/api-service'
import './BookPage.css'

export default class BookPageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteBook = e => {
    e.preventDefault()
    const { bookId } = this.props.match.params
    ApiService.deleteBook(bookId)
    .then(book => {
      this.context.deleteBook(book)
      this.props.history.push(`/`)
    })
    .catch(error => {
      console.error({ error })
    })
  }

  render() {
    const { books=[] } = this.context
    const { bookId } = this.props.match.params
    const book = findBook(books, parseInt(bookId)) || { description: '' }
    return (
      <section className='BookPage'>
        <Book
          id={book.id}
          name={book.name}
          modified={book.modified}
          onDeleteBook={this.handleDeleteBook}
        />
        <div className='BookPage__content'>
          Your description:
          {book.description.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
        <button 
          className='Delete-Book' 
          type='button' 
          onClick={this.handleDeleteBook}
        >
            Delete Book
        </button>
      </section>
    )
  }
}
