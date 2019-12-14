System.register(["../views/index", "../models/index", "../enums/index", "../helpers/decorators/index", "../service/NegociacaoService"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var index_1, index_2, index_3, index_4, NegociacaoService_1, NegociacaoController;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (NegociacaoService_1_1) {
                NegociacaoService_1 = NegociacaoService_1_1;
            }
        ],
        execute: function () {
            NegociacaoController = class NegociacaoController {
                constructor() {
                    this._negociacoes = new index_2.Negociacoes();
                    this._negociacaoService = new NegociacaoService_1.NegociacaoService();
                    this._negociacoesView = new index_1.NegociacoesView('#negociacoesView', true);
                    this._mensagemView = new index_1.MensagemView('#mensagemView');
                    this._negociacoesView.update(this._negociacoes);
                }
                adiciona() {
                    let data = new Date(this._inputData.val().toString().replace(/-/g, ','));
                    if (index_3.isWeekend(data)) {
                        this._mensagemView.update('Somente negociações em dias úteis');
                        return;
                    }
                    const negociacao = new index_2.Negociacao(data, parseInt(this._inputQuantidade.val().toString()), parseFloat(this._inputValor.val().toString()));
                    this._negociacoes.push(negociacao);
                    this._negociacoes.getList().length = 0;
                    this._negociacoes.getList().forEach(negociacao => {
                    });
                    this._negociacoesView.update(this._negociacoes);
                    this._mensagemView.update('Negociação adicionada com sucesso');
                }
                importaDadosAPI() {
                    this._negociacaoService.importaDados()
                        .then(negociacoes => {
                        if (negociacoes) {
                            negociacoes.forEach(negociacao => this._negociacoes.push(negociacao));
                            this._negociacoesView.update(this._negociacoes);
                        }
                    })
                        .catch(err => console.log(`Erro ao consultar dados da api ${err}`));
                }
            };
            __decorate([
                index_4.domInject('#data')
            ], NegociacaoController.prototype, "_inputData", void 0);
            __decorate([
                index_4.domInject('#quantidade')
            ], NegociacaoController.prototype, "_inputQuantidade", void 0);
            __decorate([
                index_4.domInject('#valor')
            ], NegociacaoController.prototype, "_inputValor", void 0);
            __decorate([
                index_4.pausaMetodo()
            ], NegociacaoController.prototype, "adiciona", null);
            __decorate([
                index_4.pausaMetodo()
            ], NegociacaoController.prototype, "importaDadosAPI", null);
            exports_1("NegociacaoController", NegociacaoController);
        }
    };
});
