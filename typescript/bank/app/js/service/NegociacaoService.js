System.register(["../models/index"], function (exports_1, context_1) {
    "use strict";
    var index_1, NegociacaoService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            NegociacaoService = class NegociacaoService {
                importaDados() {
                    return fetch('http://localhost:8080/dados')
                        .then(res => this._isOk(res))
                        .then(res => res.json())
                        .then((dados) => dados.map(dado => new index_1.Negociacao(new Date(), dado.vezes, dado.montante)))
                        .catch(err => console.log(`Erro ao consultar dados da api ${err}`));
                }
                _isOk(res) {
                    if (!res.ok)
                        throw new Error(`Erro ao importar os dados da api ---> ${res.statusText}`);
                    return res;
                }
            };
            exports_1("NegociacaoService", NegociacaoService);
        }
    };
});
