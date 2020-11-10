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

    ```javascript
    // instancia unica para a aplicacao inteira
    @Injectable({
      providedIn: 'root'
    })
    ```

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

## 4 - Eventos no DOM, criando um PIPE, Resolvers, RxJS e Debounce Pattern

#### 4.01 - Usando o método event.target.value 

  * Como pegar valores no dom através de um evento.

  - Equivalente ao comando ```h1.addEventListener('keyup', function(event) {...``` para que possamos pegar um valor através de um evento executado no dom, em Angular usamos da seguinte maneira: ```keyup="filter = $event.target.value"```. Agora a variavel filter esta preenchida com o que foi adicionado ao campo da pagina html. A cada letra digitada a variavel vai sendo atualizada. Para textar a variavel em funcionamento adicione ```{{filter}}``` no código.

  - A pagina deve ficar assim:
```html
    <div class="text-center mt-3 mb-3">
      <form>
        <input
            class="rounded"
            type="search"
            placeholder="search..."
            autofocus
            (keyup)="filter = $event.target.value" 
            >
      </form>
    <!-- {{filter}} -->
    </div>

    <app-photos-render [photos]="apiPhotoData"></app-photos-render>
```

- *(keyup)*: aqui chamamos de eventtype, o evento do dom faz a variavel receber o valor que é digitado no campo. Quando estamos usando este valor "()" estamos dizendo que o fluxo de informação é de fora para dentro (html -> template ). E que quando usado este valor "[]"o fluxo é ao contrário ( template -> html ). 

#### 4.01 - Criando um Pipe

* Aplicando um pipe no DOM

- O Pipe é um método que será executado através de uma classe PIPE. 

- No nosso dom ele vai receber uma lista de fotos e a palavra digitada no campo ( letra a letra )

- Para invocar o método corretamente anotamos uma classe criada como ```@Pipe```, em seu atributo *name* o valor do método usado como pipe no dom.

- Nao se esqueça de implementar a interface *PipeTransform* para ter acesso ao método *transform* e nele alterar seus atributos de entrada para receber o que é passado pelo DOM.


```javascript
  import { Photo } from './../photo/photo';
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({ name: 'filterByDescriptionPipe'})
  export class FilterByDescriptionPipe implements PipeTransform {
    transform(photos: Photo[], descriptionQuery: string) {
    // some code here ...
    }
  }
```

#### 4.02 - Resolver
* Como um resolver funciona

- Para intereceptar uma chamda via rota e executar um método seja para o que for, será necessário o uso de um Resolver

- Ele recebe a requisição respectiva do momento. Chama o serviço de popular a lista de fotos. E devolve a lista de fotos preenchida.

- Isso resolve o problema da pagina inicial sempre ser carregada com a mensagem de foto nao encontrada. Na verdade a pagina nao encontrada é carregada antes que a lista receba um valor.

- *Ex*.: 
```javascript
  @Injectable({ providedIn: 'root' })
  export class PhotoListResolver implements Resolve<Observable<Photo[]>>{


    constructor(private service: PhotoService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> | Observable<Observable<Photo[]>> | Promise<Observable<Photo[]>> {
      const userName = route.params.userName;
      return this.service.listPhotosFromUser(userName);
    }
  }
```
- Não esqueça de importalo como um componente em *app-routing.module.ts* e dentro dele passando um objeto do tipo resolve informando o atributo que irá receber o valor da requisição interceptada. O trecho fica assim ```his.activatedRoute.snapshot.data['nome-da-variavel-do-objeto-retornado-pelo-resolver']```

```javascript
const routes: Routes = [
  {
    path: 'user/:userName', component: PhotoListComponent,
    resolve: {
      photos: PhotoListResolver
    }
  },
  { path: 'photo/add', component: PhotoFormComponent },
  { path: '**', component: NotFoundComponent }

];
```
- Por fim o atributo que for receber esse valor, deverá acessa-lo da seguinte maneira:

- *Ex*.:
```javascript
export class PhotoListComponent implements OnInit {
  // some code here ...
    ngOnInit(): void {

    this.apiPhotoData = this.activatedRoute.snapshot.data['photos']
  }
}
```

#### 4.03 RxJS e Debounce Pattern
  * Um pouco sobre o pattern debounce
  - Vamos supor que o campo de pesquisa de foto faça uma requisição a cada evento disparado. Isso seria ruim pois iria ser uma grande quantidade de requisições em um curto espaço de tempo. 

  - Para isso podemos usar o pattern Debounce. 

  - No html substuimos a variave *filter* pelo método *debounce.next*

  - Ele recebe o valor que esta vindo do layout ( usei o mesmo nome de variavel anteriormente no html ) ```.subscribe(filter => this.filter = filter)```, executa algo como um pequeno intervalo de tempo, e depois devolve esse valor para a função e assim seguir com o fluxo normal do dado.

  - Se caso seu dado estiver usando um subscribe, não se esqueça de finaliza-lo, para não haver um consumo de memória a toa.

  - *Ex*.: 
  ```html
  <input class="rounded" type="search" placeholder="search..." autofocus (keyup)="debounce.next($event.target.value)">
  ```

  - *Ex*.: 
  ```javascript
  export class PhotoListComponent implements OnInit, OnDestroy {

  //some code here ...

  debounce: Subject<string> = new Subject<string>();

   ngOnInit(): void {
      this.apiPhotoData = this.activatedRoute.snapshot.data['photos']
      this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter)
    }
  }
  ```

---

## 5 - Autenticação ( login e logout ), model driven forms, lazy loading, router guards, router link
  * Para entendermos melhor a parte de autenticação, vamos trecho a trecho do código. Template x Layout

#### 5.1 - Usando um pipe na request, armazenando token no localStorage e recuperando os dados do token.

  - Para controlar os campos que o formulario tem ( nome e senha ) importamos e utilizamos a variavel loginForm de FormGroup. Com isso temos acesso a estes dois campos. Tendo acesso conseguimos fazer as devidas validaçoes de preenchimento deles.

  - Template  
    ```javascript
      import { FormGroup, FormBuilder, Validators } from '@angular/forms';

      export class SingInComponent implements OnInit {
        // some code here ...
        loginForm: FormGroup;
        // some code here ...

          ngOnInit(): void {

        this.loginForm = this.formBuilder.group({
          userName: ['', Validators.required],
          password: ['', Validators.required]
        });
      }
    ```
  - Layout
    ```html
    <form class="form mt-4" [formGroup]="loginForm" (submit)="login()">
    ```

  - Obtendo a referencia do template para acionar o evento auto-focus quando a pagina é acionada. ```<app-vmessage>``` é o componente compartilhado pela aplicação para exibição de mensagens. Ele verifica se ha algum erro, se houver exibe a mensagem. 

  - Template
    ```javascript
    export class SingInComponent implements OnInit {
      // some code here ...
      @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
      // some code here ...
    }
    ```

  - Layout
    ```html
       <div class="form-group">
        <input #userNameInput formControlName="userName" class="form-control" placeholder="user name" autofocus>
        <app-vmessage *ngIf="loginForm.get('userName').errors?.required" text="User name is required"></app-vmessage>
      </div>
    ```

  - Invocando o metodo de login para acesso a aplicaçao e verificando em qual plataforma ele esta sendo executado para o evento de auto-focus para o campo nome se caso der erro no login.

  - Template
    ```javascript
      login() {

        const userNameValue = this.loginForm.get('userName').value;
        const passwordValue = this.loginForm.get('password').value;

        this.authService
          .authenticate(userNameValue, passwordValue)
          .subscribe(() => {
            console.log('sucesso')
            // equivalente a usar ---> this.router.navigateByUrl(`user/${userNameValue}`)
            this.router.navigate(['user', userNameValue])
          },
            err => {
              console.log(`Erro ao se autenticar ${err.message}`);
              this.loginForm.reset();

              // Servico de verificacao de plataforma. Uma maneira de se proteger se caso o serviço nao for utilizado via browser
              if (this.platFormDetectorService.isPlatformBrowser()) {
                this.userNameInput.nativeElement.focus();
              }
              alert('Invalid user name and/or password')
            }
          )
      }
    ```

  - Layout
    ```html
       <div class="form-group">
        <input #userNameInput formControlName="userName" class="form-control" placeholder="user name" autofocus>
        <app-vmessage *ngIf="loginForm.get('userName').errors?.required" text="User name is required"></app-vmessage>
      </div>
    ```

  - Extra.: Servico de autenticação
    ```javascript
      export class AuthService {
        constructor(private http: HttpClient) { }
        authenticate(userName: String, password: string) {
          return this.http.post(API_URL + '/user/login/', { userName: userName, password: password })
        }
      }
    ```

  - Utilizando o comando PIPE para realizar a request de login e acessar o token recebido.
    - Este processo corresponde ao momento do login. Para que nao haja a necessidade de se alterar o servico ```.subscribe``` criamos um pipe dentro da classe ```auth.service```. Desta maneira conseguimos executar a chamada realizada pelo ```.subscribe``` mas antes invocando o método pipe no servico de autenticação na classe ```auth.service```:

    ```javascript
    // Import para uso do tap
    import { tap } from 'rxjs/operators';

      // Por etapas

      // Classe auth.service.ts
      // 01 ---> realizamos a requisição para login passando como parametros a url, nome do usuario + senha e por fim o atributo observe com o valor response. Este ultimo parametro expõe o header para ser manipulado
      authenticate(userName: String, password: string) {
        return this.http
          .post(API_URL + '/user/login/', { userName: userName, password: password }, { observe: 'response' })
      
      // 02 ---> adicionamos o pipe com o tap
          // pipe ---> comando que sera executado antes da chamada do subscribe
          .pipe(
            // tap ---> serve para a geração de side effects, normalmente quando queremos logar no console, ou acessar e gravar algum valor.
            tap(
              res => {
                const authToken = res.headers.get('x-access-token'); 
                console.log(`User: ${userName} -- Token: ${authToken}`)
              }
            )
          )
      
      // Classe sing.in.component.ts
      // 03 ---> subscribe sem alteração no código.
      .subscribe(() => {
          console.log('sucesso')
          //this.router.navigateByUrl(`user/${userNameValue}`)
          this.router.navigate(['user', userNameValue])
        }
    ```

  - Para armazenarmos o token da requisição criamos um serviço chamado token service. Ele sera responsavel de tratar o token do usuario conectado em nossa aplicação.

  ```javascript
    import { Injectable } from '@angular/core';

    const TOKEN_KEY = 'authToken';

    @Injectable({ providedIn: 'root' })
    export class TokenService {


      hasToken(): boolean {
        // !! ---> a primeira exaclamação "!" deixa o retorno do getToken() como false se caso houver string.
        // !! ---> a segunda exaclamação "!" inverte o valor booleano recebido pela primeira exclamação.
        // Se     houver retorno no getToken o primeiro status sera false e com a segunda exclamaçao sera true.
        // Se nao houver retorno no getToken o primeiro status sera true e com a segunda exclamaçao sera false.
        return !!this.getToken();
      }

      setToken(token: string) {
        window.localStorage.setItem(TOKEN_KEY, token)
      }

      getToken() {
        return window.localStorage.getItem(TOKEN_KEY)
      }

      removeToken() {
        window.localStorage.removeItem(TOKEN_KEY)
      }
    }
  ```

  - Para a utilização dele invocamos desta maneira em nosso pipe

    ```javascript
      .pipe(
            tap(
              res => {
                const authToken = res.headers.get('x-access-token');
                this.tokenService.setToken(authToken)
                console.log(`User: ${userName} -- Token: ${authToken}`)
              }
            )
          )
    ```

- Para recuperar os dados que vem no token vamos criar nosso proprio método de decodificacao, Para mais informaçoes acesse 
- Primeiro removemos a responsabilidade de receber esses dados do token do serviço de login ```AuthService``` ( classe ```auth.service.ts``` ) e criamos uma classe nova para isso. 
- Ela fica assim:

```javascript
import { UserInterface } from './user.interface';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new  BehaviorSubject<UserInterface>(null);


  constructor(private tokenService: TokenService) {
    if (this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }
  }

  setToken(token: string) {
    this.tokenService.setToken(token)
    this.decodeAndNotify()
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken()
    const user = this.decode(token) as UserInterface;
    this.userSubject.next(user);
  }

  // Decode sem o modulo jwt-decode
  private decode(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.log(`Nao foi possivel decodificar o token`)
    }
  }
}
```
- Trecho a trecho do que a classe vai fazer agora e como nossa classe de ```auth``` vai ficar.
- Primeiro criamos um *Subject* e utilizamos ele usando um "contrato" referente a um *User*
```javascript
  private userSubject = new Subject<UserInterface>();
```
- A interface *User* fica desse jeito
```javascript
  export interface UserInterface {
    id: number;
    name: string;
    email: string;
  }
```

-  Na sequencia, no construtor, recebemos o serviço do *Token* e fazemos a seguinte verificação:
  - Se caso o usuario ja estiver logado então vamos executar o método *decodeAndNotify*
  - O método *decodeAndNotify* por sua vez vai receber o token da sessão, usar o *jwt-decode* para decodificar o token já recebendo como "contrato" a interface *UserInterface* e por fim chamar o *.next* da variável *userSubject*. Isso faz com que tenhamos acesso ao método *subscribe*. Com acesso a este método podemos pegar em qualquer lugar da nossa aplicação os dados vindo do token referente ao usuário. 
    ```javascript
      constructor(private tokenService: TokenService) {
        if (this.tokenService.hasToken()) {
          this.decodeAndNotify();
        }
      }
      // ... some code here

      private decodeAndNotify() {
        const token = this.tokenService.getToken()
        const user = decode(token) as UserInterface;
        this.userSubject.next(user);
      }
    ```
    
#### 5.2 - BehaviorSubject
  * O BehaviorSubject armazena a última emissão até que alguém apareça para consumi-la. Ou seja, quando o template do header for criado, o evento de buscar o nome do ususario logado ja terá sido disparado. Para que possamos consumir o ultimo valor de forma que ele traga dados, usamos o BehaviorSubject.
  
  ```javascript
    import { BehaviorSubject } from 'rxjs';
    
    // some code here ...
    
    private userSubject = new  BehaviorSubject<UserInterface>(null);
  ```

#### 5.3 - Async pipe
  * Usando Async Pipe no nosso template
  * Com o Async pipe conseguimos capturar a emissão do Observable diretamente do nosso template.

### 5.4 - Logout
  
  * Implementando o metodo de logout - header.component.html e header.component.ts
  ```html
      <div *ngIf="(user$ | async) as user; else login">
      <i class="fa fa-user-circle mr-1"></i>
      <a class="ml-2">{{user.name}}</a>
      <a (click)="logout()"> logout</a>
    </div>
  ```

```javascript
    @Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
    })
    export class HeaderComponent {

      // BOA PRATICA!!! Usar o simbolo "$" indica que a variavel vai receber um valor vindo de um Observable
      user$: Observable<UserInterface>;

      constructor(private userService: UserService, private router: Router) {
        this.user$ = userService.getUser();
      }

      logout() {
        this.userService.logout();
        this.router.navigate(['']);
      }
    }
  ```

### 5.4 - Router Guards
  * O guarda de rotas serve para darmos consistência para nossa aplicação, liberando acesso apenas para as rotas que fazem sentido para nosso usuário.
  ```javascript
        @Injectable({ providedIn: 'root' })
      export class AuthGuard implements CanActivate {

        constructor(private userService: UserService, private router: Router) {

        }
        canActivate(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
          if (this.userService.isLogged()) {
            this.router.navigate(['user', this.userService.getUserName()])
            return false;
          }
          return true;
        }
      }
  ```

## 6 - Validação do formulário

#### 6.1 - Atribuindo um form aos atributos
  * - Acessando valores do form por atributos no componente
  * Primeiro criamos a tag no form e passamos o form como parametro via *databind*
  * No HTML temos o data bind singupForm e o atributo email
  * Para cada validador de email invocamos na linha ```<app-vmessage>``` *(cat-status-code/src/app/shared/components/vmessage/vmessage.component.spec.ts)*
  ```html
    <form [formGroup]="singupForm" class="form mt-4">
    <div class="form-group">
      <input formControlName="email" placeholder="email" class="form-control" autofocus>
      <app-vmessage *ngIf="singupForm.get('email').errors?.required" text="Email is required"></app-vmessage>
      <app-vmessage *ngIf="singupForm.get('email').errors?.email" text="Email is not valid"></app-vmessage>
    </div>
    ...
  ```
 * E no componente que for usar este form teremos os valores do html na seguinte maneira, o singupForm no construtor da classe, e o atributo email ( vinculado no form por via do ```formControlName="email"``` ) chamando os métodos do ```Validators```

 ```javascript
  export class SingUpComponent implements OnInit {


  singupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.singupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email,
        ]
      ],
      //...
  ```
  
#### 6.2 - Criando o proprio validador
  * - Como criar e utilizar nosso proprio validador
  - Substituindo o pattern de ```Validators.pattern(/^[a-z0-9_\-]+$/),``` por ```lowerCaseValidator```
  - primeiro criamos nossa funcao que sera exportada como o novo validador  *(cat-status-code/src/app/shared/validators/lower-case.validator.ts)*
  ```javascript
      import { AbstractControl } from '@angular/forms'

      export function lowerCaseValidator(control: AbstractControl) {

        if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
          return {
            lowerCaseAtributeValidator: true
          }
        }
        return null;
      }
  - no form vamos utilizar o atributo ```lowerCaseAtributeValidator``` como vinculo para ser feita a validacao
  - ```html
  <div class="form-group">
    <input formControlName="userName" placeholder="user name" class="form-control">
    <app-vmessage *ngIf="singupForm.get('userName').errors?.lowerCaseAtributeValidator" text="Must be lower case"></app-vmessage>
  ```
 - no component apenas substituimos o  ```Validators.pattern(/^[a-z0-9_\-]+$/),``` por ```lowerCaseValidator```
 - ```javascript
         userName: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]
      ],
   ```

## - 6 - Validador assíncrono
  
### 6.1 - validação assíncrona
  * A validação assíncrona é feita para o campo ```userName```, isso porque o validador foi definido como terceiro parâmetro da propriedade ```userName```:
 
  ```javascript
    userName: ['',
        [
            Validators.required,
            lowerCaseValidator,
            Validators.minLength(2),
            Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
    ],
  ```
  * Se a gente reparar o retorno da função ```checkUserNameTaken```:

  - ```.pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))```
  - Repare que se o isTaken retornado pela API é true, a gente retorna um objeto onde a propriedade é userNameTaken e seu valor será true, senão, a gente retorna null. Esse ```{ userNameTaken: true }``` é o ```.userNameTaken``` utilizado no template do componente, ou seja: ```*ngIf="singupForm.get('userName').errors?.userNameTaken"```
  
  ```javascript
    @Injectable({
      providedIn: 'root'
    })
    export class UserNotTakenValidatorService {

      constructor(private singupService: SingUpService) { }

      // control.valueChanges retorna um observable, 
      // o observable pode receber um pipe, 
      // o primeiro pipe a cada digito vai aguardar 300 milisegundos para fazer a verificaçao do nome digitado
      // o segundo pipe executa um switchMap invocando a funcao checkUserNameTaken
      // o terceiro executa um map validando se o retorno da anterior foi verdadeiro, se sim retorna o objeto com userNameTaken igual a true
      // e por fim o metodo first() executa assim que que o primeiro resultado encontrado for verdadeiro
      checkUserNameTaken() {
        return (control: AbstractControl) => {
          return control
            .valueChanges
            .pipe(debounceTime(300))
            .pipe(switchMap(userName => this.singupService.checkUserNameTaken(userName)))
            .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
            .pipe(first())
        }
      }
    }
  ```
#### 6.2 - entendendo map e switchMap 
  * **map**
  - O operador do map é o mais comum de todos. Para cada valor que o Observable emite, você pode aplicar uma função na qual pode modificar os dados. O valor de retorno será, nos bastidores, reemitido como um Observable novamente para que você possa continuar a usá-lo em seu fluxo. Ele funciona da mesma forma que você usaria com Arrays. A diferença é que os Arrays sempre serão apenas Arrays e, ao mapear, você obtém o valor do índice atual no Array. Com Observables, o tipo de dados pode ser de todos os tipos. Isso significa que você pode ter que fazer algumas operações adicionais em sua função de mapa observável para obter o resultado desejado.
  - Ex.:
    - 
    ```javascript
      import { of } from 'rxjs'; 
      import { map } from 'rxjs/operators';

      // lets create our data first
      const data = of([
        {
          brand: 'porsche',
          model: '911'
        },
        {
          brand: 'porsche',
          model: 'macan'
        },
        {
          brand: 'ferarri',
          model: '458'
        },
        {
          brand: 'lamborghini',
          model: 'urus'
        }
      ]);

      // get data as brand+model string. Result: 
      // ["porsche 911", "porsche macan", "ferarri 458", "lamborghini urus"]
      data
        .pipe(
          map(cars => cars.map(car => `${car.brand} ${car.model}`))
        ).subscribe(cars => console.log(cars))

      // filter data so that we only have porsches. Result:
      // [
      //   {
      //     brand: 'porsche',
      //     model: '911'
      //   },
      //   {
      //     brand: 'porsche',
      //     model: 'macan'
      //   }
      // ]
      data
        .pipe(
          map(cars => cars.filter(car => car.brand === 'porsche'))
        ).subscribe(cars => console.log(cars))

      // the result will be
      ["porsche 911", "porsche macan", "ferarri 458", "lamborghini urus"]
      0: "porsche 911"
      1: "porsche macan"
      2: "ferarri 458"
      3: "lamborghini urus"
    ```
  * **switchMap**
    - SwitchMap tem comportamento semelhante no sentido de que também se inscreve no Observable interno para você. No entanto, switchMap é uma combinação de switchAll e map. SwitchAll cancela a assinatura anterior e assina a nova. Para o nosso cenário em que queremos fazer uma chamada de API para cada item na matriz do Observable ‘externo’, switchMap não funciona bem, pois irá cancelar as primeiras 3 assinaturas e só lida com a última. Isso significa que obteremos apenas um resultado.
  - 
    ```javascript
      import { of, from } from 'rxjs'; 
      import { map, delay, switchAll, switchMap } from 'rxjs/operators';

      const getData = (param) => {
        return of(`retrieved new data with param ${param}`).pipe(
          delay(1000)
        )
      }

      // using a regular map
      from([1,2,3,4]).pipe(
        map(param => getData(param))
      ).subscribe(val => val.subscribe(data => console.log(data)));

      // using map and switchAll
      from([1,2,3,4]).pipe(
        map(param => getData(param)),
        switchAll()
      ).subscribe(val => console.log(val));

      // using switchMap
      from([1,2,3,4]).pipe(
        switchMap(param => getData(param))
      ).subscribe(val => console.log(val));

      // the result will be
      // retrieved new data with param 1
      // retrieved new data with param 2
      // retrieved new data with param 3
      // retrieved new data with param 4
      // retrieved new data with param 4
      // retrieved new data with param 4
      
    ```

## - 7 - Criando um formulario para fazer upload de imagens

### 7.1 - Criando o formulario de upload de imagem
  - 
  ```html
    <div class="container">
      <form [formGroup]="photoForm" class="row">
        <div class="col-md-6 text-center">
          <input formControlName="file" type="file" accept="image/*">
          <app-vmessage text="Please select a photo" *ngIf="photoForm.get('file').errors?.required">
          </app-vmessage>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <textarea formControlName="description" class="form-control form-control-sm"
              placeholder="photo description"></textarea>
              <app-vmessage text="Max length is 300" *ngIf="photoForm.get('description').errors?.maxlength">
              </app-vmessage>
          </div>

          <div class="form-group">
            <label class="text-muted">
              Allow comments
              <input formControlName="allowComments" type="checkbox">
            </label>
          </div>

          <button [disabled]="photoForm.invalid" type="submit" class="btn btn-primary btn-block">
            Upload
          </button>

          <a class="btn btn-secondary btn-block">Cancel</a>
        </div>
      </form>
    </div>
  ```

### 7.2 - Criando validacoes para o form de upload de imagens
  - Com o form ja criado agora precisamos no ngOnit do nosso componente pegar os campos do formulario e criar suas respectivas validacoes 
  - 
  ```javascript
      @Component({
        selector: 'app-photo-form',
        templateUrl: './photo-form.component.html',
        styleUrls: ['./photo-form.component.css']
      })
      export class PhotoFormComponent implements OnInit {

        photoForm: FormGroup;

        constructor(private formBuilder: FormBuilder) { }

        ngOnInit(): void {
          this.photoForm = this.formBuilder.group({
            file: ['', Validators.required],
            description: ['', Validators.maxLength(300)],
            allowComments: [true]
          })
        }
      }
   ```
    
### 7.3 - Obtendo os dados do formulario ( recebendo a imagem para upload )
  - Em nosso arquivo html crie um data-bind para o evento ```(submit)="upload()"``` e criamos uma propriedade do tipo File. No html ( no momento em que a imagem é selecionada ) atribuimos todas as suas informacoes ( que sao retornadas atraves de um array ) a variavel file criada no componente. No html fica assim
  - 
    ```html
      <input formControlName="file" type="file" accept="image/*" (change)="file = $event.target.files[0]">
    ```
  - E em nosso componente crie o evento ```upload()```
  - 
    ```javascript
      upload(){
        // Este metodo "this.photoForm.getRawValue();" traz todas as propriedades de uma unica vez do formulario
        const photoFormdata = this.photoForm.getRawValue();
        photoFormdata.file = this.file;
        console.log(photoFormdata)
      }
    ```

### 7.4 - Invocando o servico de upload 
  -  Dentro da classe de servico de foto ( photo-service ) adicionamos um novo metodo para upload
  - 
    ```javascript
        upload(description: string, allowComments: boolean, file: File){
    
        const formData = new FormData();
        //description ---> nome da propriedade definido no backend ( server em node )
        formData.append('description', description);
        //allowComments ---> nome da propriedade definido no backend ( server em node )
        formData.append('allowComments', description.toString());
        //imageFile ---> nome da propriedade definido no backend ( server em node )
        formData.append('imageFile', file);

        return this.http.post(API + 'photos/upload', formData)
      }
    ```
    - Em nosso componente photo-form-component adicionamos a chamada do servico de photo-serice invocando o metodo upload, e a propriedade router para redirecionar para a pagina inicial assim que upload for feito.
    - 
      ```javascript
        this.photoService
        .upload(photoFormData.description, photoFormData.allowComments, photoFormData.file)
        .subscribe(() => this.router.navigate(['']))
      ```
    - Por fim alteramos o metodo do photo-component para exibir nossa foto corretamente. Se a url retornada pela api for diferente do padrao ```https://http.cat/images/``` entao adicionamos a url para a imagem feita upload.
    - 
      ```javascript
      const CLOUD = 'http://localhost:3000/imgs/'

      @Component({
        selector: 'app-photo',
        templateUrl: './photo.component.html',
        styleUrls: ['./photo.component.css']
      })
      export class PhotoComponent {

        private _url = '';
        
        @Input() set url(url: string) {
          if (!url.startsWith('https://http.cat/images/')) {
            this._url = CLOUD + url;
          } else {
            this._url = url;
          }
        }

        get url() {
          return this._url;
        }
      ```
--- 
--- 
--- 


  * OBS: 

    1 - Executar o comando ```npm install bootstrap```

    2 - Importar o boostrap em *angular.json* adicionando dentro de *style* a linha ```"./node_modules/bootstrap/dist/css/bootstrap.min.css"```

    3 - Para corrigir o erro *"“Experimental support for decorators is a feature that is subject to change in a future release. Set the ‘experimentalDecorators’ option in your ‘tsconfig’ or ‘jsconfig’ to remove this warning.”* no VsCode.

      - Vá em ```File => Preferences => Settings``` e pesquise por ```javascript.implicitProjectConfig.experimentalDecorators```

      - De um *check* na caixa que está relacionada a ```Enable/disable experimentalDecorators for JavaScript ...``` - [Stackoverflow - Decorators error in VS code editor after upgrading to Angular 10](https://stackoverflow.com/questions/62614633/decorators-error-in-vs-code-editor-after-upgrading-to-angular-10)
