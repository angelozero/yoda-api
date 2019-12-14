System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function pausaMetodo(milissegundos = 500) {
        return function (target, key, descriptor) {
            const metodoOriginal = descriptor.value;
            let timer = 0;
            descriptor.value = function (...args) {
                if (event) {
                    event.preventDefault();
                }
                event.preventDefault();
                clearInterval(timer);
                timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
            };
            return descriptor;
        };
    }
    exports_1("pausaMetodo", pausaMetodo);
    return {
        setters: [],
        execute: function () {
        }
    };
});
