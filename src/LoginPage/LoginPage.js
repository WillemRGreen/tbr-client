import React, { Component } from 'react'
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import GenericForm from '../GenericForm/GenericForm'
import ApiContext from '../ApiContext'

export default class LoginPage extends Component {
    static defaultProps = {

    }

    state = { error:null}

    static contextType = ApiContext

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'
        history.push(destination)
        this.context.loggedIn()
      }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target
    
        AuthApiService.postLogin({
          user_name: user_name.value,
          password: password.value,
        })
          .then(res => {
            user_name.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.handleLoginSuccess()
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
      }

    render(){
        const { error } = this.state
        return (
            <GenericForm 
                className='login-form'
                onSubmit={this.handleSubmitJwtAuth}>

                <div>
                    {error && <p className = 'red'>{error}</p>}
                </div>
                <div className='user_name'>
                <label htmlFor='LoginForm__user_name'>
                    User name
                </label>
                <input
                    required
                    name='user_name'
                    id='LoginForm__user_name'>
                </input>
                </div>
                <div className='password'>
                <label htmlFor='LoginForm__password'>
                    Password
                </label>
                <input
                    required
                    name='password'
                    type='password'
                    id='LoginForm__password'>
                </input>
                </div>
                <button type='submit'>
                    Login
                </button>    
            </GenericForm>
            
        )
    }
}