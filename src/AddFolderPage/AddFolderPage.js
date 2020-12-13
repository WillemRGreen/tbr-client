import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import ApiService from '../services/api-service'
import GenericForm from '../GenericForm/GenericForm'
import './AddFolderPage.css'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  state = {
    name: '',
    error: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if(this.state.name.length > 0){
      const folder = {
        name: e.target['folder-name'].value
      }
      ApiService.postFolder(folder.name)
        .then(folder => {
          this.context.addFolder(folder)
          this.context.loggedIn()
          this.props.history.push(`/folder/${folder.id}`)
        })
        .catch(error => {
          console.error({ error })
        })
    } else {
      this.setState({error: true})
    }
    
  }

  handleNameChange = e => {
    e.preventDefault()
    this.setState({name:e.currentTarget.value})
  }

  render() {
    let input = '';
    if(this.state.error){
      input =
      <div>
        <input onChange={this.handleNameChange} className = 'error-message' type='text' id='folder-name-input' name='folder-name' />
        <p className='lighter'>Folder must have a name</p>
      </div>
    } else { 
      input = 
        <input onChange={this.handleNameChange} type='text' id='folder-name-input' name='folder-name' />
    }
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <GenericForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            {input}
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </GenericForm>
      </section>
    )
  }
}
