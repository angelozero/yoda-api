![TypeScript](https://miro.medium.com/max/510/1*gPQDzHAT_df9y6491dhxag.png)


#### Configurando o arquivo tsconfig.json

 - Antes de tudo começamos configurando noss arquivo tsconfig.json, é nele que ficará guardado as configurações do compilador.
 
 ```json
 {
    "compilerOptions": {
        "target": "es6",
        "outDir": "app/js",
        "noEmitOnError": true   
    },
    "include": [
        "app/ts/**/*"
    ]
}
 ```
 - *compilerOptions*
    - Configurações do compilador. Nele informamos que o resultado final da compilação será um código compatível com ```es6``` e que eles ficarão dentro da pasta ```app/js```.
  
  - *include*
     -  local onde o compilador deve buscar seus arquivos.
     
 - *noEmitOnError*
    - comando para gerar arquivos js apenas se não houver erros de compilação
 
 #### Configurando o arquivo package.json
 
 - No arquivo  package.json adicione a seguinte linha
 
 ```json
 "compile": "tsc"
 ```
 - O arquivo deve ficar assim
 
 ```json
{
  "name": "bank",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "tsc",
    "start": "tsc -w"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "typescript": "^2.3.2"
  }
}
```

- Para executar a aplicação e verificar se tudo funciona execute o comando no terminal
```shell
npm run compile
```

- Para executar a aplicação e verificar em tempo de execução se tudo funciona e se não ha erros execute o comando no terminal
```shell
npm start
```


 #### Modelando com TypeScript
 
  - Agora não será mais necessário utilizar a extensão ```.js```. Agora vamos utilizar apenas com o ```.ts``` no final. Os arquivos em javascript que o navegador irá ler serão gerados automaticamente devido as nossas configuraçes no ```tsconfig.json```.
  
  - Começamos alterando as propriedades da classe ```Negociação.ts``` acrescentando a palavra ```private``` no começo dos atributos.
  
  ```javascript
  class Negociacao {

    private _data;
    private _quantidade;
    private _valor;
    
    // ...
```

 #### O arquivo ```app.ts```
 
  - Criamos uma instância de NegociacaoController para em seguida associar ao evento submit do formulário de index.html a chamada do método adiciona.
  
  ```javascript
  const controller = new NegociacaoController();
document
    .querySelector('.form')
    .addEventListener('submit',controller.adiciona.bind(controller));
  ```

 - Não se esqueça de alterar o ```index.html``` pra que ele carregue os arquivos na ordem correta
 
 ```html
    <script src="js/models/Negociacao.js"></script>
    <script src="js/controllers/NegociacaoController.js"></script>
    <script src="js/app.js"></script>
```

#### Tipando métodos 

 - Assim como no Java declaramos métodos que podem retornar algo ou que não retornam nada. Com o TypeScript declaramos desta maneira:
 
 ```javascript
    // classe Negociacoes.ts
 
    // Método void, não tem retorno
    push(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    // Retorno de uma lista de Negociacao
    getList(): Array<Negociacao> {
        return Array.from(this._negociacoes);
    }
 
 ```

 #### Lidando com tipos genéricos

 - Para reutilizar os métodos ```update``` e ```template``` das classes ```MensagemView.ts``` e ```NegociacoesView.ts``` criamos uma classe Mãe chamada ```View.ts```. E para que todos implementem os métodos sem um parametro especifico, criamos esta classe com o tipo generico.
 

 - Classe Mãe

 ```javascript
// Informamos T para o uso de generics 
abstract class View<T> {

    protected _element: Element

    constructor(selector: string) {
        this._element = document.querySelector(selector);
    }

    update(model: T): void {
        this._element.innerHTML = this.template(model);
    }

    abstract template(model: T): string;

}
 ```
 
 
- Classes filhas com métodos implementados 

 ```javascript
class MensagemView extends View<String> {


    update(model: string): void {
        this._element.innerHTML = this.template(model);
    }


    template(model: string): string {
        return `<p class="alert alert-info">${model}</p>`;
    }
}
 ```

```javascript
 class NegociacoesView extends View<Negociacoes> {


    update(model: Negociacoes): void {
        this._element.innerHTML = this.template(model);
    }

    template(model: Negociacoes): string {
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>`
      //codigo omitido ...
     }
}
```

 #### TypeScript com JQuery

 - Sabendo que ja existe o script do jQuery dentro da pasta ```bank/app/lib```, vamos importá-lo em ```app/index.html``` como primeiro ```script```:

 ```html
<!-- app/index.html -->
<!-- código anterior omitido -->
<script src="lib/jquery.min.js"></script>
<!-- código posterior omitido -->
 ```

- Com o jQuery importado, vamos começar alterando a classe ```app/ts/views/View.ts```

```javascipt
 constructor(seletor: string) {

       // aqui acontece um erro de compilação devido a inserção do "$"
        this._elemento = $(seletor);
    }
```

- Assim que implementar esta alteração você recebera um erro de compilação

``` Cannot find name '$'.```

- O jQuery vive no escopo global e através do JavaScript podemos acessá-lo sem delongas. Contudo, com TypeScript, o compilador não entende que ```$``` vive no escopo global e espera encontrar a declaração da variável ```$``` em nosso código. Mas como resolver isso usando TypeScript ?


#### Usando TypeScript Definitions

- jQuery não foi criado com TypeScript, logo não possui variáveis, propriedades e parâmetro de métodos e funções tipados. Sendo assim os criadores da biblioteca ou terceiros podem criar um arquivo chamado ```TypeScript Declaration File```. Este arquivo possui informações dos nomes de métodos e funções, inclusive tipos que podem ser utilizados pelo TypeScript. Quando carregado, o TypeScript conseguirá, baseado nesse arquivo, realizar checagem estática inclusive lançar mão de todos seu poder através de seu editor ou IDE


- Para instalar execute o comando ```npm install @types/jquery``` 

- E faça as seguinte alterações

```javascript
bstract class View<T> {

// Usando JQuery
    private _elemento: JQuery;

    constructor(seletor: string) {

// Usando "$"
        this._elemento = $(seletor);
    }

    update(model: T) {

// Alterando a linha para usar o método do jQuery "html()"
        this._elemento.html(this.template(model));
    }

    abstract template(model: T): string;
}
```
- Bibliotecas como Lodash, Underscore, inclusive plugins do jQuery UI possuem seu respectivo arquivo tsd. Um repositório do git que centraliza algumas desses arquivo é [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).


#### Namespaces para ES2015 - Carregando módulos

- A sintaxe de módulos do ES2015 considera cada script um módulo e através das instruções import e export importamos e exportamos artefatos respectivamente. Mas mesmo com o import e export no arquivo principal ainda precisamos declarar todos os modulos na ordem correta para carregamento.

```javascript
export abstract class View<T> {
    // ...
```

```javascript
import { View } from './View';
```

- Altere o arquivo ```tsconfig.json``` para indicar para o TypeScript que ele deve usar o sistema de módulos do ```System.js```:

```json
{
    "compilerOptions": {
        "target": "es6",
        "outDir": "app/js",
        "noEmitOnError": true, 
        "noImplicitAny": true,
        "removeComments": true,
        "module": "system"
    },
    "include": [
        "app/ts/**/*"
    ]
}
```
- Importe o loader para carregar js/app/js. É a partir dele que os demais serão carregados.

```html
   <script>
        // extensão ".js" vai ser true para que não haja a necessidade de importar os arquivos (modulos) utilizando .js no final de cada import
        // exemplo "import { View } from './View';" ao invés de "import { View } from './View';"
        System.defaultJSExtensions = true;
        System.import('js/app.js').catch(err => console.error(err));
    </script>
```

#### Organizando módulos em barris - Barrel

 - Para simplificara as importações crie um arquivo em cada diretorio dos modulos com o nome index.ts. Dentro dele export os modulos que você deseja e na classe que recebe o import simplifique o import conforme o codigo abaixo.

 ```javascript
 // app/ts/views/index.ts

export * from './View'; 
export * from './MensagemView'; 
export * from './NegociacoesView';
```

```javascript
import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';

export class NegociacaoController {
// código posterior omitido
```

#### Propriedades readonly

 - Para criar uma propriedade readonly ( acesso ao objeto apenas para leitura ) faça as seguintes modificações:

```javascript

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) { }

    get volume() {
        return this.quantidade * this.valor;
    }
```

#### Parâmetros opcionais

- Em TypeScript podemos usar parametros opcionais, lembrando-se que se houver mais de dois parametros e apenas um deles for opcional, ele deve sempre ser o ultimo parametro declarado.

```javascript
export abstract class View<T> {

    protected _element: JQuery;
    private _escape: boolean;

    constructor(selector: string, escape?: boolean) {
        this._element = $(selector);
        this._escape = escape;
    }
    // codigo posterior omitido
```

```javascript
export class NegociacaoController {

    // passando parametro
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView', true);
    // sem passar o parametro
    private _mensagemView: MensagemView = new MensagemView('#mensagemView');
```


#### Trabalhando com Enuns

 - Criamos uma classe que recebe os dias da semana e verifica se é um final de semana ou não

 ```javascript
 export enum DayOfWeek {

    /**
     *  Sunday (Sândei) 
     *  Monday (Mândei)
     *  Tuesday (Túesdei)
     *  Wednesday (Uénesdei)
     *  Thursday (Tursdei)
     *  Friday (Fraidei)
     *  Saturday (Saturdei)     
     */

    DOMINGO = 0,
    SEGUNDA = 1,
    TERCA = 2,
    QUARTA = 3,
    QUINTA = 4,
    SEXTA = 5,
    SABADO = 6

}


export function isWeekend(data: Date): boolean {
    return data.getDay() == DayOfWeek.DOMINGO || data.getDay() == DayOfWeek.SABADO;
}
```

```javascript
import { isWeekend } from '../enums/index';
// ou
import { DayOfWeek } from '../enums/index';
// ou
import { DayOfWeek, isWeekend } from '../enums/index';
```


#### Criando um Decorator

No arquivo ```tsconfig.json``` adicione a seguinte linha ```"experimentalDecorators": true```.

Crie uma classe da seguinte maneira

```javascript
export function logarTempoDeExecucao() {

}
```
Essa função indica o nome do decorator, mas sua implementação deve estar na função retornada por ```logarTempoDeExecucao```

```javascript
export function logarTempoDeExecucao() {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    }
}
```
 - ```target```
    - É aquele que possui uma referência para o elemento cujo método foi decorado por ```logarTempoDeExecucao```

- ```propertyKey```
    - Este parâmetro é uma string que nos retorna o nome do método decorado

- ```descriptor```
    - O descriptor da acesso ao método que desejamos modificar sua execução, através de ```descriptor.value```

A ideia é a seguinte. Vamos guardar uma referência para o método original antes de substituí-lo com nosso código. É importante que no final o descriptor seja retornado, com as modificações que faremos. O valor de descriptor.value será ```function(...args: any[])```. Isso se dá dessa forma, porque o método que estamos sobrescrevendo pode receber zero, um ou mais parâmetros de tipos que desconhecemos. Usamos ```...``` para indicar um REST PARAMETER. Fazemos ```metodoOriginal.apply(this, args)``` para invocar o método original, capturar seu resultado, caso exista e retorná-lo.

```javascript
export function logarTempoDeExecucao() {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {

            const retorno = metodoOriginal.apply(this, args);
            return retorno;
        }

        return descriptor;
    }
}
```

E para usar o decorator faça:

```javascript
import { logarTempoDeExecucao } from '../helpers/decorators/index';

//....

    @logarTempoDeExecucao()
    update(model: T) {
        //...

    }
}
```
