# WE:DIGITEK API

### Tecnologias
- NodeJS & TypeScript
- Express
- Jest
- OpenAPI Doc

### Setup

#### Configuração inicial
Fazer uma cópia do arquivo `.env.example` para `.env` e verificar se as variáveis estão configuradas corretamente para o ambiente local

#### Executando o projeto
Para iniciar o servidor no modo **desenvolvimento**, execute

```shell
$ npm run start:dev
```

### Documentação da API
A documentação dos endpoints podem ser acessados em `http://localhost/3000/docs`

### Executando os testes
Crie um arquivo `.env.test` antes de executar os testes, e, se necessário, configure as variáveis de ambiente.

#### Testes unitários

```shell
$ npm run test:unit
```

#### Testes e2e
```shell
$ npm run test:e2e
```

### Todos os testes
```shell
$ npm run test
```