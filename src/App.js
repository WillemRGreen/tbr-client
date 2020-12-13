import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './Header/Header'
import PrivateRoute from './Utils/PrivateRoute'
import PublicOnlyRoute from './Utils/PublicOnlyRoute'
import LoginPage from './LoginPage/LoginPage'
import RegistrationPage from './RegistrationPage/RegistrationPage'
import LandingPage from './LandingPage/LandingPage'
import ReadItPage from './ReadItPage/ReadItPage'
import EditBookPage from './EditBookPage/EditBookPage'
import BookListMain from './BookListMain/BookListMain'
import IndFolder from './IndFolder/IndFolder'
import ApiService from './services/api-service'
import AddBookPage from './AddBookPage/AddBookPage'
import AddFolderPage from './AddFolderPage/AddFolderPage'
import BookPage from './BookPage/BookPage'
import ApiContext from './ApiContext'
import './App.css'

class App extends Component {
  state = {
    books: [],
    folders: []
  };

  componentDidMount() {
    ApiService.getFolders()
      .then((folders) => {
        this.setState({ folders })
      })
      .catch(error => {
        console.error({ error })
      })
    ApiService.getBooks()
      .then((books) => {
        this.setState({ books })
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

  handleLoggedIn = e => {
    console.log('this worked')
      ApiService.getFolders()
        .then((folders) => {
          this.setState({ folders })
        })
        .catch(error => {
          console.error({ error })
        })
      ApiService.getBooks()
        .then((books) => {
          this.setState({ books })
        })
        .catch(error => {
          console.error({ error })
        })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <PrivateRoute
            exact
            key={path}
            path={path}
            component={IndFolder}
          />
        )}
        <PublicOnlyRoute
          path={'/login'}
          component={LoginPage}
        />
        <PublicOnlyRoute
          path={'/register'}
          component={RegistrationPage}
        />
        <Route 
          path={'/landing-page'}
          component={LandingPage}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <PrivateRoute
            exact
            key={path}
            path={path}
            component={BookListMain}
          />
        )}
        <PrivateRoute
          path='/completed'
          component={ReadItPage} 
        />
        <PrivateRoute
          path='/edit/:bookId'
          component={EditBookPage} 
        />
        <PrivateRoute
          path='/book/:bookId'
          component={BookPage}
        />
        <PrivateRoute
          path='/add-folder'
          component={AddFolderPage}
        />
        <PrivateRoute
          path='/add-book'
          component={AddBookPage}
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
      loggedIn: this.handleLoggedIn
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
        <header className='App__header'>
            <Header />
          </header>
          <div className='group'>
            <nav className='App__nav'>
              {this.renderNavRoutes()}
            </nav>
            <main className='App__main'>
              {this.renderMainRoutes()}
            </main>
          </div>
          
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App
