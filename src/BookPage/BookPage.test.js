import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BookPageMain from './BookPage'

it('renders withoout crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><BookPageMain /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})