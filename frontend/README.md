# E2E Marketplace Lite - Frontend

Frontend do E2E Marketplace Lite desenvolvido em React com Vite.

## 🚀 Tecnologias

- **React 18**
- **Vite** (Build tool)
- **React Router DOM** (Roteamento)
- **Axios** (HTTP Client)
- **React Query** (Data fetching)
- **React Hook Form** (Formulários)
- **React Hot Toast** (Notificações)
- **Lucide React** (Ícones)

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

## 🎨 Estilos

### CSS Customizado
- Sistema de design consistente
- Componentes reutilizáveis
- Responsivo (mobile-first)
- Acessível (labels, focus states)

### Classes Utilitárias
```css
.btn, .btn-primary, .btn-outline
.form-input, .form-label, .form-group
.card, .card-header, .card-body
.product-grid, .product-card
```

## 📱 Responsividade

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

## 🎯 Próximos Passos

### Melhorias Sugeridas
- [ ] Testes unitários e E2E
- [ ] PWA (Progressive Web App)
- [ ] Otimização de performance
- [ ] Internacionalização (i18n)
- [ ] Tema escuro
- [ ] Notificações push
- [ ] Cache offline
