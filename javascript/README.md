## Curso JavaScript avançado I, II e III   : ES6, orientação a objetos e padrões de projetos


### 01.01 - Prólogo: regras, código e manutenção
   - Simples criação de um arquivo js ( [index.js](https://github.com/angelozero/yoda-js/blob/master/javascript/sistema-cadastro/client/js/index.js) ) para manipulação dos dados na tela, manipulação do DOM.


---

### 01.02 - Especificando uma Negociação

**Diferença entre um método e uma função**
  - Quando criamos uma função dentro de uma classe, nós chamaremos a primeira de **método**. Quando a função estiver fora da classe, continuará sendo chamada de **função**.

**O que significa o " _ " (*underline*) em javascript**
  - É uma convenção aonde os atributos das propriedades de uma classe com o " _ " não podem ser modificados.

**Restringindo o acesso direto as propriedades da classe Negociação**
  - Observe que há uma alteração na classe Negociação, o método ```getVolume()``` já não existe mais. Em seu lugar declaramos o método ``` get volume()```. A diferença agora é que, para acessar a informação de volume não precisamos mais chamar o método getVolume e sim, teoricamente, acessar diretamente o atributo da classe "volume", ```n1.volume```. Na declaração parece que estamos acessando o valor direto do atributo, mas na verdade estamos acessando o método get do atributo.

**Congelando um objeto**
  - Na classe Negociação usamos no final do construtor dela a chamada ```Object.freeze(this);``` . Isso faz com que cada instância dessa classe fique congelada após sua criação, ou seja, não podendo ser modificada.
  - O que significa o ```this``` ? O *this* é uma variável implícita. Neste cenário o this do Object.freeze() será o n1 ( a instância criada na construção da classe) vinda do index.html. Mas a opção *.freeze* faz apenas para a camada mais rasa da sua classe. Como Data é um objeto, esta propriedade não acaba sendo afetada. Para se proteger melhor podemos fazer as seguintes alterações:

  ```java
  this._data = new Date(data.getTime());

  ...

   getData(){
        return new Date (this._data.getTime());
    }

  ```

**Diferença entre declaração *let* e *var***
 - Se executarmos a função a seguir, a exibição será do número 1 ao 100.

  ```java
  <script>
    for(var i = 1; i<= 100; i++) {
      console.log(i);
    }
  <script>
  ```

 - E se continuarmos dentro do bloco ``` <script> ``` declarando no alert o valor de "i", vamos ter como resposta na tela o valor 101.

```java
  <script>

      for(var i = 1; i<= 100; i++) {
          console.log(i);
      }

      alert(i);
  </script>
```
- Quando se trabalha com linguagens como Java, C# e outras, as declaração de variáveis possuem **escopo de bloco**. Na prática, ao utilizarmos estas outras linguagens, jamais poderíamos acessar a variável "i", como fizemos com o alert. Se adicionássemos uma variável chamada nome e depois, acrescentássemos um novo alert, o nome também seria exibido:

```java
<script>

    for(var i = 1; i<= 100; 1++) {
        var nome = 'Angelo';
        console.log(i);
    }

    alert(i);
    alert(nome);
</script>
```

 - Em JavaScript não existe escopo de bloco, então o fato de declararmos uma variável dentro de um bloco não garantirá que temos um escopo. No entanto, se declaramos as variáveis usando o **let**, estas ganharam um **escopo de bloco**. O próximo código não consegue exibir a variável "i" e nem a variável "nome".

```java
 <script>

    for(let i = 1; i<= 100; 1++) {
         let nome = 'Angelo';
         console.log(i);
    }

    alert(i);
    alert(nome);
</script>
```
- Finalizando:
  - VAR: Declarações com var possuem escopo de função ou global. 
  - LET: Variáveis declaradas com let tem escopo de bloco e o JavaScript lançará um erro se a mesma for declarada mais de uma vez.

---


### 01.03 - A ligação entre as ações do usuário e o modelo

**O que é o evento *event.preventDefault()***
  -  Quando submetemos o formulário, se não cancelamos o comportamento padrão do mesmo, ele será recarregado. Com o event.preventDefault(), a controller cancelará a submissão do formulário para poder capturar os dados da negociação.

**Usando *bind***
  - O querySelector é uma função que pertence ao objeto document - chamaremos tal função de método. Internamente, o querySelector tem uma chamada para o this, que é o contexto pelo qual o método é chamado. Logo, o this é o document. No entanto, quando colocamos o querySelector dentro do $, ele passa a ser executado fora do contexto de document e isto não funciona. O que devemos fazer, então? Queremos tratar o querySelector como uma função separada. Nós queremos que ao colocarmos o querySelector para o $, ele mantenha a associação com o document. Para isto, usaremos o bind().

**MVC ... o que é ?**
- M
  - O M é o **modelo**, uma abstração do mundo real, os dados da aplicação e suas regras de negócio. O padrão MVC permite que alterações de layout na view não acarretem alterações no **modelo**.

- V 
  - O V ou a **view** é a representação do modelo em alguma tecnologia, por exemplo, HTML. A **view** apresenta um modelo em uma tabela, em um formulário ou em parágrafos, e o padrão MVC permite que qualquer alteração na **view** não interfira com o modelo.

- C
  - O C é o **controller**, aquele que disponibiliza um modelo para a view. O **controller** é aquele que recebe as ações do usuário e que sabe interagir com o modelo. Como o modelo é independente da view, esta precisa ser renderizada para que reflita as alterações no modelo. Em suma, o controller é a ponte de ligação entre a view e o modelo.

---
    
### 01.04 - Trabalhando com Data

**Usando interpolação para concatenar uma string**
  - Segue o código
  ```java
  
  ...
  
    return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`

  ...
```

---

 ### 02.01 Padrão de projeto Proxy
  
  **Como funciona o Proxy**
    - O Proxy delegará a chamada do método para o objeto encapsulado por ele. A vantagem está que colocaremos o interceptador entre a chamada do Proxy e o objeto real. Toda vez que acessamos o Proxy, executaremos um código antes de chamarmos um método ou propriedade correspondente ao objeto real. Resumidamente, antes de qualquer acesso ou chamada a método/função ou atributo do objeto encapsulado, passamos primeiro pelo proxy. Com isso conseguimos executar um evento ou qualquer outra função antes do objeto em manipulação ser alterado / acessado.


```java
    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver) {
        
                if(['addNegociacao', 'deletaNegociacoes'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
        
                    return function(){
        
                      console.log(`método '${prop}' interceptado`);
        
                     Reflect.apply(target[prop], target, arguments);
        
                     self._negociacoesView.update(target);
        
                    }
             }
        
             return Reflect.get(target, prop, receiver);
          }
        });
```


  **Vantagens de se usar o padrão Factory**
  
    - 1) Ele é utilizado quando precisamos facilitar a criação de um objeto.

    - 2) É ideal quando queremos criar objetos similares, com apenas seus detalhes diferentes, que podemos passar nos argumentos da Factory.

    - 3) É bom para abstrair a criação de um objeto complexo, já que o programador que utilizar a Factory não precisa necessariamente saber como é feita esta operação.

---



---

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
	
---
   
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

**Mais sobre Array, Functor e flatmap**


 - No jargão da programação funcional um Functor é simplesmente algo mapeável, ou seja, que suporta a operação map.
 

 - A operação flatMap se assemelha da função map, com a diferença de que retorna o resultado em uma dimensão apenas.

	
---
   
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
			
---

### 04 Usando takeUntil

 - Basicamente funciona da seguinte maneira. Você informa quantas vezes quer executar a função e qual a função a ser executada.

```javascript

// operators.ja
export const takeUntil = (times, fn) =>
    () => {
        if (times-- > 0) {
            fn();
        }
    }
    
 // app.js   
 const operation = takeUntil(3, () => service
    .sumItems('2143')
    .then(console.log)
    .catch(console.log));
    
```

### 05 Usando debounceTime

 - Basicamente funciona da seguinte forma, você informa um método e passa o tempo do qual ele deve respeitar para executar novamente a mesma chamada.
 
---

### 06 Promise race
 - A função Promise.race recebe uma lista de promises e assim que uma delas for resolvida, receberemos imediatamente seu resultado na próxima chamada encadeada à then . As demais promises são ignoradas:

```javascript
// app/app.js
// importações de módulos omitidas

const promise1 = new Promise((resolve, reject) => 
    setTimeout(() => resolve('promise 1 resolvida'), 3000));

const promise2 = new Promise((resolve, reject) => 
    setTimeout(() => resolve('promise 2 resolvida'), 1000));

// exibirá no console "promise 2 resolvida";
Promise.race([
    promise1, 
    promise2
])
.then(console.log)
.catch(console.log);

```

  - É importante estar atento que qualquer rejeição que aconteça durante a resolução das Promises direcionará o fluxo da aplicação para dentro da função catch.


---

### 07 Delay em Promises

 - A função delay recebe como parâmetro o tempo em milissegundos do delay e possui como retorno outra função.
 
 ```javascript
 const action = operations(() => 
    timeoutPromise(200, service.sumItems('2143'))
    .then(delay(5000)) // chamou delay
    .then(console.log)
    .catch(console.log)
);
```

---

### 08 Retry em Promises

 - A função retry receberá uma função que ao ser chamada, deve retornar uma nova Promise com a operação que desejamos realizar, o número de tentativas e o intervalo de tempo entre essas tentativas.
 
 
```javascript
export const retry = (retries, milliseconds, fn) =>

    fn().catch(err => {
        console.log(retries);
        return retries > 1 
            ? retry(retries - 1, milliseconds, fn)
            : Promise.reject(err);
    });
```

---

### O pattern Publish/Subscribe - Criando nosso próprio EventEmitter
 - Sobre o pattern: Reduz o acoplamento do código. As classes envolvidas ficarão acopladas apenas com barramento de eventos (event bus).
 
 ```javascript
const events = new Map();

export const EventEmitter = {

    on(event, listener) {
        if (!events.has(event)) {
            events.set(event, []);
        }
        events.get(event).push(listener);
    },

    emit(event, data) {
        const listeners = events.get(event);
        if(listeners){
            listeners.forEach(listener => {
                listener(data)
            });
        }
    }
}


// alert-handler.js
import { EventEmitter } from './utils/event-emitter.js';

EventEmitter.on('itensTotalizados', total => alert(total));

//console-handler.js
import { EventEmitter } from './utils/event-emitter.js';

EventEmitter.on('itensTotalizados', console.log);

```
### Função mônada

- Uma mônada deste tipo também é um functor para um tipo de dado e todo functor possui a função map. Em suma, nosso validadorDados nomada embrulha um dado para evitar acesso ao dado null ou undefined. Todavia, uma mônada brilha quando estamos dentro da programação funcional, pois ela evita a proliferação de if nas funções, principalmente naquelas envolvidas em composições.

```javascript
// arquivo validador-valor.js
   getValueOrElse(value) {
        if (this.isNullValue()) {
            return value;
        }
        return this._value;
    }
    
    
/*Arquivo service JS*/

//notasM = notas Monadico, monada
const getItemsFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
//itemsM = items Monadico, monada
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo == code));
//itemsM = items Monadico, monada
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((total, item) => total + item.valor, 0));

export const notasService = {
import { ValidadorValor } from '../utils/validador-valor.js';
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
    
```


---

https://github.com/felippenardi?tab=repositories

https://github.com/felippenardi/lottie-react-web

https://dribbble.com/shots/4249163-Animated-login-form-avatar
