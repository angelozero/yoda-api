
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

  findById(id) {
    return new Promise((resolve, reject) => {
      this._db.all('SELECT * FROM books WHERE id=?', id,
        (err, result) => {
          if (err) {
            return reject('Erro ao encontrar o livro ' + err)
          }
          return resolve(result[0])
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

  update(book) {
    return new Promise((resolve, reject) => {
      this._db.run(`UPDATE books 
                      SET title = ?, price = ?, description = ? 
                    WHERE 
                      id = ? `,
        [
          book.title,
          book.price,
          book.description,
          book.id
        ],
        (err) => {
          if (err) {
            return reject('Erro ao atualizar o livro ' + err)
          }
          resolve()
        })
    })
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(`DELETE FROM books WHERE id=?`, id,
        (err) => {
          if (err) {
            return eject('Erro ao salvar o livro ' + err)
          }
          resolve()
        })
    })
  }
}

module.exports = BookDAO