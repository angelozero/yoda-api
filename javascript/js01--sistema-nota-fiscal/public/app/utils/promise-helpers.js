/* Tratando o retorno da resposta da API */
export const handleStatus = res =>
    res.ok ? res.json() : Promise.reject(res.statusText);

export const log = param => {
    console.log("[log-promise-helpers] " + JSON.stringify(param) + "\n");
    return param;
};

export const timeOutPromise = (milliSeconds, promise) => {
    const timeOut = new Promise((resolve, reject) =>
        setTimeout(() => reject(`Limite da promise excedido (limite: ${milliSeconds})`), milliSeconds));
    return Promise.race([timeOut, promise]);
}

export const delay = miliseconds => data =>
    new Promise((resolve, reject) =>
        setTimeout(() => resolve(data), miliseconds));

export const retry = (retries, milliseconds, fn) =>
    fn().catch(async err => {
        console.log(retries);
        await delay(milliseconds)();
        return retries > 1
            ? retry(retries - 1, milliseconds, fn)
            : Promise.reject(err);
    }); 
