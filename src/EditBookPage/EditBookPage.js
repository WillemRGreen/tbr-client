import React, { Component } from 'react'
import GenericForm from '../GenericForm/GenericForm'
import ApiContext from '../ApiContext'
import ApiService from '../services/api-service'
import { findBook, findFolder } from '../books-helpers'
import './EditBookPage.css'



export default class EditBookPage extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  state = {
    book: {},
    name: '',
    description:'',
    folder_id:'',
    nameError:false,
    descError:false,
    folderError: false
  }

  componentDidMount() {
    const { books=[] } = this.context
    const { bookId } = this.props.match.params
    if(bookId){
      const book = findBook(books, parseInt(bookId)) || { description: '' }
    this.setState({ name: book.name, description: book.description, folder_id: book.folder_id.toString()})
    }
  }

  handleBookRetrieve() {
    const { bookId } = this.props.match.params
    ApiService.getBook(bookId)
    .then((book) => {
      this.setState({ book })
    })
    .catch(error => {
      console.error({ error })
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { bookId } = this.props.match.params;
    if(this.state.name.length > 0){
      if(this.state.description.length > 0){
        if(this.state.folder_id.length > 0){
          const newBook = {
            name: e.target['book-name'].value,
            description: e.target['book-description'].value,
            folder_id: e.target['book-folder-id'].value
          }
            ApiService.patchBook(bookId, newBook)
            .then(book => {
              this.context.addBook(bookId, book)
              this.props.history.push('/')
            })
            .catch(error => {
              console.error({ error })
            })
        } else {
          this.setState({ folderError: true })
        }
      } else {
        this.setState({descError:true})
      }
    } else {
      this.setState({nameError:true})
    }
    
  }

  handleNameChange = (e) => {
    this.setState({name:e.currentTarget.value})
  }

  handleDescriptionChange = (e) => {
    this.setState({description:e.currentTarget.value})
  }

  handleFolderIdChange = (e) => {
    this.setState({folder_id:e.currentTarget.value})
  }

  render() {
    let { books=[] } = this.context
    let { bookId } = this.props.match.params
    let folder = {}
    let book = {}
    let folders = {}
    if(bookId){
      folders = this.context.folders
      book = findBook(books, parseInt(bookId)) || { description: '' }
      folder = findFolder(folders, parseInt(book.folder_id))
    } 
    let nameInput = '';
    let descInput = '';
    let optionInput = '';
    let inputForPage = <div></div>;
    if(bookId){
      if(this.state.nameError){
        nameInput =
          <div>
            <input onChange={this.handleNameChange} defaultValue={book.name} className='error-message' type='text' id='book-name-input' name='book-name' />
            <p className='error-message'>Enter a name</p>
          </div>
      } else {
        nameInput =
          <input onChange={this.handleNameChange} defaultValue={book.name} type='text' id='book-name-input' name='book-name' />
      }
      if(this.state.descError){
        descInput = 
        <div>
          <textarea onChange={this.handleDescriptionChange} defaultValue={book.description} className='error-message' id='book-description-input' name='book-description' />
          <p className='error-message'>Enter description</p>
        </div>
      } else {
        descInput = 
          <textarea onChange={this.handleDescriptionChange} defaultValue={book.description} id='book-description-input' name='book-description' />
      }
      if(this.state.folderError){
        optionInput = 
        <div>
          <select id='book-folder-select' onChange={this.handleFolderIdChange} name='book-folder-id'>
            <option key={folder.id} value={folder.id}>{folder.name}</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
          </select>
        <p className='error-message'>Select a folder</p>
        </div>
          } else {
            optionInput = 
            <select id='book-folder-select' onChange={this.handleFolderIdChange} name='book-folder-id'>
            <option key={folder.id} value={folder.id}>{folder.name}</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
          </select>
          }
    } 
    if(bookId){
      inputForPage = 
      <section className='AddBook'>
        <h2>Edit Book</h2>
        <GenericForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='book-name-input'>
              Name
            </label>
            {nameInput}
          </div>
          <div className='field'>
            <label htmlFor='book-description-input'>
              Description
            </label>
            {descInput}
          </div>
          <div className='field'>
            <label htmlFor='book-folder-select'>
              Folder
            </label>
            {optionInput}
          </div>
          <div className='buttons'>
            <button type='submit'>
              Submit Edits
            </button>
          </div>
        </GenericForm>
      </section>
    } else {
      inputForPage = <div>Could not retrieve folder</div>
    }
    
    return (
      <div>
        {inputForPage.props.children}
      </div>
      
    )
  }
}
