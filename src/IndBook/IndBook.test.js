import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import IndBook from './IndBook'

it('renders withoout crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><IndBook /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})