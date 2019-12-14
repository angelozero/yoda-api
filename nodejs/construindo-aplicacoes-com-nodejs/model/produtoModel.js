function ProdutoModel(mongo) {
    this.mongo = mongo;
}

ProdutoModel.prototype.find = function (query, callback) {
    this.mongo.collection('produto').find(query, callback);
};

ProdutoModel.prototype.create = function (query, callback) {
    this.mongo.collection('produto').isnert(data, callback);
};

module.exports = function (mongo) {
    return new ProdutoModel(mongo);
}