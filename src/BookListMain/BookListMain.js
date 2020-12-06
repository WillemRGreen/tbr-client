import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import IndBook from '../IndBook/IndBook'
import ApiContext from '../ApiContext'
import { filterBooksByCompleted, getBooksForFolder } from '../books-helpers'
import './BookListMain.css'

export default class BookListMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { books=[] } = this.context
    const booksForFolder = getBooksForFolder(books, parseInt(folderId))
    const filteredBooks = filterBooksByCompleted(booksForFolder, false)
    return (
      <section className='BookListMain'>
        <div>
            <Link
                to={`/add-book`}>
                <button 
                    className='add-book-button'>
                    Add Book
                </button>
            </Link>
            <Link
                to={`/completed`}>
                <button 
                    className='completed-link'>
                    Read-it Page
                </button>
            </Link>
        </div>
        <ul>
          {filteredBooks.map(book => 
              <li key={book.id}>
              <IndBook
                id={book.id}
                name={book.name}
                modified={book.modified}
              />
            </li>
          )}
        </ul>
      </section>
    )
  }
}
