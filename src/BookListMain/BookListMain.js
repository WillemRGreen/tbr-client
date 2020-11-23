import React from 'react'
import { Link } from 'react-router-dom'
import IndBook from '../IndBook/IndBook'
import ApiContext from '../ApiContext'
import { getBooksForFolder } from '../books-helpers'
import './BookListMain.css'

export default class BookListMain extends React.Component {
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
    return (
      <section className='BookListMain'>
        <ul>
          {booksForFolder.map(book =>
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
