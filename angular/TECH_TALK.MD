### 01 - Do começo ...

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
    - Para explicitar usamos a anotação ```@Input()```, sendo assim tornamos possível o uso delas na declaração do nosso componente.
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

### 2 - Integrando a aplicação com outra API

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
### - Que comecem os desafios !
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

    **2 Etapa - Integração com API e camada de seriço**
    
    1 - Agora será necessário fazer uma integração com uma API externa, para isso use a lib http client do Angular na classe app.component.ts e crie uma variavel do tipo: ```http: HttpClient; ... @angular/common/http```. Para que tudo funcione corretamente faça a injeção dessa dependência no momento em que a aplicação é iniciada.

    2 - Faça uma requisição para este link: ```http://localhost:3000/angelo/photos``` e retorne na tela todas as imagens retornadas da requisição. 

    3 - Para melhorar o código, isole em uma camada de serviço a chamda para a api, deixando esse serviço disponível para qualquer classe em nossa aplicação. Este serviço deve receber como paramâmetro uma *string* aonde será informado o nome que sera utilizado na url. *Ex*.:```http://localhost:3000/${userName}/photos```

    X - Esta com dúvidas ? Leia o tópico **2.01 - HttpClient, Injeção de Dependência, Observable, Criando um serviço e usando @Injectable**

---

  * OBS: 
    1 - Executar o comando ```npm install bootstrap```
    2 - Importar o boostrap em *angular.json* adicionando dentro de *style* a linha ```"./node_modules/bootstrap/dist/css/bootstrap.min.css"```