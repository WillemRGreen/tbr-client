import React, { Component } from 'react'
import GenericForm from '../GenericForm/GenericForm'
import AuthApiService from '../services/auth-api-service'

export default class RegistrationPage extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { full_name, user_name, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      full_name: full_name.value,
    })
    .then(user => {
        this.setState({user_name: user_name})
    })
      .then(user => {
        full_name.value = ''
        user_name.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <GenericForm
        className='RegistrationPage'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='full_name'>
          <label htmlFor='RegistrationPage__full_name'>
            Full name
          </label>
          <input
            name='full_name'
            type='text'
            required
            id='RegistrationPage__full_name'>
          </input>
        </div>
        <div className='user_name'>
          <label htmlFor='RegistrationPage__user_name'>
            User name
          </label>
          <input
            name='user_name'
            type='text'
            required
            id='RegistrationPage__user_name'>
          </input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationPage__password'>
            Password
          </label>
          <input
            name='password'
            type='password'
            required
            id='RegistrationPage__password'>
          </input>
        </div>
        <button type='submit'>
          Register
        </button>
      </GenericForm>
    )
  }
}
