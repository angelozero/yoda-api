class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');
        //this._listaNegociacoes = new ListaNegociacoes();

        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(),
            ['adiciona', 'esvazia'],
            model => {
                this._negociacoesView.update(model);
            });

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            model => {
                this._mensagemView.update(model);
            });
        this._mensagemView = new MensagemView($('#mensagemView'));

    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._listaNegociacoes.addNegociacao(negociacao);
        this._mensagem.setTexto('Negociação adicionada com sucesso');

        this._updateNegociacaoView(this._listaNegociacoes, this._mensagem);
        this._limpaFormulario();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.convertStringToData(this._data.value),
            this._quantidade.value,
            this._valor.value
        );
    }

    _limpaFormulario() {
        this._data.value = '';
        this._quantidade.value = 1;
        this._valor.value = 0.0;

        this._data.focus();
    }

    deletaNegociacoes() {
        this._listaNegociacoes.deletaNegociacoes();
        this._mensagem.setTexto('Negociações apagadas com sucesso');
        this._updateNegociacaoView(this._listaNegociacoes, this._mensagem);
    }

    _updateNegociacaoView(listaNegociacoes, mensagem) {
        this._negociacoesView.update(listaNegociacoes);
        this._mensagemView.update(mensagem);
    }

}