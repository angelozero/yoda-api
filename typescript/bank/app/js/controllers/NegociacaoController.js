class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacoes();
        this._negociacoesView = new NegociacoesView('#negociacoesView');
        this._inputData = document.querySelector('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputValor = document.querySelector('#valor');
        this._negociacoesView.update(this._negociacoes);
    }
    adiciona(event) {
        event.preventDefault();
        const negociacao = new Negociacao(new Date(this._inputData.value.replace(/-/g, ',')), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        this._negociacoes.push(negociacao);
        this._negociacoes.getList().length = 0;
        console.log(this._negociacoes.getList().length);
        this._negociacoes.getList().forEach(negociacao => {
            //console.log(negociacao);
        });
        this._negociacoesView.update(this._negociacoes);
    }
}
