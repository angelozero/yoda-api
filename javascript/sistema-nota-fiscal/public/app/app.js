import { log, timeOutPromise, retry } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { notasService as service } from './nota/service.js';
import { takeUntil, debounceTime, partialize, pipe, } from './utils/operators.js'


/* ######################################## Código inicial ################################################### */

// document
// .querySelector('#myButton')
// .onclick = () => alert('oi');

/* ######################### Simples chamada para uma API e logando o resultado ############################## */

// document
//     .querySelector('#myButton')
//     .onclick = () =>
//         fetch('http://localhost:3000/notas')
//             .then(handleStatus)
//             .then(notas => console.log(notas))
//             .catch(console.log);

/* ######################################## Usando Promise e API Fetch ####################################### */

// fetch('http://localhost:3000/notas')
//     .then(res => {
//         // se true, retorna os dados parseados
//         if(res.ok) return console.log(res.json());
//         // retorna uma Promise rejeitada com a informação vinda do servidor
//         return Promise.reject(res.statusText);
//     })
//     //.then(res => res.json())
//     //.then(console.log)
//     .catch(err => console.log(err));
//     // ou .catch(console.log);

/* ###### Consumindo endpoint REST com a API Fetch e somando todos os itens com código específico ############ */

// document
//     .querySelector('#myButton')
//     .onclick = () =>
//         fetch('http://localhost:3000/notas')
//             .then(handleStatus)
//             .then(notas => notas.reduce((array, nota) => array.concat(nota.itens), []))
//             .then(itens => {
//                 console.log(itens);
//                 return itens;
//             })
//             .then(itens => itens.filter(item => item.codigo == '2143'))
//             .then(itens => {
//                 // nova lista filtrada
//                 console.log(itens);
//                 return itens;
//             })
//             .then(itens => itens.reduce((total, item) => total + item.valor, 0))
//             .then(console.log)
//             .catch(console.log);

/* ##############################  Implementando e externalizando a função Log ############################## */

// document
//     .querySelector('#myButton')
//     .onclick = () =>
//         fetch('http://localhost:3000/notas')
//             .then(handleStatus)
//             .then(notas => notas.reduce((array, nota) => array.concat(nota.itens), []))
//             .then(log)
//             .then(itens => itens.filter(item => item.codigo == '2143'))
//             .then(log)
//             .then(itens => itens.reduce((total, item) => total + item.valor, 0))
//             .then(console.log)
//             .catch(console.log);

/* #################################### Implementando a função flatMap #################################### */

// document
//     .querySelector('#myButton')
//     .onclick = () =>
//         fetch('http://localhost:3000/notas')
//             .then(handleStatus)
//             .then(notas => notas.$flatMap(nota => nota.itens))
//             .then(log)
//             .then(itens => itens.filter(item => item.codigo == '2143'))
//             .then(log)
//             .then(itens => itens.reduce((total, item) => total + item.valor, 0))
//             .then(console.log)
//             .catch(console.log);

/* #################################### Melhorando o código de soma #################################### */


// const sumItems = notas => notas
//     .$flatMap(nota => nota.itens)
//     .filter(item => item.codigo == '2143')
//     .reduce((total, item) => total + item.valor, 0)

// document
//     .querySelector('#myButton')
//     .onclick = () =>
//         fetch('http://localhost:3000/notas')
//             .then(handleStatus)
//             .then(sumItems)
//             .then(console.log)
//             .catch(console.log);


// const doTake = takeUntil(3, function(){
//     console.log('ok');
// } )

/* #################################### Usando TakeUntil #################################### */
// const operations = pipe(
//     partialize(takeUntil, 3),
//     partialize(debounceTime, 500)

// );

// const action = operations(() => service
//     .sumItems('2143')
//     .then(console.log)
//     .catch(console.log));

// document
//     .querySelector('#myButton')
//     .onclick = () => action();

/* #################################### Usando Promise.race #################################### */

const operations = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)

);

const action = operations(() => 
    retry(3, 3000, ()=> timeOutPromise(200,service
    .sumItems('2143')))
    .then(console.log)
    .catch(console.log));

document
    .querySelector('#myButton')
    .onclick = () => action();

