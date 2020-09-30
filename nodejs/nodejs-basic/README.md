# Sobre Node JS

- Orientado a eventos
    - Uma forma do JavasScript de implementar nativamente o desing pattern Observer, que diz que um objeto(Subject) contém uma lista de dependências (Observers) e os notifica automaticamente quando alguma mudança de estado ocorre.

- Orientado a objetos
    - A herança no JavaScript é baseada em prototype, e os objetos podem tanto ser feitos a partir de uma funcção construtora quanto a partir de um JSON.

- Programação funcional
    - Closures: Mebros privados
    - Callback: Uma função passada como parâmetro para outra função.
    - Curryign: Técnica que transforma uma função com n argumentos em outra com menos ou mais simples.

- Setando a variavel de ambiente no terminal do Node
    - No terminal digite
        -  NODE_ENV=development
        -  echo $NODE_ENV --- deve exibir development

- Executando docker
    docker pull mongo
    docker images
    docker run --name mongo-js -p 27017:27017 -d mongo


    // para acessar o mongo
    docker exec -it mongo-js mongo admin

- Middlewares
  - Middleware é todo o tipo de função que está entre um pedido HTTP e a resposta final que o servidor envia de volta para o cliente. Por exemplo, usando Express.js, um pedido POST simples teria esta código:
  ```javascript
      app.post('/books', function (req, res) {
      console.log(req.body)
      res.send(" OK ")
    });
  ```
  - A resposta no console seria algo do tipo:
  ```shell
    { id: '', titulo: 'titulo teste', preco: '105.00', descricao: 'uma descricao teste' }
  ```
- Para configurar 
  ```javascript

    // npm install body-parser

    const bodyParsers  = require('body-parser')

    const app = express();

    app.use(bodyParsers.urlencoded({
      extended: true
    }))
  ```