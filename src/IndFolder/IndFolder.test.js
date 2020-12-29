import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import IndFolder from './IndFolder'

it('renders withoout crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><IndFolder /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})