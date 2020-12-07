import React, { Component } from 'react'
import GenericForm from '../GenericForm/GenericForm'
import ApiContext from '../ApiContext'
import ApiService from '../services/api-service'
import { findBook } from '../books-helpers'
import './EditBookPage.css'



export default class EditBookPage extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  state = {
    name: '',
    description:'',
    folder_id:'',
    nameError:false,
    descError:false
  }

  handleSubmit = e => {
    e.preventDefault()
    const { bookId } = this.props.match.params;
    if(this.state.name.length > 0){
      if(this.state.description.length > 0){
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

  render() {
    const { books=[] } = this.context
    const { bookId } = this.props.match.params
    const book = findBook(books, parseInt(bookId)) || { description: '' }
    let nameInput ='';
    let descInput='';
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
    const { folders=[] } = this.context
    return (
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
            <select id='book-folder-select' name='book-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Submit Edits
            </button>
          </div>
        </GenericForm>
      </section>
    )
  }
}
