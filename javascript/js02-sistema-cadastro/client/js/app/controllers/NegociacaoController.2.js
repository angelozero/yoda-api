'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia');

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto');
    }

    _createClass(NegociacaoController, [{
        key: 'adiciona',
        value: function adiciona(event) {
            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._listaNegociacoes.addNegociacao(negociacao);
            this._mensagem.setTexto('Negociação adicionada com sucesso');

            this._updateNegociacaoView(this._listaNegociacoes, this._mensagem);
            this._limpaFormulario();
        }
    }, {
        key: 'deletaNegociacoes',
        value: function deletaNegociacoes() {
            this._listaNegociacoes.deletaNegociacoes();
            this._mensagem.setTexto('Negociações apagadas com sucesso');
            this._updateNegociacaoView(this._listaNegociacoes, this._mensagem);
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this = this;

            var service = new NegociacaoService();

            Promise.all([service.obterNegociacoesDaSemana(), service.obterNegociacoesDaSemanaRetrasada(), service.obterNegociacoesDaSemanaAnterior()]).then(function (result) {
                result.forEach(function (negociacaoList) {
                    negociacaoList.forEach(function (negociacao) {
                        return _this._listaNegociacoes.addNegociacao(negociacao);
                    });
                });
                _this._mensagem.setTexto('Negociações importadas com sucesso');
                _this._updateNegociacaoView(_this._listaNegociacoes, _this._mensagem);
            }).catch(function (erro) {
                _this._mensagem.setTexto(erro);
                _this._updateNegociacaoView(_this._listaNegociacoes, _this._mensagem);
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
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.convertStringToData(this._data.value), this._quantidade.value, this._valor.value);
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._data.value = '';
            this._quantidade.value = 1;
            this._valor.value = 0.0;

            this._data.focus();
        }
    }, {
        key: '_updateNegociacaoView',
        value: function _updateNegociacaoView(listaNegociacoes, mensagem) {
            this._negociacoesView.update(listaNegociacoes);
            this._mensagemView.update(mensagem);
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.2.js.map