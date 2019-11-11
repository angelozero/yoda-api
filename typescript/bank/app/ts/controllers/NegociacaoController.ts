import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';
import { isWeekend } from '../enums/index';
import { DOMInject } from '../helpers/decorators/index'

export class NegociacaoController {

    @DOMInject('#data')
    private _inputData: JQuery;
    
    @DOMInject('#quantidade')
    private _inputQuantidade: JQuery;
    
    @DOMInject('#valor')
    private _inputValor: JQuery;
    
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView: MensagemView = new MensagemView('#mensagemView');

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event) {

        event.preventDefault();

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



}