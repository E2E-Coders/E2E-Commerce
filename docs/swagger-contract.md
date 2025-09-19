# API Contract - E2E Marketplace Lite

Documentação completa dos endpoints da API do E2E Marketplace Lite.

## 🔗 Base URL

```
http://localhost:8080/api
```

## 🔐 Autenticação

Todos os endpoints (exceto `/auth/*` e `/public/*`) requerem autenticação JWT.

### Header
```
Authorization: Bearer <jwt_token>
```

### Exemplo de Token
```json
{
  "sub": "user@example.com",
  "userId": 1,
  "role": "BUYER",
  "name": "User Name",
  "iat": 1640995200,
  "exp": 1641081600
}
```

## 📋 Endpoints

### 🔐 Autenticação

#### POST /auth/register
Registra um novo usuário.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "BUYER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST /auth/login
Autentica um usuário existente.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "BUYER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 🛍️ Produtos

#### GET /products
Lista produtos com filtros opcionais.

**Query Parameters:**
- `q` (string, optional): Busca por título/descrição
- `category` (number, optional): ID da categoria
- `minPrice` (number, optional): Preço mínimo (em centavos)
- `maxPrice` (number, optional): Preço máximo (em centavos)
- `sort` (string, optional): Campo para ordenação (`createdAt`, `priceCents`, `title`)
- `direction` (string, optional): Direção da ordenação (`asc`, `desc`)
- `page` (number, optional): Página (0-based, default: 0)
- `size` (number, optional): Tamanho da página (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "title": "iPhone 15 Pro",
        "description": "Latest Apple iPhone with advanced camera system",
        "priceCents": 99900,
        "stock": 50,
        "category": {
          "id": 1,
          "name": "Electronics",
          "slug": "electronics"
        },
        "seller": {
          "id": 2,
          "name": "Tech Store",
          "email": "seller1@marketplace.com"
        },
        "createdAt": "2024-01-15T10:30:00",
        "averageRating": 4.5,
        "reviewCount": 10
      }
    ],
    "totalElements": 50,
    "totalPages": 3,
    "size": 20,
    "number": 0
  }
}
```

#### GET /products/{id}
Obtém detalhes de um produto específico.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "iPhone 15 Pro",
    "description": "Latest Apple iPhone with advanced camera system",
    "priceCents": 99900,
    "stock": 50,
    "category": {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics"
    },
    "seller": {
      "id": 2,
      "name": "Tech Store",
      "email": "seller1@marketplace.com"
    },
    "createdAt": "2024-01-15T10:30:00",
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Amazing phone!",
        "user": {
          "id": 7,
          "name": "John Doe"
        },
        "createdAt": "2024-01-20T10:30:00"
      }
    ]
  }
}
```

#### GET /products/categories
Lista todas as categorias.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics",
      "description": "Electronic devices and gadgets"
    }
  ]
}
```

### 🛒 Carrinho

#### GET /cart
Obtém itens do carrinho do usuário autenticado.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product": {
        "id": 1,
        "title": "iPhone 15 Pro",
        "priceCents": 99900
      },
      "quantity": 2,
      "totalPriceCents": 199800,
      "createdAt": "2024-01-15T10:30:00"
    }
  ]
}
```

#### POST /cart
Adiciona produto ao carrinho.

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "product": {
      "id": 1,
      "title": "iPhone 15 Pro",
      "priceCents": 99900
    },
    "quantity": 2,
    "totalPriceCents": 199800
  }
}
```

#### DELETE /cart/{productId}
Remove produto do carrinho.

**Response (200):**
```json
{
  "success": true,
  "data": "Item removed from cart"
}
```

#### DELETE /cart
Limpa todo o carrinho.

**Response (200):**
```json
{
  "success": true,
  "data": "Cart cleared"
}
```

### 💳 Checkout

#### POST /checkout/quote
Calcula frete e desconto.

**Request Body:**
```json
{
  "zipCode": "12345",
  "couponCode": "SAVE10"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "subtotal": 999.00,
    "shipping": 10.00,
    "discount": 99.90,
    "total": 909.10
  }
}
```

#### POST /checkout/confirm
Confirma e cria o pedido.

**Request Body:**
```json
{
  "shippingAddress": "123 Main St, New York, NY 10001",
  "zipCode": "12345",
  "couponCode": "SAVE10"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "totalCents": 90910,
    "status": "PENDING",
    "shippingAddress": "123 Main St, New York, NY 10001",
    "createdAt": "2024-01-15T10:30:00",
    "items": [
      {
        "id": 1,
        "product": {
          "id": 1,
          "title": "iPhone 15 Pro"
        },
        "quantity": 2,
        "priceCents": 99900
      }
    ]
  }
}
```

### 📦 Pedidos

#### GET /orders
Lista pedidos do usuário autenticado.

**Query Parameters:**
- `page` (number, optional): Página (0-based, default: 0)
- `size` (number, optional): Tamanho da página (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "totalCents": 90910,
        "status": "DELIVERED",
        "shippingAddress": "123 Main St, New York, NY 10001",
        "createdAt": "2024-01-15T10:30:00",
        "items": [
          {
            "id": 1,
            "product": {
              "id": 1,
              "title": "iPhone 15 Pro"
            },
            "quantity": 2,
            "priceCents": 99900
          }
        ]
      }
    ],
    "totalElements": 5,
    "totalPages": 1
  }
}
```

#### GET /orders/{id}
Obtém detalhes de um pedido específico (apenas do dono).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "totalCents": 90910,
    "status": "DELIVERED",
    "shippingAddress": "123 Main St, New York, NY 10001",
    "createdAt": "2024-01-15T10:30:00",
    "user": {
      "id": 7,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "items": [
      {
        "id": 1,
        "product": {
          "id": 1,
          "title": "iPhone 15 Pro",
          "priceCents": 99900
        },
        "quantity": 2,
        "priceCents": 99900
      }
    ]
  }
}
```

### 🏪 Vendedor

#### GET /seller/products
Lista produtos do vendedor autenticado.

**Query Parameters:**
- `page` (number, optional): Página (0-based, default: 0)
- `size` (number, optional): Tamanho da página (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "title": "iPhone 15 Pro",
        "description": "Latest Apple iPhone with advanced camera system",
        "priceCents": 99900,
        "stock": 50,
        "category": {
          "id": 1,
          "name": "Electronics",
          "slug": "electronics"
        },
        "createdAt": "2024-01-15T10:30:00"
      }
    ],
    "totalElements": 10,
    "totalPages": 1
  }
}
```

#### POST /seller/products
Cria novo produto (apenas vendedores).

**Request Body:**
```json
{
  "title": "iPhone 15 Pro",
  "description": "Latest Apple iPhone with advanced camera system",
  "priceCents": 99900,
  "stock": 50,
  "categoryId": 1
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "iPhone 15 Pro",
    "description": "Latest Apple iPhone with advanced camera system",
    "priceCents": 99900,
    "stock": 50,
    "category": {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics"
    },
    "createdAt": "2024-01-15T10:30:00"
  }
}
```

#### PUT /seller/products/{id}
Atualiza produto existente (apenas do dono).

**Request Body:**
```json
{
  "title": "iPhone 15 Pro Max",
  "description": "Latest Apple iPhone with advanced camera system",
  "priceCents": 109900,
  "stock": 30,
  "categoryId": 1
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "iPhone 15 Pro Max",
    "description": "Latest Apple iPhone with advanced camera system",
    "priceCents": 109900,
    "stock": 30,
    "category": {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics"
    },
    "updatedAt": "2024-01-16T10:30:00"
  }
}
```

#### DELETE /seller/products/{id}
Remove produto (apenas do dono).

**Response (200):**
```json
{
  "success": true,
  "data": "Product deleted"
}
```

#### GET /seller/categories
Lista categorias para vendedores.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics",
      "description": "Electronic devices and gadgets"
    }
  ]
}
```

### ⭐ Reviews

#### GET /products/{id}/reviews
Lista reviews de um produto.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Amazing phone! The camera quality is outstanding.",
      "user": {
        "id": 7,
        "name": "John Doe"
      },
      "createdAt": "2024-01-20T10:30:00"
    }
  ]
}
```

#### POST /products/{id}/reviews
Cria review para um produto (apenas compradores).

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Amazing phone! The camera quality is outstanding."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "rating": 5,
    "comment": "Amazing phone! The camera quality is outstanding.",
    "user": {
      "id": 7,
      "name": "John Doe"
    },
    "createdAt": "2024-01-20T10:30:00"
  }
}
```

### 🌐 Público

#### GET /public/ping
Health check da API.

**Response (200):**
```json
{
  "success": true,
  "data": "pong"
}
```

## 📊 Códigos de Status

### Sucesso
- `200 OK` - Operação realizada com sucesso
- `201 Created` - Recurso criado com sucesso

### Erro do Cliente
- `400 Bad Request` - Requisição inválida
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Não autorizado
- `404 Not Found` - Recurso não encontrado
- `422 Unprocessable Entity` - Erro de validação

### Erro do Servidor
- `500 Internal Server Error` - Erro interno

## 🔒 Validações

### Senha
- Mínimo 8 caracteres
- Deve conter pelo menos uma letra e um número
- Regex: `^(?=.*[A-Za-z])(?=.*\d).+$`

### Email
- Formato de email válido
- Único no sistema

### Preço
- Valor em centavos (integer)
- Deve ser maior que 0

### Rating
- Integer entre 1 e 5

### Quantidade
- Integer maior que 0

## 🎯 Cupons de Desconto

### Cupons Válidos
- `SAVE10` - 10% de desconto (máximo $10)
- `SAVE20` - 20% de desconto (máximo $20)
- `FREE` - $5 de desconto (máximo $5)

### Cálculo de Frete
Baseado no primeiro dígito do CEP:
- 0-1: $5.00
- 2-3: $10.00
- 4-9: $15.00

## 📝 Exemplos de Uso

### Fluxo Completo de Compra

1. **Login**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"buyer1@marketplace.com","password":"password123"}'
```

2. **Adicionar ao Carrinho**
```bash
curl -X POST http://localhost:8080/api/cart \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":2}'
```

3. **Calcular Frete**
```bash
curl -X POST http://localhost:8080/api/checkout/quote \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"zipCode":"12345","couponCode":"SAVE10"}'
```

4. **Confirmar Pedido**
```bash
curl -X POST http://localhost:8080/api/checkout/confirm \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"shippingAddress":"123 Main St","zipCode":"12345","couponCode":"SAVE10"}'
```

## 🔧 Swagger UI

Acesse a documentação interativa em:
```
http://localhost:8080/swagger-ui/index.html
```
