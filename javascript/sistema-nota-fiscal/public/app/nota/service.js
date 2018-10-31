import { handleStatus } from '../utils/promise-helpers.js';
// importou compose
import { partialize, compose } from '../utils/operators.js';

const API = `http://localhost:3000/notas`;

const getItemsFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItemsByCode = (code, items) => items.filter(item => item.codigo === code);
const sumItemsValue = items => items.reduce((total, item) => total + item.valor, 0);

export const notasService = {

    listAll() {
        return fetch(API)
            .then(handleStatus)
            .catch(err => {
                console.log(err);
                return Promise.reject('Não foi possível obter as notas fiscais');
            });
    },

    sumItems(code) {

        // realizando a composição
        const sumItems = compose(
            sumItemsValue,
            partialize(filterItemsByCode, code),
            getItemsFromNotas
        );

        return this.listAll().then(sumItems);
    }
};


## Curso JavaScript: De padrões a uma abordagem funcional

  ### 01  Promises e API Fetch
  
		- O padrão Promise adicionado à especificação ES2015 nos auxilia a lidar com o resultado futuro de uma ação, em outras palavras, essa especificação brilha no tratamento de operações assíncronas substituindo callbacks que podem dificultar a leitura e manutenção do código.

		- Uma Promise possui estados. Os mais importantes são o resolved e o rejected. O primeiro é quando a Promise realiza seu objetivo, já o segundo ocorre quando, por algum motivo, ela é impedida de ser resolvida. Não é permitido que uma Promise no estado resolved vá para o estado rejected e vice-versa. Nesse sentido, uma Promise é imutável. No entanto, Promises podem retornar novas Promises a partir de suas operações.

		- A API Fetch, que veio simplificar em muito a realização de requisições assíncronas (Ajax) adere à especificação Promise

		- A chamada fetch('http://endereco-de-uma-api') retorna uma Promise. Toda Promise possui o método then que será chamado apenas quando a operação for resolvida.
	
		```java
		
			fetch('http://endereco-de-uma-api')
				.then(res => console.log(res.json()));
				
		```
	### 02 Adequação e lógicas para os dados recebidos da API
	
	- Somando todos os itens com código específico
	
		-  Apos receber a lista com as notas devemos
			- obter uma lista com todos os itens de todas as notas fiscais
			
			- filtrar todos os itens pelo código 2143
			
			- somar o valor de todos os itens
			
		 - Em JavaScript, podemos realizar cada etapa acima da seguinte maneira:

			- Array.map
			
			- Array.filter
			
			- Array.reduce
			
			```java
			
				document
						.querySelector('#myButton')
						.onclick = () =>
							fetch('http://localhost:3000/notas')
								.then(handleStatus)
								.then(notas => notas.reduce((array, nota) => array.concat(nota.itens), []))
								.then(log)
								.then(itens => itens.filter(item => item.codigo == '2143'))
								.then(log)
								.then(itens => itens.reduce((total, item) => total + item.valor, 0))
								.then(console.log)
								.catch(console.log);
								
			```
			
	- Implementando a função flatMap

		- O código:

			```notas.reduce((array, nota) => array.concat(nota.itens), [])```
			
		- Se tornará:
			
			```notas.$flatMap(notas => notas.itens)```

	- Adicionaremos a função $flatMap no prototype de Array, permitindo assim que todos os arrays criados em nossa aplicação tenham acesso à função.
	
	- Reparem que apenas importamos o módulo passando seu caminho.



			```java 
			
				//array-helpers.
				if ( !Array.prototype.$flatMap ) {
					Array.prototype.$flatMap = function(cb) {
						return this.map(cb).reduce((destArray, array) => 
							destArray.concat(array), []);
    				}
				}
				
				/* ... */
			
				//app.js
				import './utils/array-helpers.js';
				
				A biblioteca RxJS utiliza essa estratégia para adicionar no prototype do Observer os operators que carregados.
				
			```
			
	### 03 Separando responsabilidades - Usando Partial application
		
		**Transformando uma função que recebe dois parâmetro para um parâmetro apenas**
		
			**A função bind**
			
			- A função Function.bind cria uma nova função. Seu primeiro argumento é o valor de this que desejamos que a nova função utilize como contexto. Porém, como declaramos a função através de arrow function que não aceita a modificação do seu contexto, simplesmente passamos null. Mesmo que tivéssemos passado outro valor ele seria ignorado.

			- Os demais parâmetros são todos aqueles que desejamos assumir como argumentos já fornecidos toda vez que a função resultante de bind() for chamada. No caso, estamos indicando que o primeiro parâmetro será sempre 2.

 			- Podemos passar quantos parâmetros desejarmos. Vejamos outro exemplo:
			
			```java
				const ehDivisivel = (divisor, numero) => !(numero % divisor);
				// assume como parâmetros 2 e 5, nesta ordem
				const fn = ehDivisivel.bind(null, 2, 5);
				fn(); // false
			```
			
			Point-free style
		
		
			
			