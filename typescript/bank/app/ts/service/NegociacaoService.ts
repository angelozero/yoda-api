import { domInject, pausaMetodo } from '../helpers/decorators/index'
import { Negociacao, NegociacaoParcial } from '../models/index';

export class NegociacaoService {

    importaDados(): Promise<void | Negociacao[]> {
        //acesso a url da api
        return fetch('http://localhost:8080/dados')
            // verifico se a resposta recebida esta ok ( status 200 )
            .then(res => this._isOk(res))

            // todo arrow function tem um retorno implicito, esse retorna a resposta em json
            .then(res => res.json())

            .then((dados: NegociacaoParcial[]) =>
                dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante)))

            .catch(err => console.log(`Erro ao consultar dados da api ${err}`));
    }

    _isOk(res: Response): Response {
        if (!res.ok)
            throw new Error(`Erro ao importar os dados da api ---> ${res.statusText}`)
        return res;
    }
}