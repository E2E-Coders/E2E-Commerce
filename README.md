# E2E Marketplace Lite

Um marketplace completo com backend Spring Boot + MySQL e frontend React, estruturado como monorepo.

## 📁 Estrutura do Projeto

```
/e2e-marketplace-lite
├── /backend          # Spring Boot 3 + MySQL
├── /frontend         # React + Vite
├── /docs            # Documentação
├── docker-compose.yml # Docker Compose (opcional)
└── README.md
```

## 🚀 Como Executar

### Opção 1: Docker Compose (Recomendado)

```bash
# Clone o repositório
git clone <repo-url>
cd e2e-marketplace-lite

# Subir todos os serviços  
docker-compose up -d

# Acessar aplicações
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api
# Swagger UI: http://localhost:8080/api/swagger-ui/index.html
# MySQL: localhost:3306
```

### Opção 2: Execução Manual

#### Backend
```bash
cd backend

# Configurar MySQL (criar database 'marketplace')
# Usuário: marketplace, Senha: marketplace123

# Executar migrations e rodar aplicação
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Rodar em modo desenvolvimento
npm run dev
```

## 🔧 Configuração

### Backend
- **Porta**: 8080
- **Context Path**: `/api`
- **Database**: MySQL 8.0
- **JWT**: Configurado para autenticação
- **Swagger UI**: http://localhost:8080/api/swagger-ui/index.html
- **API Docs**: http://localhost:8080/api/v3/api-docs

### Frontend
- **Porta**: 3000 (desenvolvimento)
- **Build**: Vite
- **API Base URL**: `http://localhost:8080/api`

## 👥 Usuários de Teste

### Administradores
- Email: `admin@marketplace.com`
- Senha: `Admin123!`

### Vendedores
- Email: `seller1@marketplace.com`
- Senha: `Seller123!`

### Compradores
- Email: `buyer1@marketplace.com`
- Senha: `Buyer123!`

## 📚 Documentação da API (Swagger)

A documentação completa da API está disponível através do Swagger UI:

**URL do Swagger UI:** http://localhost:8080/api/swagger-ui/index.html

### Como usar o Swagger:

1. **Acesse a URL** do Swagger UI no seu navegador
2. **Explore os endpoints** disponíveis organizados por categoria
3. **Teste endpoints públicos** diretamente na interface
4. **Para endpoints protegidos:**
   - Faça login usando `/auth/login`
   - Copie o token JWT da resposta
   - Clique em "Authorize" no Swagger
   - Cole o token no formato: `Bearer SEU_TOKEN_AQUI`
   - Agora pode testar todos os endpoints protegidos

### Endpoints principais disponíveis:
- **Autenticação:** `/auth/login`, `/auth/register`
- **Produtos:** `/products`, `/products/{id}`, `/products/categories`
- **Carrinho:** `/cart`
- **Checkout:** `/checkout/quote`, `/checkout/confirm`
- **Pedidos:** `/orders`, `/orders/{id}`
- **Vendedor:** `/seller/products` (CRUD)
- **Avaliações:** `/products/{productId}/reviews`

## 📋 Funcionalidades

### Backend
- ✅ Autenticação JWT
- ✅ CRUD de produtos e categorias
- ✅ Sistema de carrinho
- ✅ Processo de checkout
- ✅ Gestão de pedidos
- ✅ Sistema de reviews
- ✅ Área do vendedor
- ✅ Seeds com dados de teste

### Frontend
- ✅ Página inicial com produtos
- ✅ Busca e filtros
- ✅ Detalhes do produto
- ✅ Carrinho de compras
- ✅ Checkout
- ✅ Gestão de pedidos
- ✅ Área do vendedor
- ✅ Autenticação

## 🔒 Segurança

- Autenticação JWT obrigatória
- Senhas com critérios de força
- Validação de dados
- CORS configurado
- Rate limiting básico

## 📚 Documentação

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [API Contract](docs/swagger-contract.md)
- [Test Missions](docs/test-missions.md)

## 🐳 Docker

O projeto inclui Docker Compose para facilitar o desenvolvimento:

```bash
# Subir apenas o banco
docker-compose up db

# Subir tudo
docker-compose up

# Parar serviços
docker-compose down
```

## 🧪 Testes

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## 📝 Licença

MIT License
