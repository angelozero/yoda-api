class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }


    addNegociacao(negociacao) {
        this._negociacoes.push(negociacao);
    }

    getNegociacoes() {
        return [].concat(this._negociacoes);
    }
}