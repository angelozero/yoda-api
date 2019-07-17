class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');


        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            this._negociacoesView,
            'adiciona', 'esvazia');


        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(
            new Mensagem(),
            this._mensagemView,
            'texto');
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._listaNegociacoes.addNegociacao(negociacao);
        this._mensagem.setTexto('Negociação adicionada com sucesso');

        this._updateNegociacaoView(this._listaNegociacoes, this._mensagem);
        this._limpaFormulario();
    }

    deletaNegociacoes() {
        this._listaNegociacoes.deletaNegociacoes();
        this._mensagem.setTexto('Negociações apagadas com sucesso');
        this._updateNegociacaoView(this._listaNegociacoes, this._mensagem);
    }

    importaNegociacoes() {

        let service = new NegociacaoService();

        Promise.all(
            [service.obterNegociacoesDaSemana(),
            service.obterNegociacoesDaSemanaRetrasada(),
            service.obterNegociacoesDaSemanaAnterior()]
        
        ).then((result) => {
            result.forEach(negociacaoList => {
                negociacaoList.forEach(negociacao =>  
                    this._listaNegociacoes.addNegociacao(negociacao))
            })
            this._mensagem.setTexto('Negociações importadas com sucesso');
            this._updateNegociacaoView(this._listaNegociacoes, this._mensagem)

        }).catch((erro) => {
            this._mensagem.setTexto(erro);
            this._updateNegociacaoView(this._listaNegociacoes, this._mensagem)
            return;
        });

        /*
            service.obterNegociacoesDaSemana()
                .then((result) => {
                    result.forEach(negociacao => this._listaNegociacoes.addNegociacao(negociacao))
                    this._mensagem.setTexto('Negociações importadas com sucesso');
                    this._updateNegociacaoView(this._listaNegociacoes, this._mensagem)
                })
                .catch((erro) => {
                    this._mensagem.setTexto(erro);
                    this._updateNegociacaoView(this._listaNegociacoes, this._mensagem)
                    return;
                });
    
            service.obterNegociacoesDaSemanaRetrasada()
                .then((result) => {
                    result.forEach(negociacao => this._listaNegociacoes.addNegociacao(negociacao))
                    this._mensagem.setTexto('Negociações importadas com sucesso');
                    this._updateNegociacaoView(this._listaNegociacoes, this._mensagem)
                })
                .catch((erro) => {
                    this._mensagem.setTexto(erro);
                    this._updateNegociacaoView(this._listaNegociacoes, this._mensagem)
                    return;
                });
    
            service.obterNegociacoesDaSemanaAnterior()
                .then((result) => {
                    result.forEach(negociacao => this._listaNegociacoes.addNegociacao(negociacao))
                    this._mensagem.setTexto('Negociações importadas com sucesso');
                    this._updateNegociacaoView(this._listaNegociacoes, this._mensagem)
                })
                .catch((erro) => {
                    this._mensagem.setTexto(erro);
                    this._updateNegociacaoView(this._listaNegociacoes, this._mensagem)
                    return;
                });
            */
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
    _updateNegociacaoView(listaNegociacoes, mensagem) {
        this._negociacoesView.update(listaNegociacoes);
        this._mensagemView.update(mensagem);
    }
}