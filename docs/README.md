# 🏗️ Desafio Fullstack Integrado

## 🎯 Objetivo
Criar solução completa em camadas (DB, EJB, Backend, Frontend), corrigindo bug em EJB e entregando aplicação funcional.

## 📦 Estrutura
- db/: scripts schema e seed
- ejb-module/: serviço EJB com bug a ser corrigido
- backend-module/: backend Spring Boot
- frontend/: app Angular
- docs/: instruções e critérios
- .github/workflows/: CI

## ✅ Tarefas do candidato
1. Executar db/schema.sql e db/seed.sql
2. Corrigir bug no BeneficioEjbService
3. Implementar backend CRUD + integração com EJB
4. Desenvolver frontend Angular consumindo backend
5. Implementar testes
6. Documentar (Swagger, README)
7. Submeter via fork + PR

## Como Executar a Aplicação
Pré-requisitos
Java 17+
Maven 3.9+
Node.js 19+ (para frontend)
npm ou yarn

1. Compilar e Instalar o EJB no repositório
cd ejb-module
mvn clean install

2. Executar Backend
cd backend-module
mvn spring-boot:run

A aplicação estará disponível em: http://localhost:8080

3. Subir o Frontend
cd frontend/app
npm install
npm start
Frontend disponível em: http://localhost:4200

