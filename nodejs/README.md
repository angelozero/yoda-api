![NodeJS](https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg)


----

### O que é NodeJs ?

O Node.js é uma plataforma, ou um ambiente de execução para códigos javascript escrita em cima da engine de Javascript do Chrome, a V8. Ele é todo baseado em eventos e suas operações são não-bloqueantes, o que lhe confere bastante eficiência e leveza.

----
#### Como atualizar a versão do Node

```javascript
// x = numero da versão
sudo n x.x.x 
```

----

### Exemplo de uma função assíncrona

```javascript
function resolverDepoisDe2Segundos(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

async function adicionar1(x) {
    console.log('ANTES DO 1')
    var a = resolverDepoisDe2Segundos(20);
    var b = resolverDepoisDe2Segundos(30);
    console.log('DEPOIS DO 1\n')
    return x + await a + await b;
}


async function adicionar2(x) {
    console.log('ANTES DO 2')
    var a = await resolverDepoisDe2Segundos(20);
    var b = await resolverDepoisDe2Segundos(30);
    console.log('DEPOIS DO 2')
    return x + a + b;
}


// adicionar1(10).then(v => {
//     console.log(v);  
// });

// adicionar1(10).then(v => {
//     console.log(v);  
// });

adicionar2(10).then(v => {
    console.log(v);
});
adicionar2(10).then(v => {
    console.log(v);
});
```

*Output método ```adicionar1()```*
```
ANTES DO 1
DEPOIS DO 1

ANTES DO 1
DEPOIS DO 1
( 2 secs ... )
60
60
```

*Output método ```adicionar2()```*
```
ANTES DO 2
ANTES DO 2
( 2 secs ... )
DEPOIS DO 2
DEPOIS DO 2
60
60
```

----

###  Criando um servidor web

Para criarmos um servidor web que consiga escutar as solicitações do cliente, podemos usar uma das bibliotecas disponíveis no Node.js, a ```http```.

O ```require()``` é uma função dentro do Node.js que importa tudo o que necessitamos.
Feito isso podemos invocar um método a partir da variável ```http``` cujo nome é ```createServer()```, que criará o servidor. 

Quando invocamos o ```createServer``` ele até cria um objeto que representa o servidor, só que não o "levanta" para escutar as solicitações feitas a partir do navegador. Para fazer isso vamos adicionar o ```var server``` que recebe o ```http.createServer```.

A partir da variável ```server```, invocamos o método server.listen(). Nele informamos exatamente a porta que queremos escutar, a porta ```3000```.

Ainda assim nada será carregado no navegador. Para que o servidor responda, precisamos passar como parâmetro para o método ´´´createServer()´´´ uma função anônima que recebe dois parâmetros, um de requisição ```req``` e um de resposta ```res```.

```javascript
var http = require('http');
var porta = 3000;
var ip = "localhost";

var server = http.createServer(function(req, res) {
    console.log("Recebendo request");
    res.writeHead(    200, {'Content-Type': 'text/html'});
    res.end('<html><body>Request recebido!</body></html>');
});

server.listen(porta, ip);

console.log("Server running at http://" + ip + ":" + porta + "/");
```

----

### Express

Info sobre [Express](http://expressjs.com/).

Express é uma biblioteca JavaScript construída sobre o módulo HTTP do Node.js, que fornece uma maneira mais simples de lidar com as requisições.

Comando inicial para criar um projeto base com express 

```javascript
$ https://expressjs.com/pt-br/starter/generator.html
```


```javascript
$ express --view=pug myapp
```

Após a criação do projeto base execute os comandos


```javascript
$ npm install
```

e

```javascript
$ npm install ejs
```

Finalizando, vá ate o arquivo app.js e insira as linhas

```javascript
app.set('view engine', 'ejs');
```

e esta para ver o servidor rodando na porta 3000


```javascript
app.listen(3000, function(){
    console.log("Servidor rodando");
});
```

Agora crie um arquivo dentro da pasta views chamado ```ìndex.ejs``` 

Altere o arquivo index.js para 

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: 'Angelo' });
});

module.exports = router;

```

E insria no ```ìndex.ejs```  as seguintes linhdas

```html
<html>
  <head><title><%= title %></title></head>
  <body>
    welcome <%= user%>
  </body>
</html>
```

[info](https://expressjs.com/pt-br/starter/generator.html)

----

### NPM

Info sobre [NPM](https://www.npmjs.com/).

NPM é o nome reduzido de Node Package Manager (Gerenciador de Pacotes do Node). A NPM é duas coisas: Primeiro, e mais importante, é um repositório online para publicação de projetos de código aberto para o Node.js; segundo, ele é um utilitário de linha de comando que interage com este repositório online, que ajuda na instalação de pacotes, gerenciamento de versão e gerenciamento de dependências.

O npm é o gerenciador de pacotes do ecosistema Node. Ele tem a função de gerenciar os projetos e pacotes javascript externos que precisemos utilizar em cada aplicação. Quando o Node é instalado, o npm também já vem por default e com certeza será muito útil em qualquer projeto desenvolvido sobre o Node, visto que é muito comum que se precise de libs externas para facilitar o desenvolvimento de certas funcionalidades. O próprio npm possui diversas bibliotecas que podem ser integradas com o Node. O npm consegue, portanto ajudar na instalação de pacotes, na execução de algumas tarefas dentro do ambiente do Node e como repositório de bibliotecas.

----


### Utilizando o Express

Começaremos importando o módulo do Express com a função ```require('express');```.

Quando importamos o Express, ele nos retornar um função não inicializada. Vamos invocar a função ```express()``` e armazenar o retorno em uma variável chamada ```app```.

Com a função invocada, o objeto que representa o Express foi criado. Agora podemos subir o servidor chamando o método listen() do objeto app. Passaremos dois parâmetros para o método, a porta que o servidor vai escutar, no caso a porta 3000 e uma função anônima. Dentro da função anônima colocaremos um console.log("servidor rodando") para mostrar que o servidor está rodando.

 - O método GET
    O método GET recebe como parâmetros o endereço que queremos atender e uma função anônima que recebe os argumentos req (request) e res (response).
    Dentro da função anônima do método get(), invocamos o método do response res.send(). No método send() passamos a reposta para o usuário, no caso, passaremos o ```<html><body><h1>Listagem de produtos</h1></body></html>``` .
    
```javascript
var express = require('express');
var app = express();

app.get('/produtos', function(req,res){
  res.send("<html><body><h1>Listagem de produtos</h1></body></html>");
});

app.listen(3000,function(){
    console.log("servidor rodando");
});
```
----

### Utilizando o EJS (Embedded JavaScript)

Após a instalação do ejs ```npm install ejs --save```, no arquivo app.js, vamos trocamos o método res.send() pelo res.render(). Passamos para o render() o caminho das páginas que ele vai renderizar, como vamos criar uma pasta "produtos" e dentro colocaremos a página "lista", passamos a string "produtos/lista".

O express se integra com os mecanismos de templates de páginas dinâmicas. Através da variável app, que guarda o objeto do Express, chamaremos o método set(). O set() é usado para definirmos variáveis para dentro do Express, que passem por todo o sistema.

O express espera uma string cujo nome é view engine. Como nós estamos utilizando um framework temos que nos adaptar as suas exigências. Assim como escrevemos view engine nós devemos passar também o nome da engine, no caso, o ejs.

Criaremos então um diretório que se chama ```views``` e dentro dele vamos criar um arquivo cujo nome será lista.ejs. Nesse arquivo nós colocaremos o código HTML da página.


```javascript
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/produtos', function(req, res){
    res.render('produtos/lista');
});

app.listen(3000, function(){
    console.log("Servidor rodando");
});
```

```html
<html>
    <body>
        <table>
            <tr>
                <td>Id</td>
                <td>Nome</td>
            </tr>
            <tr>
                <td>1</td>
                <td>Node.js e Express</td>
            </tr>
        </table>
    </body>
</html>
```
----

### Isolando as configurações do Express

Em um arquivo separado coloque as seguintes configurações: app recebendo o require do express , atribua a app a engine e o tipo da view e por fim exporte a variavel app.

```javascript
var app = require('express')();
app.set('view engine', 'ejs');

module. exports = function() {
    return app;
}

// app.js

var app = require('./config/express')();

app.get('/produtos', function(req, res){
    res.render('produtos/lista');
});


app.listen(3000, function(){
    console.log("Servidor rodando");
});
```

---

### O que é a CommonJS?

CommonJS é uma convenção para carregamentos de módulos javascript em aplicações server-side. O objeto que o node disponibiliza é o module e a função é passada para o atributo exports desse objeto.

---

### Criando uma conexão e consultando o banco de dados

A primeira coisa que precisamos é do drive do MySQL ```var mysql = require('mysql')```
Mas antes de consultar algo, precisamos conectar com o banco de dados. Através da variável ```mysql``` podemos chamar o ```método createConnection();```
O método createConnection() recebe diversos argumentos para realizar a conexão, como o servidor, o usuário, a senha e o nome do banco de dados. 
Usando o objeto ```connection``` chamamos o método ```query()``` passando como parâmetro a string ```'select * from livros'```.
Diferente de linguagens como Java, Python, Php ou Ruby, em uma consulta com sistemas externos, nós não armazenamos o resultado em uma variável. Além do parâmetro da query, precisamos passar uma função que será chamada após o término da consulta.
A função nós passamos dois parâmetros, um para erros ```err```, e outro para resultado ```results```.
Com o resultado em mãos, pegamos a variável de response ```res``` e chamamos o método ```send()``` passando o results como parâmetro.
Não podemos esquecer de fechar a conexão com o banco de dados com o ```connection.end();```. 

```javascript
module.exports = function(app){
    app.get('/produtos',function(req,res)){
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs'
        });

        connection.query('select * from produtos',function(err,results){
            res.send(results);

        });

        connection.end();
    });
}
```

---

### Isolando a criação da conexão com o banco de dados

Primeiro retiramos o require('mysql') e todo o createConnection() de código do arquivo produtos.js e colocar em outro arquivo.
Então vamos criar uma variável fora de todas as funções chamada dbConnection que recebe um require('../infra/dbConnection');. A variável connection, em vez de receber o retorno do mysql, retornamos a chamada da função dbConnection.

```javascript

// arquivo ../infra/dbConnection.js

var mysql = require('mysql');
module.exports = function(){
    return mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'casadocodigo_nodejs'
          });

}


// arquivo produtos.js com o import do sql

var dbConnection = require('../infra/dbConnection');
module.exports = function(app){
  app.get('/produtos',function(req,res)){

      var connection = dbConnection();

      connection.query('select * from produtos',function(err,results){
          res.send('produtos/lista', {lista:results});
      });

      connection.end();

  });
}

```

---

### Carregamento automático dos módulos - Usando o Express Load

Existe uma biblioteca que foi criada a partir dos desenvolvedores do Express que é a Express Load e ela realiza o carregamento automático das rotas.
O express.js deve fazer load de mais um módulo, que é o express-load, justamente para que ele faça o carregamento automático dos outros módulos que vamos adicionando ao projeto. 
Lembre que a ordem em que você carrega os módulos importa, pois as rotas precisam dos módulos da infra para funcionar. 
Além disso, um outro ponto importante é a presença do segundo parâmetro da função load(), onde passamos um json com um atributo cwd. Essa atributo indica que o express-load deve procurar arquivos para receberem os módulos carregados dentro da pasta app e não da raiz do projeto.

Alteramos também o arquivo produtos.js, visto que agora ele não precisa mais carregar o connectionFactory, mas sim passa a receber a connection a partir da variável que foi criada pelo express-load e que tem o nome do diretório raiz que informamos ao express-load.

```javascript
var express = require('express');
var load = require('express-load');

module.exports = function() {

    var app = express();
    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    load('routes',{cwd: 'app'})
        .then('infra')
        .into(app);

    return app;

}
```

```javascript
module.exports = function(app) {
    app.get("/produtos",function(req, res) {

        var connection = app.infra.connectionFactory();

        connection.query('select * from produtos', function(err, results){
            res.render('produtos/lista', {lista: results});
        });

        connection.end();

    });
}
```

---

### Middlewares
Os Middlewares são funções cujo objetivo é possibilitar a interceptação do request e adicionar verificações e comportamentos sobre eles.

Vários plugins que utilizamos na aplicação junto do express fazem uso dos middlewares. É o caso do bodyparser ou do express-validator


Middlewaere customizado para erro 404
```javascript
app.use(function(req,res,next){
    res.status(404).render('erros/404');
    next();
});

```

Middlewaere customizado para erro 500

```javascript
app.use(function(error, req,res,next){
    res.status(500).render('erros/500');
    next();
});
```

---
