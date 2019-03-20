// Parte WEB
var express = require('express');

// Para requisições alem de GET e POST
var methodOverride = require('method-override');

// Conversão automatica de json
var bodyParser = require('body-parser');

/********************************************************/

var app = express();

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

// Usando CORS -> compartilhamento de recursos entre origens diferentes
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-type, Accept");
    next();

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usando um Middleware
app.use(function (req, res, next) {
    if (req.url === '/favicon.ico') {
        console.log('req para favicon');
        response.writeHead(200, { 'Content-Type': 'image/x-icon' });
        response.end();
    } else {
        console.log('req sem favicon')
        next();
    }
});

app.use('/', require('./routes'));


// Tratando Erros
app.use(function (req, res, next) {
    var err = new Error('Não encontrado');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    console.log('ERRO NA REQUISICAO: ' + err.stack);
    response.status(err.status || 500).json({err: err.message});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Servidor rodando em: //%s:%s', host, port);
});

