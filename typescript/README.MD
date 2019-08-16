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
 
