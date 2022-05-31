# boleto-validator

## **Instruções**

O teste consiste em escrever um programa em Node.js que expõe uma API na qual é dada
como entrada uma linha digitada de um boleto e que retorna:

**status**: 200 para linha válida ou 400 para linha inválida  
**amount**: O valor do boleto, se existir  
**expirationDate**: A data de vencimento do boleto, se existir  
**barCode**: Os 44 dígitos correspondentes ao código de barras desse boleto  

Deverá ser utilizado apenas o método GET e o path deve ser configurado como
''http://localhost:8080/boleto/xxxxxx''.

*Exemplo de resquest*

*GET/ http://localhost:8080/boleto/21290001192110001210904475617405975870000002000*

*Exemplo de response*

*status 200*
```json
{
  "barCode": "21299758700000020000001121100012100447561740",
  "amount": "20.00",
  "expirationDate": "2018-07-16"
}
```

Documentações com as regras de negócios:
* [Documentação Título](https://storage.googleapis.com/slite-api-files-production/files/b8def5e9-f732-4749-88ea-25270cb71c4d/Titulo.pdf)
* [Documentação Convênio](https://storage.googleapis.com/slite-api-files-production/files/222c4ec7-9056-4149-aa42-e66b135f523a/Convenio.pdf)

---
## **Execução e Teste**
Para a construção da API, foi utilizado o framework **Express.js**.  
E a versão do Node.js utilizada foi a **v14.17.0**.

Para instalar as dependências:
```console
yarn install
```

Para iniciar a API:
```console
yarn start
```

Para testar a API:
```console
yarn test
```

>Como gerenciador de pacote, você pode usar tanto o **yarn** como o **npm**

---
## **Paths**
Segue alguns paths para ajudar nos testes:
* [Título Bancário](http://localhost:8080/boleto/21290001192110001210904475617405975870000002000)
* [Pagamento de Concessionária](http://localhost:8080/boleto/836200000005790400403313033854278034100956129439)

>Lembre-se de inciar a API!
