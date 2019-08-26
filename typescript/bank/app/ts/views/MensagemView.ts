class MensagemView extends View<String> {


    update(model: string): void {
        this._element.innerHTML = this.template(model);
    }


    template(model: string): string {
        return `<p class="alert alert-info">${model}</p>`;
    }
}