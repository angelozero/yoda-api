![TypeScript](https://miro.medium.com/max/510/1*gPQDzHAT_df9y6491dhxag.png)


#### Configurando o arquivo tsconfig.json

 - Antes de tudo começamos configurando noss arquivo tsconfig.json, é nele que ficará guardado as configurações do compilador.
 
 ```json
 {
    "compilerOptions": {
        "target": "es6",
        "outDir": "app/js"
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
    "compile": "tsc"
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

 
