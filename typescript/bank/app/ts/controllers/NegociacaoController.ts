class NegociacaoController {

    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView: MensagemView = new MensagemView('#mensagemView')

    constructor() {

        this._inputData = <HTMLInputElement>document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement>document.querySelector('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event) {

        event.preventDefault();

        const negociacao = new Negociacao(
            new Date(this._inputData.value.replace(/-/g, ',')),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        this._negociacoes.push(negociacao);
        this._negociacoes.getList().length = 0;
        console.log(this._negociacoes.getList().length);
        this._negociacoes.getList().forEach(negociacao => {
            //console.log(negociacao);
        })
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação add com sucesso');
    }

}