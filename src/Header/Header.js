import { render } from '@testing-library/react'
import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    handleLogoutClick = () => {
      TokenService.clearAuthToken()
    }
  
    renderLogoutLink() {
      return (
        <div className='Header__logged-in'>
          <Link
            onClick={this.handleLogoutClick}
            to='/'>
            Logout
          </Link>
        </div>
      )
    }
  
    renderLoginLink() {
      return (
        <div className='Header__not-logged-in'>
          <Link
            to='/register'>
            Register
          </Link>
          
          <Link
            to='/login'>
            Log in
          </Link>
        </div>
      )
    }
  
    render() {
      return (
        <nav className='Header'>
          <h1>
            <Link to='/'>
              {' '}
              Your TBR
            </Link>
          </h1>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
      )
    }
  }
  