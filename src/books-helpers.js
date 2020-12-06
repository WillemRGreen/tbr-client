
export const findFolder = (folders=[], folder_id) =>
folders.find(folder => folder.id === folder_id)

export const findBook = (books=[], bookId) =>
books.find(book => book.id === bookId)

export const getBooksForFolder = (books=[], folderId) => (
(!folderId)
  ? books
  : books.filter(book => book.folder_id === folderId)
)

export const filterBooksByCompleted = (books=[], bool) => (
  books.filter(book => book.completed === bool
  )
)

export const countCompletedBooks = (books=[]) => {
  let bookCount = 0;
  for(let i = 0; i < books.length; i++){
    bookCount++
  }
  if(bookCount === 1) {
    return `${bookCount} book`
  } else return `${bookCount} books`
}