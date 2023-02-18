# WE:DIGITEK API

## Tecnologias
- NodeJS & TypeScript
- Express
- Jest
- OpenAPI Doc
- Docker

**OBS**: Endereço URL da API é `http://localhost/3000/api`

---

### Docker
Se caso preferir, execute o comando do Docker para subir a aplicação
```shell
$ docker-compose up -d
```

### Sem Docker

#### Configuração inicial
Fazer uma cópia do arquivo `.env.example` para `.env` e verificar se as variáveis estão configuradas corretamente para o ambiente local

#### Executando o projeto
Primeiramente, é necessário instalação dos dependênncias, para isso execute:
```shell
$ npm install
```

Após instalar as dependências, para iniciar o servidor no modo **desenvolvimento**, execute:

```shell
$ npm run start:dev
```

#### Rotas de verificação
No projeto, existem 2 rotas, sendo:
- GET `/`
- GET `/healthcheck`

Elas são importantes, pois a rota raíz inicia o projeto com uma resposta `200`. A de healthcheck para que, futuramente caso queira investigar se a API está **on**, este é endpoint padrão


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

#### Todos os testes
```shell
$ npm run test
```