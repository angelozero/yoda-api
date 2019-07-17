'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        var _this = this;

        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');
        //this._listaNegociacoes = new ListaNegociacoes();

        this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes(), ['adiciona', 'esvazia'], function (model) {
            _this._negociacoesView.update(model);
        });

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], function (model) {
            _this._mensagemView.update(model);
        });
        this._mensagemView = new MensagemView($('#mensagemView'));
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
        key: 'deletaNegociacoes',
        value: function deletaNegociacoes() {
            this._listaNegociacoes.deletaNegociacoes();
            this._mensagem.setTexto('Negociações apagadas com sucesso');
            this._updateNegociacaoView(this._listaNegociacoes, this._mensagem);
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
//# sourceMappingURL=NegociacaoController.1.js.map