function ProdutoController(ProdutoModel) {
    this.model = ProdutoModel;
}

ProdutoController.prototype.getAll = function (req, res, nex) {
    //res.send('Coletando todos os produtos !');
    this.model.find({}, function (err, data) {
        if (err) {
            return next(err);
        }
        res.json(data);
    });
}

ProdutoController.prototype.create = function (req, res, nex) {
    //res.send('Coletando todos os produtos !');
    var body = req.body;
    this.model.create(body, function (err, data) {
        if (err) {
            return next(err);
        }
        res.json(data);
    });
}

module.exports = function (ProdutoModel) {
    return new ProdutoController(ProdutoModel);
}