## 01 - Do começo ...

* Sobre Angular CLI
  - Primeiro passo vamos acessar o site do [Angular CLI](https://cli.angular.io/)
  - Instalando o Angular ```npm install -g @angular/cli```
  - Criamos nosso projeto com o comando ng new cat_status_code
  - Acessar a pasta cat_status_code e executar o comando ng serve --open ( O comando ```--open``` vai subir um servidor local configurado pelo Angular CLI usando-se boas práticas de desenvolvimento, e automaticamente abrirá o navegador em uma página padrão )

### 1.01 - Aplicação rodando !

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

#### 1.02 - Componentes
  * Um pouco sobre componentes no Angular.
    - Um componente obrigatoriamente precisa fazer parte de um módulo.
    - Um modulo é uma maneira de agrupar componentes.
    - Na nossa aplicação  o nosso modulo é o *app.module.ts*

#### 1.03 - Inbound properties
  * O que é inbound properties ? Nada mais é que a passagem de valores para os componentes no momento da declaração deles.
    - Para que o componente criado receba valores para seus atributos na sua declaração, precisamos explicitar as propriedades que ele tem.
    - Para explicitar usamos a anotação ```@Input() atributo-do-seu-componente```, sendo assim tornamos possível o uso delas na declaração do nosso componente.
    - *Exemplo*.: ```<seu-componente atributo-do-seu-componente="foo"></seu-componente>```

#### 1.04 - Módulos
  * Um pouco sobre módulos / *feature modules* no Angular 
    - Um *feature module* é referente ao agrupamento dos componentes criado durante o desenvolvimento.
    - Em nossa aplicação vamos criar mais componentes referente a tratativa do que se refere a foto. Para "organizar" estes componentes é necessário a criação de um módulo repectivo a eles.
    - Não se esqueça de declarar as componentes que podem ser acessados de fora com o valore ```exports```
    - *Ex*.:
      - ```javascript 
        @NgModule({
          
          // Similar a declaraçao privada do atributo, acesso apenas a componentes que conversam entre si
          declarations: [ PhotoComponent ],
          
          // Expondo atributos para que outros modulos importando um modulo que usa este componente possa ter acesso a este atributo
          exports: [ PhotoComponent ]

        })
        ```

#### 1.05 - Usando diretivas
  * Para que serve diretivas ?
    - Diretivas fornecem a possibilidade de alterar o comportamento do HTML.
    - Uma diretiva de repetição seria ```*ngFor="let carro of listaDeCarros"```
    - E quando o atributo do componente for receber o valor desta lista, não se esqueça de aplicar o data biding para aquele atributo ```[atributo-do-componente]="objeto.valor"```.
      - *Ex*.: ```*ngFor="let carro of listaDeCarros" [corDoCarro]="carro.cor"```
    - Para uma melhor explicação acesse a documentação do [Angular](https://angular.io/guide/attribute-directives) ou este tópico que fala sobre "[O que são diretivas no AngularJS e como usar](https://www.portalgsti.com.br/2017/08/o-que-sao-diretivas-no-angularjs-e-como-usar.html)"

--- 

## 2 - Integrando a aplicação com outra API

#### 2.01 - HttpClient, Injeção de Dependência, Observable, Criando um serviço e usando @Injectable, Ciclo de vida de um componente
  * Como utilizar e injetar uma depência na aplicação ?
    - Primeiro para se utilizar o HttpClient correto ( o client que irá ser utilizado em nossas requisicões ) precisamos declarar em nossa classe desta maneira.
      ```javascript
      constructor(http: HttpClient) {
        this.http = http
      }
      ```
    - Para que a dependencia seja injetada no momento da execução da aplicação é necessário importar o módulo do HttpClient.
      ```javascritp
      import { HttpClientModule } from '@angular/common/http';
      ```
    - E declarar o novo módulo importado na lista de módulos da nossa aplicação
      ```javascript
      imports: [
        // some imports here ...
        HttpClientModule
      ]
      ```
    -  *Observable* vem do [RxJS](https://rxjs-dev.firebaseapp.com/guide/observable), uma técnologia que lida com operações assíncronas. A partir do Angular 2 optaram por usar o *Observable* ao invés de *Promise*. 

    - Como boa prática é interessante o isolamento de cada camada no nosso projeto e isso também se aplica a camda de serviço. Na aplicação removemos a responsabilidade da classe ```AppComponent``` de fazer as requisições e chamamos um serviço para isso. Este serviço por si só não é auto suficiente para poder esperar que o Angular injete a dependência de HttpClient nele. Para isso precisamos anotar a classe com o ```@Injectable```.

    - *@Injectable* - este *decorator* indica que ```PhotoService``` é injetavel (pode receber *httpClient*). Para funcionar corretamente precisamos informar seu escopo, se vai ser único ou não. Como um ou mais componentes podem usar o *photoService* e o mesmo objeto, então é declarado a configuração *provideIn* com o valor *root*. Isso faz com que o Angular coloque esta classe no escopo **raíz** tornando o serviço acessível para qualquer classe. 

--- 

## 3 - Single Page Aplication, BrowserModule, CommonModule, Rotas e ActivatedRoute

#### 3.01 - Organizando o código criando um novo componente com o Angular CLI
  * Como usar os recursos do Angular CLI corretamente ?
    - Primeiro vamos criar um novo componente que terá a responsabilidade de exibir as fotos, sendo assim ```app-module.ts``` não ficará mais esta responsabilidade. 
    - Para criar um novo componente digite no terminal o seguinte comando: ```ng generate component photos/photo-list.```. 
    - Remova o código dentro de ```app-module.ts``` que trata o fluxo de foto e o template dentro de ```app.component.html``` para ```photo-list-component.ts``` e ```photo-list-component.html```. Não se esqueça de importar o **PhotoListComponent** para dentro de ```declarations``` em **PhotoModule**.

#### 3.02 - BrowserModule x CommonModule
   * BrowserModule vs CommonModule em angular
    - Ao criamos um novo componente, este não pode utilizar o modulo BrowserModule, módulo que contem as diretivas. Para isso usamos o módulo CommonModule.
    - Um pouco sobre as diferenças entre um e outro:
      - O BrowserModule fornece serviços essenciais para iniciar e executar um aplicativo de navegador e também reexporta o CommonModule de @ angular/common, que Significa que os componentes no módulo AppModule também têm acesso às diretivas Angular que todo aplicativo precisa, como NgIf e NgFor.
      - CommonModule (todas as noções básicas de Angular modelagem: bindings, * ngIf, * ngFor…), exceto no primeiro módulo do aplicativo, porque ele já faz parte do BrowserModule
    - Leia mais em [CommonModule vs BrowserModule em angular](https://www.it-swarm.dev/pt/angular/commonmodule-vs-browsermodule-em-angular/837385884/)

#### 3.03 - Rotas
   * Criando uma rota em Angular
    - Primeiro precisamos entender como funciona um roteamento de uma *Single Page Application*
    - Primeiramente acessando a rota ```http://localhost:4200``` o arquivo ```index.html``` será carregado.
    - Se caso tentarmos acessar algo do tipo ```http://localhost:4200/teste``` em vez de estarmos fazendo uma requisição para o backend gostariamos que esta rota redirecionasse para algum componente da nossa aplicação para ser renderizado na tela.
    - Antes da requisição ser executado o Angular irá verificar se esta rota existe e se sim vai tentar buscar seu respectivo componente.
    - Cada caminho ( *path* ) da aplicação, estará associado a um componente. 
    - Para tratar todo o esquema de rotas precisamos de um módulo de rotas -> ```app-routing.module.ts```
    - Ele fica assim:
    ```javascript
    const routes: Routes = [
        { path: 'user/angelo', component: PhotoListComponent },
        { path: 'photo/add', component: PhotoFormComponent }
      ];

      @NgModule({
        imports: [
          CommonModule,
          BrowserModule,
          RouterModule.forRoot(routes)
        ],
        exports: [RouterModule]
      })
      export class AppRoutingModule { }
    ```
    - *routes*: declaração das rotas que serão usadas em nossa aplicação
    - *NgModule.imports.CommonModule*: modulo para uso de diretivas dentro do escopo
    - *NgModule.imports.BrowserModule*: modulo para uso de diretivas global
    - *NgModule.imports.RouterModule.forRoot(routes)*: módulo de rotas. Agora quando acessarmos a rota ```localhost:4200```, tudo o que for ```4200/``` terá relação com a rota raiz. Então, o resultado de *forRoot()* será importado, e levará em consideração esta lista de rotas dentro de ```routes```.
    - Por fim importe declare dentro de *exports* desta maneira ```exports: [RouterModule]``` e importe o novo módulo de rotas em ```app-module```. Tudo deve funcionar corretamente.
    - Agora para que a página correta ( quando requisitada ) seja exibida corretamente será necessário alterar o arquivo *html* principal da nossa aplicação, o ```app.component.html```.
    - Declarando dentro dele a seguinte tag: ```<router-outlet></router-outlet>```. É dentro desta tag que o componente solicitado será exibido.

#### 3.03 - ActivatedRoute
   * Como pegar valores na rota com ActivatedRoute
   - Primeiro usamos uma chave e declaramos ela na rota dentro de ```ap-routing.module.ts```. *Ex*.: A chave *:userName* será o valore recebido pela rota ```{ path: 'user/:userName', component: PhotoListComponent }```
   - Com isso declaramos em ```photo-list.component.ts``` a interface *ActivatedRoute* para que tenhamos acesso ao valor *:userName* passado pela rota *http://localhost:4200/user/valor-passado-na-rota*


--- 
--- 
--- 

### Que comecem os desafios !
 - A intenção desse desafio é poder aprender sobre convenções de código do Angular, com isso vamos aprender sobre *Data biding*, *One way Data biding ( Data biding unidirecional )*

  * Após entender a estrutura inicial, vamos implementar e ir além do que ja temos.
    
  **1 Etapa - Inicial**

  1 - Crie duas variaveis dentro do nosso componente: src e title. src deve receber a url da imagem e title o titulo definido por você.
    
  2 - No HTML use as expressões e exiba na tela a imagem e o titulo defindo.
    
  3 - ( Nao obrigatorio ) Adicionar o bootstrap
    
  4 - Crie um componente que seja referente a informações de que uma foto precisa.
    4.1 - Se necessário não esqueça de refatorar o componente ```AppComponent```.
    4.2 - Esta com problema ? Leia o topico **1.02 Componentes**
    
  5 - Componente criado ? Então vamos la ! 
    5.1 - Adicione mais 3 ou 4 tags iguais no html para termos mais fotos na tela, 
    5.2 - Remova a urls fixa no código do componente e passe esse valor na declaraçao do componente que esta na página html que o usa.
    5.3 - Está com dúvidas sobre como fazer essa declaração ? Leia o tópico **1.03 Inbound properties**
    
  6 - Antes que seu código vire uma bagunça vamos criar um módulo
  6.1 - Crie um novo módulo pertinente apenas ao que for referente a foto, não esqueça de arrumar a estutura de pastas !
  6.2 - Remova o componente de foto de *app.module.ts** e passe para seu novo módulo.
  6.3 - Adicione / declare o novo modulo criado em *app.module.ts** e garanta que tudo esta funcionando.
  6.4 - Esta com duvidas ? Leia o topico **1.04 Módulos**
    
  7 - Substitua sua lista fixa de fotos por um recurso de laço do angular, use uma *diretiva*.
    7.1 - Ao invés do *app.component.html* receber 3 ou 4 componentes iguais, faça que ele receba apenas uma lista aonde contenha todas as urls.
    7.2 - Esta com  dúvidas ? Leia o tópico **1.05 - Usando diretivas** 

---
  **2 Etapa - Integração com API e camada de seriço**

  1 - Agora será necessário fazer uma integração com uma API externa, para isso use a lib http client do Angular na classe app.component.ts e crie uma variavel do tipo: ```http: HttpClient; ... @angular/common/http```. Para que tudo funcione corretamente faça a injeção dessa dependência no momento em que a aplicação é iniciada.

  2 - Faça uma requisição para este link: ```http://localhost:3000/angelo/photos``` e retorne na tela todas as imagens retornadas da requisição. 

  3 - Para melhorar o código, isole em uma camada de serviço a chamda para a api, deixando esse serviço disponível para qualquer classe em nossa aplicação. Este serviço deve receber como paramâmetro uma *string* aonde será informado o nome que sera utilizado na url. *Ex*.:```http://localhost:3000/${userName}/photos```

  4 - Esta com dúvidas ? Leia o tópico **2.01 - HttpClient, Injeção de Dependência, Observable, Criando um serviço e usando @Injectable**

---

  **3 Etapa - Single Page Aplication, CommonModule e Rotas**

  1 - Use os comando do Angular CLI para criar um novo componente que vai tratar a lista de fotos. Com isso organize seu código tirando toda responsabilidade de fotos de dentro app-componente.
    
  2 - Para que as diretivas funcione corretamente não esqueça de usar o módulo correto.

  3 - Código organizado crie sua primeira rota para exibir a lista de fotos.

  4 - Com a rota funcionando, crie um componente que renderize as imagens na tela corretamente usando uma lista de 6 x 6 
  4.1 - Ex: [0,1,2,3,4,5] / [6,7,8,9,10,11] ...
  4.2 - Esta lista não pode ser renderizada por css apenas pelo componente.

  X - Esta com dúvidas ? Leia o tópico **3 - Single Page Aplication, BrowserModule, CommonModule, Rotas e ActivatedRoute**

---

  * OBS: 
    1 - Executar o comando ```npm install bootstrap```
    2 - Importar o boostrap em *angular.json* adicionando dentro de *style* a linha ```"./node_modules/bootstrap/dist/css/bootstrap.min.css"```
    3 - Para corrigir o erro *"“Experimental support for decorators is a feature that is subject to change in a future release. Set the ‘experimentalDecorators’ option in your ‘tsconfig’ or ‘jsconfig’ to remove this warning.”* no VsCode.
      - Vá em ```File => Preferences => Settings``` e pesquise por ```javascript.implicitProjectConfig.experimentalDecorators```
      - De um *check* na caixa que está relacionada a ```Enable/disable experimentalDecorators for JavaScript ...``` - [Stackoverflow - Decorators error in VS code editor after upgrading to Angular 10](https://stackoverflow.com/questions/62614633/decorators-error-in-vs-code-editor-after-upgrading-to-angular-10)
