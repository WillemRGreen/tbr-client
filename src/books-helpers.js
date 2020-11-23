
export const findFolder = (folders=[], folder_id) =>
folders.find(folder => folder.id === folder_id)

export const findBook = (books=[], bookId) =>
books.find(book => book.id === bookId)

export const getBooksForFolder = (books=[], folderId) => (
(!folderId)
  ? books
  : books.filter(book => book.folder_id === folderId)
)