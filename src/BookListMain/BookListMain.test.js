import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BookListMain from './BookListMain'

it('renders withoout crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><BookListMain /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})