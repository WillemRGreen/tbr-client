import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import TokenService from '../services/token-service'
import './IndFolder.css'

export default class IndFolder extends React.Component {
  static contextType = ApiContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken()
  }

  render() {
    const { folders=[]} = this.context
    return (
      <div className='Folder item'>
        <ul className='Folder__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <Link
                className='button'
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </Link>
            </li>
          )}
        </ul>
        <div>
            <Link
                to={`/add-folder`}>
                <button 
                    className='button'>
                    Add Folder
                </button>
            </Link>
         </div>
         <div className='logout-button'>
            <Link
              onClick={this.handleLogoutClick}
              to='/'>
              Logout
            </Link>
          </div>
      </div>
    )
  }
}
