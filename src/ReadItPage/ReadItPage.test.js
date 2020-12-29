import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ReadItPage from './ReadItPage'

it('renders withoout crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><ReadItPage /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})