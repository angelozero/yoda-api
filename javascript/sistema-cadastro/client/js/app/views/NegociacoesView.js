class NegociacoesView extends View {

   
    constructor(element){
        super(element);
    }

    template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${model.getNegociacoes().map((negociacao, posicao) => {
                return `
                                <tr>
                                    <th>${DateHelper.convertDataToString(negociacao.getData())}</th>
                                    <th>${negociacao.getQuantidade()}</th>
                                    <th>${negociacao.getValor()}</th>
                                    <th>${negociacao.volume}</th>
                                </tr>
                            `
            }).join('')}
                </tbody >

                <tfoot>
                    <td colspan="3" style="text-align: right;">TOTAL</td>
                    <td>
                        ${this._getTotalNegociacoes(model)}
                    </td>
                </tfoot>
                
            </table >
        `;
    }

    _getTotalNegociacoes(model) {
        let total = 0;
        model.getNegociacoes().forEach(negociacao => {
            return total += negociacao.volume;
        });
        return total;
    }
}