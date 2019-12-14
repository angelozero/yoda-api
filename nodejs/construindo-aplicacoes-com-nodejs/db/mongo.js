var mongojs = require('mongojs');

function _connection(){
    var userName = '';
    var password = '';
    var server = 'localhost';
    var port = '21017';
    var database = 'produto';

}

var db = mongojs(_connection());
db.on('error', function(err){
    console.log('ERRO AO CONECTAR NO BANCO');
});

module.exports = db;