
class BookDAO {

  constructor(db) {
    this._db = db;
  }

  listAll() {
    return new Promise((resolve, reject) => {
      this._db.all('SELECT * FROM books',
        (err, result) => {
          if (err) {
            return reject('Erro ao listar os livros ' + err)
          }
          return resolve(result)
        })
    })
  }

  save(book) {
    return new Promise((resolve, reject) => {
      this._db.run(`INSERT INTO books 
                    ( title, price, description ) 
                    values (?, ?, ?)`,
        [
          book.title,
          book.price,
          book.description
        ], (err) => {
          if (err) {
            return eject('Erro ao salvar o livro ' + err)
          }
          resolve()
        })
    })
  }
}

module.exports = BookDAO