import React, { Component } from 'react'
import IndBook from '../IndBook/IndBook'
import './ReadItPage.css'
import ApiContext from '../ApiContext'
import { getBooksForFolder, filterBooksByCompleted, countCompletedBooks } from '../books-helpers'

export default class ReadItPage extends Component {

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
    const filteredBooks = filterBooksByCompleted(booksForFolder, true)
    const totalBooks = countCompletedBooks(filteredBooks)
        return (
            <>
                <div>
                    <h3>
                        So far, you've read {totalBooks}, congrats on your reading progress!
                    </h3>
                </div>
                <section className='Completed-Books-List'>
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
            </>
        )
    }
}