export function domInject(selector: string) {

    return function (target: any, key: string) {

        let elemento: JQuery;

        const getter = function () {

            if (!elemento) {
                console.log(`dom ---> ${selector} | key ---> ${key}`);
                elemento = $(selector);
            }

            return elemento;
        }

        Object.defineProperty(target, key, {
            get: getter
        });
    }
}