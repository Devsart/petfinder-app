# PetFinder Brasil - Documentação

## Visão Geral
PetFinder Brasil é uma aplicação web fullstack que permite aos usuários registrar seus pets e encontrar pets perdidos. A aplicação foi desenvolvida utilizando React com TypeScript para o frontend e FastAPI para o backend, com SQLite como banco de dados.

## Estrutura do Projeto
```
petfinder-app/
├── backend/
│   ├── venv/                  # Ambiente virtual Python
│   ├── images/                # Diretório para armazenar imagens de pets
│   ├── main.py                # Aplicação FastAPI principal
│   ├── populate_db.py         # Script para popular o banco de dados
│   └── petfinder.db           # Banco de dados SQLite
├── frontend/
│   └── petfinder-frontend/    # Aplicação React
│       ├── public/
│       └── src/
│           ├── components/    # Componentes React
│           ├── pages/         # Páginas da aplicação
│           ├── services/      # Serviços para comunicação com a API
│           └── types/         # Tipos TypeScript
└── todo.md                    # Lista de tarefas do projeto
```

## Tecnologias Utilizadas
- **Backend**: FastAPI, SQLAlchemy, SQLite
- **Frontend**: React, TypeScript, Material UI
- **Comunicação**: Axios para requisições HTTP

## Funcionalidades
1. **Registro de Pets Próprios**:
   - Nome do pet
   - Localização
   - Foto do pet
   - Status de perdido (checkbox)

2. **Registro de Pets Perdidos Encontrados**:
   - Localização onde o pet foi encontrado
   - Foto do pet

3. **Visualização de Pets Perdidos**:
   - Listagem de pets perdidos agrupados por localização
   - Visualização de detalhes do pet

## Endpoints da API
- `GET /api/registered-pets/`: Lista todos os pets registrados
- `POST /api/registered-pets/`: Registra um novo pet
- `GET /api/registered-pets/{pet_id}`: Obtém detalhes de um pet específico
- `PUT /api/registered-pets/{pet_id}/lost-status`: Atualiza o status de perdido de um pet
- `GET /api/lost-pets/`: Lista todos os pets perdidos
- `POST /api/lost-pets/`: Registra um novo pet perdido
- `GET /api/lost-pets/{pet_id}`: Obtém detalhes de um pet perdido específico

## Banco de Dados
O banco de dados SQLite contém duas tabelas:
1. **registered_pets**: Armazena informações sobre pets registrados pelos donos
2. **lost_pets**: Armazena informações sobre pets perdidos encontrados

## Como Executar Localmente
1. **Backend**:
   ```bash
   cd backend
   source venv/bin/activate
   python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

2. **Frontend**:
   ```bash
   cd frontend/petfinder-frontend
   npm start
   ```

## Acesso à Aplicação
- **Frontend**: http://3000-idkzden9qt5n7ibtj6ze8-f2c91fcf.manus.computer
- **Backend API**: http://8000-idkzden9qt5n7ibtj6ze8-f2c91fcf.manus.computer
- **Documentação da API**: http://8000-idkzden9qt5n7ibtj6ze8-f2c91fcf.manus.computer/docs

## Dados de Exemplo
O banco de dados foi populado com:
- 2 pets registrados (cães)
- 7 pets perdidos (5 cães e 2 gatos)
