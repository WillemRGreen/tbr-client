import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AddFolderPage from './AddFolderPage'

it('renders withoout crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><AddFolderPage /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})