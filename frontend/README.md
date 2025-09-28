# E2E-Commerce Frontend

Frontend modernizado do E2E-Commerce com foco em UX, performance e escalabilidade.

## 🚀 Tecnologias

- **React 18** + **Vite**
- **Tailwind CSS** (utilitários + dark mode persistente)
- **React Router DOM**
- **Axios**
- **React Query** (cache + refetch automático)
- **React Hook Form** (cadastro futuro / validações)
- **React Hot Toast**
- **Lucide React**

## 📋 Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

## 🛠️ Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:

```bash
cp env.example .env
```

Configure as variáveis em `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:3000

## 🏗️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Testes
npm test
```

## 📱 Páginas Disponíveis

### Públicas
- **Home** (`/`) - Lista de produtos com filtros e busca
- **Product** (`/products/:id`) - Detalhes do produto e reviews
- **Login** (`/login`) - Autenticação
- **Register** (`/register`) - Cadastro de usuário

### Protegidas (Requer Login)
- **Cart** (`/cart`) - Carrinho de compras
- **Checkout** (`/checkout`) - Processo de checkout
- **Orders** (`/orders`) - Histórico de pedidos

### Vendedor (Requer Role SELLER)
- **Seller** (`/seller`) - Dashboard do vendedor (CRUD de produtos)

### Admin (Requer Role ADMIN)
- Painéis futuros para gestão de usuários, receitas e liquidações.

## 🎨 Componentes Principais

### Layout
- `Header` - Navegação e autenticação
- `ProtectedRoute` - Proteção de rotas

### Produtos
- `ProductCard` - Card de produto na listagem
- `Filters` - Filtros de busca e ordenação
- `Pagination` - Paginação de resultados

### Carrinho
- Cart management com adição/remoção de itens
- Cálculo de totais
- Integração com checkout

### Checkout
- Formulário de endereço
- Cálculo de frete
- Aplicação de cupons
- Confirmação de pedido

## 🔐 Autenticação

### Context API
O sistema usa React Context para gerenciar autenticação:

```javascript
import { useAuth } from '../contexts/AuthContext'

const { user, login, logout, register } = useAuth()
```

### Proteção de Rotas
```javascript
<ProtectedRoute requiredRole="SELLER">
  <Seller />
</ProtectedRoute>
```

### Interceptors Axios
- Adiciona token JWT automaticamente
- Redireciona para login em caso de 401
- Trata erros de API

## 🌐 Integração com API

### Configuração Axios
```javascript
// services/api.js
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### React Query
```javascript
const { data, isLoading, error } = useQuery(
  'products',
  async () => {
    const response = await api.get('/products')
    return response.data.data
  }
)
```

## 🎯 Funcionalidades

### Busca e Filtros
- Busca por texto (título e descrição)
- Filtro por categoria
- Filtro por faixa de preço
- Ordenação por preço, nome, data
- Paginação

### Carrinho
- Adicionar/remover produtos
- Atualizar quantidades
- Persistência no backend
- Cálculo de totais

### Checkout
- Formulário de endereço
- Cálculo de frete por CEP
- Aplicação de cupons de desconto
- Confirmação e criação de pedido

### Reviews
- Sistema de avaliações (1-5 estrelas)
- Comentários
- Visualização de reviews por produto

### Área do Vendedor
- CRUD completo de produtos
- Listagem de produtos do vendedor
- Gerenciamento de estoque

## 🎨 Estilos & Tema

### Tailwind + Design System
- Tokens utilitários via Tailwind
- Dark mode com persistência em `localStorage`
- Componentes responsivos e sem jitter (cards altura fixa)
- Skeleton loaders para lista e página de produto
- Acessibilidade: aria-live estoque, carousel com roles/labels

### Classes Utilitárias
```css
.btn, .btn-primary, .btn-outline
.form-input, .form-label, .form-group
.card, .card-header, .card-body
.product-grid, .product-card
```

## � Promoções & Preços

- Produtos com flag `promo: true` recebem 40% OFF (cálculo central no mock API)
- Preço efetivo exibido em: lista, card, carousel, carrinho e página de produto
- Badge "40% OFF" e preço original riscado

## 📦 Catálogo & Seeds

- Geração programática de ~100 produtos em `src/services/techCatalog.js`
- Mesclado com categorias fixas em `mockData.js`
- Estoque decrementa ao adicionar ao carrinho (simulação servidor)
- Seeds de usuários com roles e campos financeiros:
  - Admin: `admin@e2e.com / Admin@123`
  - Seller: `seller@e2e.com / Seller@123`
  - Buyer: `buyer@e2e.com / Buyer@123`

Campos adicionais: `balanceCents`, `receivableCents` (futuras telas financeiras)

## �📱 Responsividade

O design é totalmente responsivo:

- **Mobile**: Layout em coluna única
- **Tablet**: Grid adaptativo
- **Desktop**: Layout completo com sidebar

### Breakpoints
```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

## 🔧 Configurações

### Vite Config
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
```

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🐳 Docker

### Build
```bash
docker build -t marketplace-frontend .
```

### Run
```bash
docker run -p 3000:3000 \
  -e VITE_API_BASE_URL=http://localhost:8080/api \
  marketplace-frontend
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes em modo watch
npm test -- --watch
```

## 📦 Build para Produção

```bash
# Build otimizado
npm run build

# Preview do build
npm run preview
```

O build será gerado em `dist/` com:
- Código minificado
- Assets otimizados
- Source maps
- Chunks otimizados

## 🔍 Troubleshooting

### Erro de CORS
- Verifique se o backend está rodando
- Confirme a URL da API no `.env`
- Teste a API diretamente

### Erro de Autenticação
- Verifique se o token está sendo salvo
- Confirme as configurações do JWT
- Teste login no backend

### Erro de Build
- Verifique versões do Node.js
- Limpe cache: `npm run build -- --force`
- Reinstale dependências: `rm -rf node_modules && npm install`

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # React Contexts
├── pages/              # Páginas da aplicação
├── services/           # Serviços e API
├── styles/             # Estilos globais
├── App.jsx             # Componente principal
└── main.jsx            # Entry point
```

## 🧭 Roadmap / Próximos Passos

- [ ] Testes unitários (Vitest) e E2E (Playwright ou Cypress)
- [ ] Painéis financeiros Seller/Admin
- [ ] i18n (pt-BR / en-US)
- [ ] PWA + cache offline
- [ ] Otimizações de bundle (code splitting por rota)
- [ ] Lazy loading de imagens (intersection observer)
- [ ] Monitoramento Web Vitals
- [ ] Cupons dinâmicos / múltiplos níveis de desconto

## ♿ Acessibilidade Implementada
- Carousel com `role="region"`, `aria-roledescription="carousel"`, botões com `aria-label`
- Atualização dinâmica de estoque com `aria-live`
- Indicadores de slide com `aria-current`

## 🔐 Validações de Cadastro
Regras aplicadas no frontend e mock backend:
- Nome: mínimo 3 caracteres
- Email: regex RFC simplificada
- Senha: mínimo 8 chars, 1 maiúscula, 1 minúscula, 1 número, 1 símbolo

## 🗂 Invalidations & Cache
- Ao adicionar ao carrinho: invalida queries de `cart`, `product/:id` e listagem
- Evita inconsistências de estoque após múltiplos adds

## 🛠 Manutenção Rápida
| Objetivo | Local |
|----------|-------|
| Ajustar desconto | `mockApi.js` função de cálculo cart/checkout |
| Alterar geração catálogo | `techCatalog.js` |
| Seeds usuários | `mockData.js` |
| Tema / dark mode | `ThemeContext.jsx` + `base.css` |
| Skeletons | `Home.jsx`, `Product.jsx` |

## 📋 Notas
Este frontend usa uma camada de mock API em memória. Para produção real, substituir por endpoints REST/GraphQL e migrar lógica de desconto/estoque para o backend.

