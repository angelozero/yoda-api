class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    push(negociacao) {
        this._negociacoes.push(negociacao);
    }
    getList() {
        return Array.from(this._negociacoes);
    }
}
