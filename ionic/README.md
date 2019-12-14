# ionic


---

#### Parte 1 
**Alterações básicas e página inicial**
 - Comandos do ionic para iniciar o primeiro app
 
    - ***ionic start meuApp tabs***
    
          - ionic:  proprio comando do ionic
          
          - start:  comando para iniciar um app
          
          - meuApp: nome do app e da pasta
          
          - tabs:   template para usar na sua aplicação
          

 - Usando tags do ionic
 - Pagina html inicial
 - Titulo
 - Endereço da concessionária sempre visivel ( rodapé )
 - [Documentação ionic](https://ionicframework.com/docs)
 - [Footer - Documentação ionic](https://ionicframework.com/docs/api/footer)
 - Executando a aplicação com ```$ ionic serve --lab``` ( instalar caso não houver npm i -g ionic-lab )
 
 ```html
<ion-header>
  <ion-toolbar>
    <ion-title>
      Ionic
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div class="ion-padding">
  
    <ion-list>
      <ion-item> Nissan Skyline R34 GT-R 1999 V·Spec</ion-item>
      <ion-item> Honda NSX Type-R 1992 Sportscar </ion-item>
      <ion-item> Lamborghini Diablo SV 1995 Supercar </ion-item>
      <ion-item> Mazda RX-7 Spirit R 2002 Coupe </ion-item>
    </ion-list>

  </div>
</ion-content>

<ion-footer>
  <ion-toolbar>
    <ion-title>WeWork - Rua Butantã - Pinheiros</ion-title>
  </ion-toolbar>
</ion-footer>
```

---

#### Parte 2
**Um pouco sobre Ionic CLI**
 - A CLI (Command Line Interface) do Ionic framework simplifica o processo de criação de páginas.
 - Comando para executar o ionic cli ---> ```ionic generate page fedd``` ou ```ionic generate page login```
 - Com isso ele gera toda a estrutura necessária para a página de feed / login do nosso aplicativo.

#### Parte 3 
**Atualizando nossa pagina de feed**
- Apos gerar a estrutra de feed e adicionar o template escolhido na [documentação](https://ionicframework.com/docs/v3/components/#advanced-cards), vamos adicionar mais uma aba novo em nosso app para exibir o feed e seu conteudo.