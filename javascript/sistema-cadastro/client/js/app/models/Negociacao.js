class Negociacao {

    constructor(data, quantidade, valor) {
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        //this.volume = this.quantidade * this.valor;
        Object.freeze(this);
    }

    // getVolume(){
    //     return this._quantidade * this._valor;
    // }

    get volume() {
        return this._quantidade * this._valor;
    }

    getData() {
        return new Date(this._data.getTime());
    }

    getQuantidade() {
        return this._quantidade;
    }

    getValor() {
        return this._valor;
    }

    set data(data) {
        this._data = new Date(data);
    }

    set quantidade(quantidade) {
        this._quantidade = quantidade;
    }

    set valor(valor) {
        this._valor = valor;
    }
}