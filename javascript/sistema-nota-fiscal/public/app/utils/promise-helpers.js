export const handleStatus = res =>
    res.ok ? res.json() : Promise.reject(res.statusText);

/* ##############################  Implementando e externalizando a função Log ############################## */

export const log = param => {
    console.log("[log-promise-helpers] " + JSON.stringify(param) + "\n");
    return param;
};