import React, { Component } from 'react'
import TokenService from '../services/token-service'
import { Link } from 'react-router-dom'
import './Header.css'

export default class Header extends Component {
    handleLogoutClick = () => {
      TokenService.clearAuthToken()
    }
  
    renderLogoutLink() {
      return (
        <div className='Header_logged-in'>
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
        undefined
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
  