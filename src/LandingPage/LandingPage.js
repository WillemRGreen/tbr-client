import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

export default class LandingPage extends Component {
  render() {
    return (
      <div className='LandingPage'>
        <div>
          <h2>Welcome to your TBR!</h2>
          <p>Your TBR is an app designed to help you organize your reading life and track progress on your reading accomplishments. Every time you think: "I've really been meaning to read more of that author" just add their book to Your TBR and you won't forget next time you need something to read. And when you're finished, just mark it as 'read', and when you want to look back at everything you've been reading  , just check your 'read it' page.</p>
          <p>Click the register button below and set a username and password to get reading!</p>
        </div>
        <div className='group2'>
          <Link to={'/register'}>
            <button className='button'>
                Register
            </button>
          </Link>

          <Link to={'/login'}>
            <button className='button'>
                Login
            </button>
          </Link>
        </div>
        
      </div>
    )
  }
}
