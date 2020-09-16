
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
}

module.exports = BookDAO