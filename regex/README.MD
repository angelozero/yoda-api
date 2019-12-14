# Regex

#### meta-char / quantifier

   - Meta-char possuem significados especiais, como o ponto (```.```) ou asterisco (```*```). Neste primeiro exemplo vamos focar no CPF.
   
   - Uma linha de exemplo para nossa consulta ```João Fulano,123.456.789-00,21 de Maio de 1093,(21) 3079-9987,Rua Buarque de Macedo,67,22220-232,Rio de Janeiro```
    
   - Para extrair um cpf,  que são 9 números, separados em blocos de 3 números por um ponto, mais um hífen e mais dois números, fazemod da seguinte forma. Para representar um número, podemos utilizar uma ```caracter class```, que é um símbolo especial para representar um conjunto de caracteres. Em regex, um número é representado pelo ```\d```
   
   - Para extrair exatamente 3 números, definimos a expressão por ```\d{3}```. Dentro das chaves definimos a quantidade que o caractere deve estar presente. Com isso, já podemos encontrar 3 dígitos. Agora vem o "ponto" só que aprendemos que esse caractere possui um significado especial. Para deixar claro que o ponto deve ser ponto apenas, é preciso escapar o caractere com ```\```
    
      - Para um CPF 123.456.789-00,21:
        - ```\d{3}\.\d{3}\.\d{3}\-\d{2}```
     
     - Para um CNPJ 88.299.218/0001-30:
       - ```\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}```
    
      - Para um numero IP (126.1.112.34 / 128.126.12.244 / 192.168.0.34):
        - ```\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}```
    
      - Para um telefone (21) 3216-2345:
         -  ```\(\d{2}\) \d{4}-\d{4}```
    
      - Uma classe de caracteres predefinida é ```\d```, que significa qualquer dígito.
    
      - Existem vários meta-char, como ```.``` ou ```*```.
    
      - Existem quantifiers que definem quantas vezes um caractere deve aparecer:
        - ```{1}``` é um quantifier que significa uma vez.
        - ```*``` é um quantifier que significa zero, uma ou mais vezes
        - ```.``` é um meta-char que significa qualquer char.
    
      - Com ```\``` podemos escapar meta-chars, por exemplo ```\..```


---

#### Classes de Caracteres
   - E para um cpf neste formato ? ```cpf teste 11122233300``` 

   - Nos exemplos anteriores já vimos uma classe predefinida, o ```\d```. Essa classe na verdade é apenas um atalho para ```[0-9]```, ou seja de zero até nove. Os colchetes definem uma classe de caracteres e nada impede que criemos nossa própria classe.
   
   - Na décima segunda posição do CPF pode vir um ponto ou hífen, que podemos declarar com a classe: ```[.-]```. Lembrando que dentro dos colchetes o ponto já possui o seu valor literal, ou seja, não ha a necessidade de colocar uma ```\```(barra).

---

#### Caracteres opcionais

   -  A quantidade de vezes que essa classe de caracteres deve aparecer é definida por um quantifier, por exemplo:

       - ```[.-]*``` --- ponto ou hífen zero, uma ou mais vezes.

       
       - ```[.-]{1}``` - ponto ou hífen uma vez.

   - Nos exemplos ```[.-]``` é opcional, pode ter ou não ter, mas uma vez apenas. Dentro da regex, isso é declarado através do meta-char ponto de interrogação ```(?)```. O ponto de interrogação ```(?)```, que significa zero ou uma vez, é mais um ```quantifier```.

   - Assim podemos combinar a classe ```[.-]``` com o quantifier ```?```:

        - ```[.-]?``` - ponto ou hífen zero ou uma vez.

   - A regex final fica assim:
      - ```\d{3}[.-]?\d{3}[.-]?\d{3}[.-]?\d{2}```

   - Para a linha a seguir extrair apenas ```<code>``` e ```</code> ```

```
   No <code>for</code>, o valor de <code>i</code> começa de zero e é incrementado a cada volta enquanto <code>i < 10</code>,  portando o bloco de código do for é executado 10 vezes.
```

   - A regex utilizada é:  ```</?code>```. Repare que usamos o meta-char ```?``` para sinalizar que o ```/``` é opcional.

   - Exemplo.: Para definir a classe correta para os números entre 1 e 3 E 6 e 9 usamos a seguinte regex:```[1-36-9]```

   - Classe para espaços dentro de uma regex: ```\s.``` , \s significa whitespace. 

   - Para uma regex com dia (numerico) mes e ano fica assim:
    
      - 11 de Abril de 1995 ---> ```[0123]?\d\s+de\s+[A-Z][a-zç]{1,8}\s+de\s+[12]\d{3}```

   - Para uma regex de horario:

      -  *9h32min16s* ---> ```\d{2}h\d{2}min\d{2}s``` ou ```[0-9]{2}h[0-9]{2}min[0-9]{2}s```

   - Para uma placa de carro:
      
     - *KMG-8089* ---> ```[A-Z]{3}\-\d{4}```

  - Para trazer as notas dos alunos apenas de 7.2 a 7.9
     -  *9.8 - Robson, 7.1 - Teresa, 4.5 - Armênio, 6.5 - Zulu, 7.7 - Stefania, 7.8 - João, 5.0 - Romeu, 7.2 - Pompilho, 3.1 - Reinaldo, 7.3 - Bernadete, 4.7 - Cinério*
     
    - Para pegar todo mundo que comece com nota 7, 
      - ```7\.```

   - Lembre-se que precisamos escapar o . usando um \ antes por ele ser um meta char. Agora, vamos definir nossa própria classe usando colchetes. Nela, precisamos aceitar somente um número de 2 a 9, com isso temos as possibilidades 7.2,7.3,7.4,7.5,7.6,7.7, 7.8 e 7.9.
      - ```7\.[2-9]```

   - Sabemos que depois do número, temos um espaço e um hífen seguido de espaço:
     - ```7\.[2-9]\s+-\s+``` 

   - Por fim, depois do hífen queremos pegar qualquer quantidade de caracteres, por isso usaremos o atalho de classe \w que pega qualquer dígito, seja ele letra ou número:
      - ```7\.[2-9]\s+-\s+\w+```
        
   - Trazendo apenas  *SERROTE GARROTE* e *ROTEIRO*   
      - *BALEIRO GARROTE SERROTE GOLEIRO ROTEIRO* ---> ```[A-Z]*ROT[A-Z]+```. Usamos a classe de caracteres [A-Z] porque queremos lidar apenas com todos as letras em maiúsculo. Além disso, na primeira parte da expressão temos [A-Z]*, usamos o quantifier * que indica zero ou mais vezes. Por fim temos [A-Z]*ROT[A-Z]+


   - Regex com caracteres especiais
      - *?classes+poderosas* --->  ```[a-z?*+]+```


   - Regex para 
      - O limite é de 10 caracteres;
      - O primeiro caractere deve ser uma letra do alfabeto, não pode ser um número;
      - A partir do segundo caractere podemos ter letras maiúsculas, minúsculas e números;

      - ```[a-zA-Z][a-zA-Z0-9]{0,9}```

   - Como podemos melhorar essa regex para data ? 
      - ```[0123]?\d\s+de\s+[A-Z][a-zç]{1,8}\s+de\s+[12]\d{3}```

   - Uma forma fácil de melhorar a legibilidade seria usar algumas variáveis auxiliares, que deixam claro o que estamos definindo, por exemplo no JavaScript podemos criar 4 variáveis:

```javascript
var DIA  = "[0123]?\d"; 
var _DE_ = "\s+de\s+";
var MES  = "[A-Za-z][a-zç]{1,8}";
var ANO  = "[12]\d{3}";
```

   - Repare que cada variável representa uma parte da regex. Depois disso é só concatenar esses variáveis para ter a expressão final:
      - ```var stringRegex = DIA + _DE_ +  MES + _DE_ + ANO;```
      
   - Essa string passamos para a regex engine do JavaScript:

      - ```var objetoRegex  = new RegExp(stringRegex, 'g');```   

---


#### Ancoras

   - Uma âncora não seleciona um caractere, ela seleciona apenas uma posição no texto alvo. Ou seja, a âncora \b sozinha devolve nada (zero-length) mas combinada com um valor literal, ou outra regex, podemos finalmente definir como encontrar a preposição de:

   ```\bde\b```

   - Abaixo temos uma sequância de letras a e queremos selecionar as sequências com três a (a{3}):

      - ```aaa aaaa aaa aaaa aaa```

      - a{3}
         *aaa* *aaa*a *aaa* *aaa*a *aaa*
      - a{3}\b
         *aaa* a*aaa* *aaa* a*aaa* *aaa*
      - \ba{3}\b
         *aaa* aaaa *aaa* aaaa *aaa*

   - Uma âncora não casa caracteres como as classes fazem, e nem definem quantidades. Âncoras marcam uma posição específica no alvo, por isso não é possível combiná-las com um quantifier.

   - Existem várias âncoras predefinidas, mas as mais comuns são ^, $ e \b. Lembrando também que os caracteres ^ e $ são meta-chars.

   - Usando as ancoras nessa linha conseguimos pegar o começo determinado pela palavra *file* e que contenha o fim *.html*
       
       - ```file:///Users/nico/Downloads/regex/index.html```
       
       - ```^file.+html$```


   - A regex abaixo capturaria exatamente as strings de data que seguem o modelo: Data: dia/mes/ano ou Data:dia/mes/ano
      
      - Alvos: Data: 02/09/1964 ou Data:02/09/1964.

      - Regex ```^Data:[\s]?[0-9]{2}\/[0-9]{2}\/[0-9]{4}$```


   - Existe a inversão do \b, o non-word-boundary: \B (B maiúsculo).  A silaba por deve aparecer dentro de uma palavra, nunca no inicio ou fim

      - Alvo: português proporcional compor

      - Pattern: \Bpor\B

      - português pro*por*cional compor
       

#### non-capturing groups

   - Novamente usaremos o simbolo ?, mas agora no início do grupo junto com os dois pontos, por exemplo para a preposição de: (?:de\s+)?

   - Aplicando isso na regex inteira, no alvo 21 de Maio de 1993:

   - ```([0123]?\d)\s+(?:de\s+)?([A-Z][a-zç]{1,8})\s+(?:de\s+)?([12]\d{3})```

   - Isso devolve os grupos:

   - ```21 de Maio de 1993 ||| 21 ||| Maio ||| 1993```

   
---

#### backreferences

   - Quando a tag inicial for uma h1, no final também deve estar uma h1, igualmente para a tag h2. Essa dependência podemos definir através de back-references, uma referência para um texto já encontrado. A sintaxe é simples, usa-se um \ seguido pelo número do grupo, começando com 1.

   - Nessa regex, a tag é definida no primeiro grupo ```(h1|h2)```. Ou seja, vamos usar a back-reference \1:


   - ```<(h1|h2).+?>([\w\sõãí.]+)<\/\1>```

   - ```<h1 id="regex" class="form">Expressões regulares .</h2>```

   
---

#### CSV File
```javascript
    João Fulano,123.456.789-00,21 de Maio de 1993,(21) 3079-9987,Rua do Ouvidor,50,20040-030,Rio de Janeiro
    Maria Fulana, 98765432100,11 de Abril de 1995,(11) 933339871,Rua Vergueiro,3185,04101-300,São Paulo
    denise teste, 987.654.321.00,28 de Dezembro de 1991,(31)45562712,SCS Qd. 8 Bl. B-50,11,70333-900,Rio Grande
    cnpj teste 88.299.218/0001-30
```
