### 01 - Do começo ...

* Sobre Angular CLI
  - Primeiro passo vamos acessar o site do [Angular CLI](https://cli.angular.io/)
  - Instalando o Angular ```npm install -g @angular/cli```
  - Criamos nosso projeto com o comando ng new cat_status_code
  - Acessar a pasta cat_status_code e executar o comando ng serve --open ( O comando ```--open``` vai subir um servidor local configurado pelo Angular CLI usando-se boas práticas de desenvolvimento, e automaticamente abrirá o navegador em uma página padrão )

### 02 - Aplicação rodando !

  * Entendendo a estrutura do projeto inicial
    - Em angular tudo é um componente ! A pagina inicial nos da varias informaçoes mas o ```index.html``` não tem tantos dados assim e por curiosidade temos a tag ```<app-root>``` que não existe no mundo *html*. 
    - Em Angular, tudo é um componente, capaz de guardar um comportamento, o CSS, e a marcação HTML. Sim uma pagina é ou pode ser um componente. Ou seja a tag ```<app-root>``` é nosso primeiro compoente.
    - Para entedermos melhor a estrutura criado dentro da pasta ```src/app```, vamos por partes:
       1 - Abrindo o arquivo ```app.component.ts``` veremos um classe aonde há um *Decorator* anotado com ```@Component```, o qual torna esta classe um componente.```Decorator``` é aonde ele vai receber algumas metainformações.
       2 - Mas o que são essas metas informações ? 
        2.1 - ```selector: 'app-root',``` - Este *selector* nos permite utilizar o componente em templates. Todo conteudo da sua apresentação, seu CSS e o que ele vai fazer, são acessados através dele.
        2.2 - ```templateUrl: './app.component.html',``` - Template HTML que sera exibida pelo componente.
        2.3 - ```styleUrls: ['./app.component.css']``` - Template CSS que sera utilizado no componente.
        2.4 - ```title = 'cat-status-code';``` - Variavel do nosso componente que recebe o valor *cat-status-code* ( leia mais sobre o tópico Data binding a seguir )
    - Data binding - É um recurso utilizado pelo Angular que implica em uma associação de dados com uma fonte de dados. Esta informação esta no nosso componente. Ao encontrarmos esta sintaxe ```{{ title }``` chamada de Angular expression automaticamente ele estará apontando para a propriedade title acessando e exibindo o seu valor.


### 03 Que comecem os desafios !
 - A intenção desse desafio é poder aprender sobre *Data biding*, *One way Data biding ( Data biding unidirecional )*

  * Após entender a estrutura inicial, vamos implementar e ir além do que ja temos.
    1 - Crie duas variaveis dentro do nosso componente: src e title. src deve receber a url da imagem e title o titulo definido por você.
    2 - No HTML use as expressões e exiba na tela a imagem e o titulo defindo.