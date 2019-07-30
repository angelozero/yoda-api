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

#### CSV File
```javascript
    João Fulano,123.456.789-00,21 de Maio de 1993,(21) 3079-9987,Rua do Ouvidor,50,20040-030,Rio de Janeiro
    Maria Fulana, 98765432100,11 de Abril de 1995,(11) 933339871,Rua Vergueiro,3185,04101-300,São Paulo
    denise teste, 987.654.321.00,28 de Dezembro de 1991,(31)45562712,SCS Qd. 8 Bl. B-50,11,70333-900,Rio Grande
    cnpj teste 88.299.218/0001-30
```
