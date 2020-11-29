import React from 'react'
import Book from '../IndBook/IndBook'
import ApiContext from '../ApiContext'
import { findBook } from '../books-helpers'
import './BookPage.css'

export default class BookPageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteBook = bookId => {
    this.props.history.push(`/`)
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
          {book.description.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}
