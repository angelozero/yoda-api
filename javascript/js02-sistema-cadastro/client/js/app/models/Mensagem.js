class Mensagem {
    constructor(texto = '') {
        this._texto = texto;
    }

    getTexto() {
        return this._texto;
    }

    setTexto(texto) {
        this._texto = texto;
    }
}