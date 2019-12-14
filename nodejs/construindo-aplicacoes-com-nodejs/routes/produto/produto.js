var express = require('express')
var router = express.Router();
var produtoController = require('../../controllers/produtoController');

router.get('/', produtoController.getAll);

// router.post('/', function(req, resp){
//     resp.send('Salvando os produtos');
// });

module.exports = router;