# API Restaurant

Este projeto é uma API RESTful para gerenciamento de pedidos, produtos, mesas e sessões de mesas em um restaurante. Desenvolvido em Node.js com TypeScript, utiliza o Knex.js para integração com banco de dados SQLite.

## Índice
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Migrations e Seeds](#migrations-e-seeds)
- [Rotas da API](#rotas-da-api)
- [Tratamento de Erros](#tratamento-de-erros)
- [Insomnia](#insomnia)
- [Licença](#licença)

---

## Tecnologias Utilizadas
- Node.js
- TypeScript
- Express.js
- Knex.js
- SQLite

## Como Executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute as migrations e seeds:
   ```bash
   npx knex migrate:latest
   npx knex seed:run
   ```
3. Inicie o servidor:
   ```bash
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3000` (ou porta definida).

## Estrutura do Projeto
```
├── knexfile.ts                # Configuração do Knex
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração do TypeScript
├── requests_insomnia.yaml     # Coleção de requisições para Insomnia
└── src/
    ├── server.ts              # Inicialização do servidor Express
    ├── controllers/           # Lógica dos endpoints
    ├── database/              # Banco de dados, migrations e seeds
    ├── middlewares/           # Middlewares globais
    ├── routes/                # Definição das rotas
    ├── utils/                 # Utilitários e classes auxiliares
```

## Migrations e Seeds
- As migrations criam as tabelas: `products`, `tables`, `tables_sessions`, `orders`.
- Os seeds populam as tabelas de produtos e mesas com dados iniciais.
- Localização: `src/database/migrations` e `src/database/seeds`.

## Rotas da API
As rotas estão organizadas por recurso:
- `/products` — Gerenciamento de produtos
- `/tables` — Gerenciamento de mesas
- `/tables-sessions` — Sessões de mesas (abertura/fechamento)
- `/orders` — Gerenciamento de pedidos

Consulte o arquivo `requests_insomnia.yaml` para exemplos de uso e testes das rotas.

## Tratamento de Erros
- Os erros são tratados globalmente pelo middleware `error-handling.ts`.
- Utiliza a classe `AppError` para padronizar respostas de erro.

## Insomnia
- O arquivo `requests_insomnia.yaml` contém exemplos de requisições para testar todos os endpoints da API.

