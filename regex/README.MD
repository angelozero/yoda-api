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

   - Para a linha a seguir extrair apenas *<code>* e *</code>* ```No <code>for</code>, o valor de <code>i</code> começa de zero e é incrementado a cada volta enquanto <code>i < 10</code>, portando o bloco de código do for é executado 10 vezes.``` 

    - A regex utilizada é:  ```</?code>```. Repare que usamos o meta-char ```?``` para sinalizar que o ```/``` é opcional.

    - Exemplo.: Para definir a classe correta para os números entre 1 e 3 E 6 e 9 usamos a seguinte regex:
       
       - ```[1-36-9]```

---

#### CSV File
```javascript
    João Fulano,123.456.789-00,21 de Maio de 1993,(21) 3079-9987,Rua do Ouvidor,50,20040-030,Rio de Janeiro
    Maria Fulana, 98765432100,11 de Abril de 1995,(11) 933339871,Rua Vergueiro,3185,04101-300,São Paulo
    denise teste, 987.654.321.00,28 de Dezembro de 1991,(31)45562712,SCS Qd. 8 Bl. B-50,11,70333-900,Rio Grande
    cnpj teste 88.299.218/0001-30
    cpf teste 11122233300
```
