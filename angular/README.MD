Para rodar a aplicação
    - ng serve --open

Entendendo um componente "@Component" / Decorator
    - Arquivo: app.component.ts
    - Abrindo-o, veremos que, basicamente, temos uma classe do ECMAScript 6, com um Decorator anotado com @Component, o qual torna a classe um componente. 
    - O Decorator é uma sintaxe especial do Angular, do TypeScript, em que é possível incluir uma metainformação sobre uma determinada classe, no caso.
    - Ao criarmos instâncias desta classe, criamos objetos. Estamos incluindo mais uma informação desta classe, que diz respeito ao framework. Então, a classe AppComponent só é um componente porque está anotada com @Component. Nele, existe um selector: 'app-root', mesmo nome encontrado em index.html.
    - Este selector nos permite utilizar o componente em templates em sua forma declarativa, então, todo o conteúdo de app.component.ts, sua apresentação, o que ele faz, seu CSS, são acessados por meio dele. Também neste arquivo, há templateUrl: './app.component.html', que informa a apresentação deste componente.


Data Bind
    - Assim como em app.component.ts há title = 'app', existe uma propriedade no componente, no caso chamada title. A fonte de dados é a propriedade do nosso componente, e seu valor é app.
    - O Data binding implica em uma associação de dados com uma fonte de dados que, no nosso caso, está no componente, com seu template (nomenclatura do Angular), ou view. Nele, quando encontramos esta sintaxe chamada de Angular expression (AE), e quando o Angular for renderizar este template do componente, ele se deparará com uma lacuna, que neste caso está apontando para a propriedade title.
    - Esta propriedade existe em app.component.ts, então o Angular acessará seu valor e o jogará no template.

One Way Data Bind
    - Para realizar o Data binding de um atributo HTML é necessário envolvelos em colchetes. E então, setaremos seus valores como o nome do componente correspondente:

   ```javascript 
    <h1>{{ title }}</h1>
    <img [src]="url" [alt]="title">
   ```

   - O que acabamos de fazer é denominado One way data binding ("data binding unidirecional"), isto porque os dados saem do componente, da fonte de dados, e vão para o template, no entanto não fazem o caminho contrário.


Adicionando Bootstrap no projeto
    - Primeiro execute o comando npm install bootstrap
    - na sequencia adicione no arquivo angular.json o caminho da onde o bootstrap foi baixado dentro da chave styles ( build/ styles )
    
    ```json
    "styles": [
              "src/styles.css",
              "./node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
    ```
    - recarregue o programa ( no terminal execute o comando ```ng serve --open``` )

Criando um componente
    - Para a geracao do primeiro componente seguimos alguns padroes do Angular
    - 1: o nome do arquivo deve sempre conter o nome xxx.componente.ts e/ou xxx.componente.html
    - 2: criamos uma pasta para armazenar esses arquivos criados, no projeto darei o nome de photo
    - 3: dentro do arquivo photo.component.ts informo tudo o que sera exibido na tela referente a foto
        
        ```javascript
            import { Component } from '@angular/core';

            @Component({
                selector: 'pic-system-photo',
                templateUrl: 'photo.component.html'
            })
            export class PhotoComponent {
                title = 'pic-system';
                description = 'Metal Gear Solid';
                url = 'https://img.favpng.com/6/18/9/metal-gear-solid...';
            }
        ```
    - 4: para que funcione corretamente vá ao arquivo app.module.ts e informe o novo componente criado
        
        ```javascript
            @NgModule({
            declarations: [
                AppComponent,
                
                // NOVO COMPONENTE CRIADO
                PhotoComponent
            ],
        ```
    - 5: e por fim dentro do arquivo app.component.html informe o selector (a tag) do seu componente ```<pic-system-photo></pic-system-photo>```
        ```javascript
           // arquivo photo.component.ts
            @Component({
                selector: 'pic-system-photo',
        ```

Inbound properties: passando dados para o componente
    - para usarmos o nosso componente de foto criado informando valores a ele usamos a propriedade inbound properties
    - na nossa classe photo.component.ts remova os valores fixos da url e description da foto e adicione a seguinte anottation ```@Input()```
    - o ```@Input()``` faz com que ele receba o valor da url e da descricao da foto no momento em que a tag do componente da foto for utilizado.
    - fica assim:
        ```html
        <pic-system-photo url="https://i.pinimg.com/originals/bb/a8/1e/bba81eb389b952e4dc0a75ae540858b7.jpg" description="Solid Snake"></pic-system-photo>
        ```
    - pra cada tag do nosso componente agora utilizado, podemos informar a url e a descricao na sua chamada.
    - se tentarmos usar o data-binding, ou seja, usando desta maneira ```[url] = "https://i.pinimg..."``` o valor dentro das aspas se torna o nome da propriedade dentro da classe da qual contem o valor real da url da foto. Entao ele vai buscar uma propriedade chamada "https://i.pinimg" e não vai funcionar.
    - no componente html da foto ( photo.component.html ) os valores continuam sendo o mesmo pois para gerar a imagem ele vai buscar dentro das propriedades URL e DESCIPTION os valores para montar a foto. ( Valores que estao sendo informados na criacao / utilizacao do componente criado )
        ```html
        <img class="img-thumbnail" [src]="url" [alt]="description">
        ```

Criando um feature module
    - vamos agora organizar nossa aplicação concentrando todo e qualquer componente criado referente a foto dentro de um modulo chamado photos.module.ts
    - criamos uma pasta raiz chamada photos e adicionamos nosso direotorio ja criado photo dentro dela
    - criamos o seguinte arquivo: photos.module.ts, esse deve estar na pasta raiz photos
    - o arquivo deve ficar da seguinte maneira
    ```javascript
        import { NgModule } from '@angular/core';
        import { PhotoComponent } from './photo/photo.component';

        @NgModule({
            declarations: [PhotoComponent],
            exports: [PhotoComponent]
        })

        export class PhotosModule { }
    ```
    - explicando as declarações
        declarations: dentro desta lista fica todos os componentes criados referente a foto que vão se comunicar entre si, que precisam ser enxergados entre si.
        exports: dentro desta lista declaro apenas os componentes que eu quero que sejam exportados, sendo assim que usar meu novo modulo criado vai enxergar apenas os componentes declarados dentro desta lista
    - por fim alteramos nosso arquivo app.module.ts, removendo o componente importado diretamente e importando o nosso novo modulo criado. O arquivo fica assim
    ```javascript
        //Componentes criados
        import { PhotosModule } from './photos/photos.module';


        @NgModule({
        declarations: [
            AppComponent
        ],

        imports: [
            BrowserModule,

            //MODULO CRIADO COM OS COMPONENTES INCLUSOS DE FOTOS
            PhotosModule
        ],
  ```

A diretiva ngFor
 - A diretiva nGfor serve como um laço para iterar cada foto da lista de fotos.
 ```javascript
    <pic-system-photo *ngFor="let photo of photos" [url]="photo.url" [description]="photo.description"></pic-system-photo>
 ```