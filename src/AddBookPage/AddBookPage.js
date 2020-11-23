import React, { Component } from 'react'
import GenericForm from './GenericForm/GenericForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddBookPage.css'

export default class AddBookPage extends Component {
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
    if(this.state.name.length > 0){
      if(this.state.description.length > 0){
        const newBook = {
          name: e.target['book-name'].value,
          description: e.target['book-description'].value,
          folder_id: e.target['book-folder-id'].value,
          modified: new Date(),
        }
        fetch(`${config.API_ENDPOINT}/api/books`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newBook),
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(book => {
            this.context.addBook(book)
            this.props.history.push(`/folder/${book.folder_id}`)
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
    let nameInput ='';
    let descInput='';
    if(this.state.nameError){
      nameInput =
        <div>
          <input onChange={this.handleNameChange} className='error-message' type='text' id='book-name-input' name='book-name' />
          <p>Enter a name</p>
        </div>
    } else {
      nameInput =
        <input onChange={this.handleNameChange} type='text' id='book-name-input' name='book-name' />
    }
    if(this.state.descError){
      descInput = 
      <div>
        <textarea onChange={this.handleDescriptionChange} className='error-message' id='book-description-input' name='book-description' />
        <p>Enter description</p>
      </div>
    } else {
      descInput = 
        <textarea onChange={this.handleDescriptionChange} id='book-description-input' name='book-description' />
    }
    const { folders=[] } = this.context
    return (
      <section className='AddBook'>
        <h2>Create a book</h2>
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
              Add book
            </button>
          </div>
        </GenericForm>
      </section>
    )
  }
}
