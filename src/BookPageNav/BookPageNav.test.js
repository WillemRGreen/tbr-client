import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BookPageNav from './BookPageNav'

it('renders withoout crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><BookPageNav /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})