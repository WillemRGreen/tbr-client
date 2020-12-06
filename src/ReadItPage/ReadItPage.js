import React, { Component } from 'react'
import IndBook from '../IndBook/IndBook'
import ApiService from '../services/api-service'
import './ReadItPage.css'

export default class ReadItPage extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        ApiService.getCompletedBooks()
            .then((books) => {
                this.setState({ books })
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const books = this.state.books;
        return (
            <section className='Completed-Books-List'>
                <ul>
                {books.map(book =>
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