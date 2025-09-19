# E2E Marketplace Lite - Backend

Backend do E2E Marketplace Lite desenvolvido em Spring Boot 3 com MySQL.

## 🚀 Tecnologias

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (JWT)
- **Spring Data JPA**
- **MySQL 8.0**
- **Flyway** (Migrations)
- **Springdoc OpenAPI** (Swagger)
- **Maven**

## 📋 Pré-requisitos

- Java 17 ou superior
- Maven 3.6+
- MySQL 8.0

## 🛠️ Configuração

### 1. Banco de Dados

Crie o banco de dados MySQL:

```sql
CREATE DATABASE marketplace;
CREATE USER 'marketplace'@'localhost' IDENTIFIED BY 'marketplace123';
GRANT ALL PRIVILEGES ON marketplace.* TO 'marketplace'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Configuração

As configurações estão em `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/marketplace
    username: marketplace
    password: marketplace123
```

### 3. Executar Migrations

As migrations do Flyway são executadas automaticamente na inicialização.

## 🏃‍♂️ Como Executar

### Desenvolvimento

```bash
# Instalar dependências e executar
mvn spring-boot:run
```

### Produção

```bash
# Compilar
mvn clean package

# Executar JAR
java -jar target/e2e-marketplace-lite-0.0.1-SNAPSHOT.jar
```

## 📚 API Documentation

### Swagger UI
- URL: http://localhost:8080/swagger-ui/index.html
- API Docs: http://localhost:8080/v3/api-docs

### Endpoints Principais

#### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login

#### Produtos
- `GET /api/products` - Listar produtos (com filtros)
- `GET /api/products/{id}` - Detalhes do produto
- `GET /api/products/categories` - Listar categorias

#### Carrinho
- `GET /api/cart` - Itens do carrinho
- `POST /api/cart` - Adicionar ao carrinho
- `DELETE /api/cart/{productId}` - Remover do carrinho
- `DELETE /api/cart` - Limpar carrinho

#### Checkout
- `POST /api/checkout/quote` - Calcular frete e desconto
- `POST /api/checkout/confirm` - Confirmar pedido

#### Pedidos
- `GET /api/orders` - Meus pedidos
- `GET /api/orders/{id}` - Detalhes do pedido

#### Vendedor
- `GET /api/seller/products` - Produtos do vendedor
- `POST /api/seller/products` - Criar produto
- `PUT /api/seller/products/{id}` - Atualizar produto
- `DELETE /api/seller/products/{id}` - Deletar produto

#### Reviews
- `GET /api/products/{id}/reviews` - Reviews do produto
- `POST /api/products/{id}/reviews` - Criar review

#### Público
- `GET /api/public/ping` - Health check

## 🔐 Autenticação

O sistema usa JWT (JSON Web Token) para autenticação:

### Headers
```
Authorization: Bearer <token>
```

### Usuários de Teste

#### Admin
- Email: `admin@marketplace.com`
- Senha: `password123`
- Role: `ADMIN`

#### Vendedores
- Email: `seller1@marketplace.com`
- Senha: `password123`
- Role: `SELLER`

#### Compradores
- Email: `buyer1@marketplace.com`
- Senha: `password123`
- Role: `BUYER`

## 📊 Dados de Teste

O sistema inclui dados de seed com:

- **10 categorias** (Electronics, Clothing, Home & Garden, etc.)
- **50 produtos** distribuídos entre as categorias
- **5 vendedores** com produtos
- **20 compradores**
- **20 pedidos** de exemplo
- **30 reviews** de produtos

## 🔧 Configurações Avançadas

### JWT
```yaml
spring:
  security:
    jwt:
      secret: marketplace-jwt-secret-key-2024-e2e-testing
      expiration: 86400000 # 24 horas
```

### Flyway
```yaml
spring:
  flyway:
    enabled: true
    locations: classpath:db/migration
    baseline-on-migrate: true
```

### Logs
```yaml
logging:
  level:
    com.marketplace: DEBUG
    org.springframework.security: DEBUG
```

## 🐳 Docker

### Build
```bash
docker build -t marketplace-backend .
```

### Run
```bash
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/marketplace \
  -e SPRING_DATASOURCE_USERNAME=marketplace \
  -e SPRING_DATASOURCE_PASSWORD=marketplace123 \
  marketplace-backend
```

## 🧪 Testes

```bash
# Executar todos os testes
mvn test

# Executar testes com coverage
mvn test jacoco:report
```

## 📁 Estrutura do Projeto

```
src/main/java/com/marketplace/
├── auth/                 # Autenticação e usuários
├── catalog/             # Produtos e categorias
├── cart/                # Carrinho de compras
├── checkout/            # Processo de checkout
├── order/               # Pedidos
├── review/              # Avaliações
├── seller/              # Área do vendedor
├── common/              # Utilitários comuns
└── E2EMarketplaceLiteApplication.java
```

## 🔍 Troubleshooting

### Erro de Conexão MySQL
- Verifique se o MySQL está rodando
- Confirme as credenciais no `application.yml`
- Teste a conexão: `mysql -u marketplace -p marketplace`

### Erro de Migrations
- Verifique se o banco existe
- Confirme as permissões do usuário
- Execute: `FLYWAY_CLEAN` se necessário

### Erro de JWT
- Verifique o secret no `application.yml`
- Confirme se o token não expirou
- Teste login novamente

## 📝 Logs

Os logs são configurados para mostrar:
- Requests HTTP
- Queries SQL (em desenvolvimento)
- Erros de segurança
- Migrations do Flyway

Para produção, ajuste o nível de log em `application.yml`.
