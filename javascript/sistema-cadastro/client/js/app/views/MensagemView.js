class MensagemView extends View {


    constructor(element){
        super(element);
    }

    template(model) {
        return model.getTexto() ? `<p class="alert alert-success">${model.getTexto()}</p>` : `<p></p>`
    }
}