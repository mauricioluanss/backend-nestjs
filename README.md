# ServicoGestao — Fase 1

Trabalho de Desenvolvimento de Sistemas Backend, utilizando NestJS, TypeScript, MySQL e TypeORM, com organização em Arquitetura Limpa.

## Executar

Requisitos: Node.js 24, npm e MySQL 8.

```bash
npm ci
mysql -u root -p < src/infraestructure/database/criar-banco.sql
npm run seed
npm run start:dev
```

A conexão MySQL está em `src/infraestructure/database/configuracao.ts`: host `127.0.0.1`, porta `3306`, usuário `gestao`, senha `gestao` e banco `controle-planos-operadora`. O comando SQL precisa de um usuário administrador do banco.

A API estará disponível em `http://localhost:3000/gestao/clientes`. O seed cria pelo menos 10 clientes, 5 planos e 5 assinaturas.

Os PDFs com a arquitetura, diagramas e instruções de execução, junto à coleção Postman, acompanham a pasta `servico-gestao` no pacote de entrega.
