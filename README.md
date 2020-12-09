# Gobarber Backend

Back-end desenvolvido para um desafio onde deve ser capaz de gerenciar um stock, foi desenvolvido com Node, Typescript, Express, Postgres e JWT.

Este Back-end está integrado com o projeto [Stock Web](https://github.com/iannisacksson/stock-frontend) e também foi realizado o deploy dos dois projetos no Heroku [click qui](https://stock-frontendts.herokuapp.com/) para realizar testes.

O principal objetivo desta API é realizar cadastro de produtos e a partir de algumas entidades pode se gerar um código único para demais variações de um produto tendo melhor identificação dentro de um estoque. Por exemplo, um **_tênis adidas masculino número 39_** pode ser identificado da seguinte forma no estoque **TEN-ADI-MAS-39**.

## Começando

### Pré-requisitos

Para executar este projeto em desenvolvimento, você precisará ter um ambiente básico com o NodeJS instalado (Estou desenvolvendo ele na versão v12.20.0). Para usar o banco de dados, você precisará ter o Postgre instalado e em execução na sua máquina.

Na raiz do projeto é possível encontrar **.env.example** com as variáveis ambientes utilizadas no projeto. É preciso também realizar um modificação no **ormormconfig.js**, basta cópia os dados da **ormconfig.example.js** para ter o funcionanamento correto. A diferença dos arquivos é como precisei enviar para produção mudei os caminhos contidos nele para **./dist**.

### Instalando

#### Clonando o Repositório

```
$ git clone https://github.com/iannisacksson/stock-backend

$ cd stock-backend
```

#### Instalando dependências

```
$ yarn
```

_ou_

```
$ npm install
```

#### Instalando Rodando Migrações

Depois de adicionado as variáveis de ambiente para para conectar ao banco, postgres em execução é preciso rodar as migrations. Para isso basta utilizar um dos comandos abaixo:

```
$ yarn typeorm migration:run
```

_ou_

```
$ npx typeorm migration:run
```

#### Executando o projeto na máquina

Com todas as dependências instaladas, o banco de dados em execução, migrations rodadas e o ambiente configurado corretamente, agora você pode executar o back-end:

```
$ yarn dev:server
```

_ou_

```
$ npm run dev:server
```

Quando estiver em execução no console onde está rodando o projeto irá aparecer a seguinte mensagem "🚀️ Server started on port 3333!"

## Rotas

A URL base quando já rodando em ambiente de desenvolvimento é: [http://localhost:3333/](http://localhost:3333/).

### Rota para se cadastrar na aplicação.

- Rota do tipo **POST** para cadastrato do administrador ou usuário comum.
  [http://localhost:3333/users](http://localhost:3333/users).

### Rota para criar uma sessão

- Rota do tipo **POST** para se autenticar na aplicação passando o e-mail e a senha cadastros na aplicação.
  [http://localhost:3333/sessions](http://localhost:3333/sessions).

- Body:

```
{
  "name": string,
	"email": string,
	"password": string,
	"role": string -> enum = ["admin", "user"]
}
```

### Rota para criar uma categorias de variação

- Rota do tipo **POST** no **body** é preciso de apenas um parâmetro _name_. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/variant-categories](http://localhost:3333/variant-categories).

- Body:

```
{
	"name": string
}
```

### Rota para listar as categorias de variação

- Rota do tipo **GET**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/variant-categories](http://localhost:3333/variant-categories).

### Rota para criar variações de produtos

- Rota do tipo **POST**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/variants](http://localhost:3333/variants).

- Body:

```
{
	"name": string,
	"identifier_code": string,
	"variant_category_id": UUID
}
```

### Rota para listar as variações

- Rota do tipo **GET**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/variants](http://localhost:3333/variants).

### Rota para criar produtos

- Rota do tipo **POST**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/products](http://localhost:3333/products).

- Body:

```
{
	"name": string,
	"identifier_code": string
}
```

### Rota para listar as produtos

- Rota do tipo **GET**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/products](http://localhost:3333/products).

### Rota para mostrar produto

- Rota do tipo **GET**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/products/:product_id](http://localhost:3333/products/:product_id).

### Rota para atualizar produto

- Rota do tipo **PUT**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/products/:product_id](http://localhost:3333/products/:product_id).

- Body:

```
{
	"name": string,
	"identifier_code": string
}
```

### Rota para deletar produto

- Rota do tipo **DELETE**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/products/:product_id](http://localhost:3333/products/:product_id).

### Rota para criar ordem de prioridade da SKU

- Rota do tipo **POST**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/order-skus](http://localhost:3333/order-skus).

- Body:

```
{
	"product_id": string,
	"categories": [
		{
			"variant_category_id": string,
			"priority": string -> enum = ["1", "2", "3"]
		}
	]
}
```

### Rota para mostar ordem de prioridade do produto

- Rota do tipo **GET**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/order-skus/product_id](http://localhost:3333/order-skus/product_id).

### Rota para listar SKUs

- Rota do tipo **GET**. _Precisa ter um token gerado no login e o usuário ser administrador_
  [http://localhost:3333/skus](http://localhost:3333/skus).
