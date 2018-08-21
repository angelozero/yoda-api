class NegociacaoService {

    constructor() {
        this._httpService = new HttpService();
    }

    obterNegociacoes(url) {
        return new Promise((resolve, reject) => {

            this._httpService.get(url)
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => reject(erro));

        })
    }

    obterNegociacoesDaSemana() {
        return this.obterNegociacoes('/negociacoes/semana');
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this.obterNegociacoes('/negociacoes/retrasada');
    }

    obterNegociacoesDaSemanaAnterior() {
        return this.obterNegociacoes('/negociacoes/anterior');
    }
}