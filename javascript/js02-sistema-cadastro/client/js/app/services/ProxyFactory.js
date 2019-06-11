class ProxyFactory {


    static create(objeto, props, acao) {
        return new Proxy(objeto, {

            get: function (target, prop, receiver) {
                // console.log(`GET: objeto: ${target}`);
                // console.log(`GET: método: ${props}`);
                // console.log(`GET: ação  : ${acao}`);

                if (props.includes(prop) && ProxyFactory.isFunction(target, prop)) {
                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set: function (target, prop, value, receiver) {
                // console.log(`SET: objeto: ${objeto}`);
                // console.log(`SET: valor : ${value}`);
                // console.log(`SET: método: ${props}`);
                // console.log(`SET: ação  : ${acao}`);
                
                if (props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    isFunction(target, prop) {
        return typeof (target[prop]) == typeof (Function);
    }
}