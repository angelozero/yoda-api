System.register([], function (exports_1, context_1) {
    "use strict";
    var Negociacoes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Negociacoes = class Negociacoes {
                constructor() {
                    this._negociacoes = [];
                }
                push(negociacao) {
                    this._negociacoes.push(negociacao);
                }
                getList() {
                    return Array.from(this._negociacoes);
                }
            };
            exports_1("Negociacoes", Negociacoes);
        }
    };
});
