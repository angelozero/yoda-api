module.exports = (app) => {

  const listTemplate = require('../views/books/list/list.marko')


  app.get('/', function (req, res) {
    res.marko(listTemplate,
      {
        books: [
          { id: 1, title: 'Hello World 1 - Node' },
          { id: 2, title: 'Hello World 2 - Node' }
        ]
      }
    )
  });
}

