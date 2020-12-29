import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import GenericForm from './GenericForm'

it('renders withoout crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BrowserRouter><GenericForm /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
})