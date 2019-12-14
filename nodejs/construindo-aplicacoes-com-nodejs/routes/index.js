var express = require('express')
var router = express.Router();

router.get('/', function (req, res) {
    //res.send('Ola Mundo Node JS');
    res.status(201);

    if (req.accepts('text')) {
        res.write('nome; email\n');
        res.write('Angelo; angelozero@angelozero.com\n');
        res.end();
    } else {
        res.json({ 'nome': 'Angelo', 'email': 'angelozero@angelozero.com' });
    }
});

router.use('/produto', require('./produto/produto'));

module.exports = router;
