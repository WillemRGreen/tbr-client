import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import BookListMain from './BookListMain/BookListMain'
import IndFolder from './IndFolder/IndFolder'
import ApiContext from './ApiContext'
import config from './config'
import './App.css'

class App extends Component {
  state = {
    books: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/books`),
      fetch(`${config.API_ENDPOINT}/api/folders`)
    ])
      .then(([booksRes, foldersRes]) => {
        if (!booksRes.ok)
          return booksRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          booksRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([books, folders]) => {
        this.setState({ books, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddBook = book => {
    this.setState({
      books: [
        ...this.state.books,
        book
      ]
    })
  }

  handleDeleteBook = bookId => {
    this.setState({
      books: this.state.books.filter(book => book.id !== bookId)
    })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={IndFolder}
          />
        )}
        <Route
          path='/book/:bookId'
          component={BookPageNav}
        />
        <Route
          path='/add-folder'
          component={BookPageNav}
        />
        <Route
          path='/add-book'
          component={BookPageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={BookListMain}
          />
        )}
        <Route
          path='/book/:bookId'
          component={BookPageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-book'
          component={AddBook}
        />
      </>
    )
  }

  render() {
    const value = {
      books: this.state.books,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addBook: this.handleAddBook,
      deleteBook: this.handleDeleteBook,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Your TBR</Link>
              {' '}
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App
