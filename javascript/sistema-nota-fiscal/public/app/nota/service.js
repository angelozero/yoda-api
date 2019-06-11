import { handleStatus } from '../utils/promise-helpers.js';
import { partialize, pipe } from '../utils/operators.js';
import { ValidadorValor } from '../utils/validador-valor.js';

const API = 'http://localhost:3000/notas';

//notasM = notas Monadico, monada
const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
//itemsM = items Monadico, monada
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo == code));
//itemsM = items Monadico, monada
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.valor, 0));

export const notasService = {

    /* Chamando a API de notas */
    listAll() {
        return fetch(API)
            .then(handleStatus)
            // linha para testar a função monada ( passe notas ou o valor 0)
            .then(notas => ValidadorValor.of(notas))
            .catch(err => {
                console.log(err);
                return Promise.reject('Não foi possível obter as notas fiscais');
            });
    },

    sumItems(code) {
        const filterItems = partialize(filterItemsByCode, code);
        const sumItems = pipe(getItemsFromNotas, filterItems, sumItemsValue);

        return this.listAll()
            .then(sumItems)
            .then(result => result.getValueOrElse(0));
    }
};