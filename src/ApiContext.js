import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  user_name: '',
  addFolder: () => {},
  addBook: () => {},
  deleteBook: () => {},
  changeUsername: () => {}
})
