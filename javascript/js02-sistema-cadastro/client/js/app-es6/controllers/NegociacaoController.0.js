class NegociacaoController {

    constructor() {
        // 3 - quando NegociacaoController for criado pela primeira vez, ele buscará os elementos do DOM do document. 
        // mesmo que façamos 300 negociações, ele só fará uma busca no DOM pelos elementos. Com isto, conseguimos melhorar a performance e diminuir o impacto
        let $ = document.querySelector.bind(document);
        this._data = $('#data');
        this._quantidade = $('#quantidade');
        this._valor = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();

        // 1 - modo de pegar os dados que vem da tela
        // let data = document.querySelector('#data');
        // let quantidade = document.querySelector('#quantidade');
        // let valor = document.querySelector('#valor');

        // 2 - atribuindo a funcao document.querySelector para uma variavel
        // let $ = document.querySelector.bind(document);
        // let data = $('#data');
        // let quantidade = $('#quantidade');
        // let valor = $('#valor');


        console.log('Data --------->', this._data.value);
        console.log('Quantidade --->', this._quantidade.value);
        console.log('Valor -------->', this._valor.value);
        console.log(' ');

        console.log('Criando a instância de Negociacao')
        let negociacao = new Negociacao(
            this.convertData(this._data.value),
            this._quantidade.value,
            this._valor.value
        )
        console.log(negociacao);
        console.log(' ');
    }

    convertData(data) {
        return new Date(data
            .split('-')
            .map(function (item, posicaoArray) {
                return posicaoArray == 1 ? item - 1 : item;
            })
        );
    }
}