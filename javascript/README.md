## Curso JavaScript avançado I: ES6, orientação a objetos e padrões de projetos

### 01 - Prólogo: regras, código e manutenção
   - Simples criação de um arquivo js ( [index.js](https://github.com/angelozero/yoda-js/blob/master/javascript/sistema-cadastro/client/js/index.js) ) para manipulação dos dados na tela, manipulação do DOM.


---

### 02 - Especificando uma Negociação

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
         let nome = 'Flávio';
         console.log(i);
    }

    alert(i);
    alert(nome);
</script>
```
- Finalizando:
  - VAR: Declarações com var possuem escopo de função ou global. 
  - LET: Variáveis declaradas com let tem escopo de bloco e o JavaScript lançará um erro se a mesma for declarada mais de uma vez.