import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { isWeekend } from '../enums/index';
import { domInject, pausaMetodo } from '../helpers/decorators/index'
import { NegociacaoService } from '../service/NegociacaoService'


export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacaoService: NegociacaoService = new NegociacaoService();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView: MensagemView = new MensagemView('#mensagemView');

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @pausaMetodo()
    adiciona(/*event: Event*/) {

        // event -> evento que recarrega a tela, removido para o decorator @pausaMetodo()
        //event.preventDefault();

        let data = new Date(this._inputData.val().toString().replace(/-/g, ','));

        if (isWeekend(data)) {
            this._mensagemView.update('Somente negociações em dias úteis');
            return
        }


        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val().toString()),
            parseFloat(this._inputValor.val().toString())
        );

        this._negociacoes.push(negociacao);

        this._negociacoes.getList().length = 0;
        //console.log(this._negociacoes.getList().length);

        this._negociacoes.getList().forEach(negociacao => {
            //console.log(negociacao);
        });

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');
    }

    // Codigo removido para a classe NegociacaoService
    @pausaMetodo()
    importaDadosAPI() {
        this._negociacaoService.importaDados()
            .then(negociacoes => {
                if (negociacoes) {
                    negociacoes.forEach(negociacao => this._negociacoes.push(negociacao))
                    this._negociacoesView.update(this._negociacoes);
                }
            })
            .catch(err => console.log(`Erro ao consultar dados da api ${err}`));
    }
}