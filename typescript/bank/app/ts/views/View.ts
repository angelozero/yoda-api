export abstract class View<T> {

    protected _element: JQuery;
    private _escape: boolean;

    constructor(selector: string, escape?: boolean) {
        this._element = $(selector);
        this._escape = escape;
    }

    update(model: T): void {
        let template = this.template(model);
        
        if (this._escape)
            template = this.replaceScript(template);

        this._element.html(template);
    }

    replaceScript(template: string): string {
        return template.replace(/<script>[\s\S]*?<\/script>/g, '');
    }

    abstract template(model: T): string;

}