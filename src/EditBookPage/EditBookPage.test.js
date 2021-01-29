import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import EditBookPage from './EditBookPage'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><EditBookPage /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})