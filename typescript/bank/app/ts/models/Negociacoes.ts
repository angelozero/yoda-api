import { Negociacao } from './Negociacao';

export class Negociacoes {

    private _negociacoes: Array<Negociacao> = [];

    push(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    getList(): Array<Negociacao> {
        return Array.from(this._negociacoes);
    }

}