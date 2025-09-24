# Usuários Padrão para Testes

Este documento contém as credenciais dos usuários padrão configurados no sistema para facilitar os testes.

## 👤 Usuários Disponíveis

### 1. Cliente Padrão
- **Email:** `joao@teste.com`
- **Senha:** `123456`
- **Role:** `CUSTOMER`
- **Nome:** João Silva
- **Funcionalidades:** Pode navegar, comprar produtos, gerenciar carrinho, fazer pedidos

### 2. Vendedor Padrão
- **Email:** `maria@teste.com`
- **Senha:** `123456`
- **Role:** `SELLER`
- **Nome:** Maria Santos
- **Funcionalidades:** Todas as funcionalidades de cliente + gerenciar produtos (CRUD)

### 3. Administrador
- **Email:** `admin@teste.com`
- **Senha:** `admin123`
- **Role:** `ADMIN`
- **Nome:** Admin User
- **Funcionalidades:** Acesso completo ao sistema

## 🛒 Dados de Teste Disponíveis

### Produtos
- 8 produtos mockados em diferentes categorias
- Preços variados (R$ 39,90 a R$ 2.799,00)
- Estoque simulado
- Reviews e avaliações

### Categorias
- Eletrônicos
- Roupas
- Casa e Jardim
- Esportes
- Livros
- Beleza

### Pedidos
- Histórico de pedidos para o usuário João Silva
- Status variados (DELIVERED, PROCESSING)
- Itens e valores realistas

### Cupons de Desconto
- `DESCONTO10` - 10% de desconto (pedido mínimo R$ 100)
- `FRETEGRATIS` - Frete grátis (pedido mínimo R$ 50)
- `BEMVINDO20` - 20% de desconto (pedido mínimo R$ 150)

## 🔧 Como Usar

1. **Fazer Login:**
   - Acesse `/login`
   - Use qualquer um dos emails e senhas acima
   - O sistema irá redirecionar automaticamente

2. **Testar Funcionalidades de Cliente:**
   - Use `joao@teste.com` / `123456`
   - Navegue pelos produtos
   - Adicione itens ao carrinho
   - Faça um pedido completo

3. **Testar Funcionalidades de Vendedor:**
   - Use `maria@teste.com` / `123456`
   - Acesse `/seller`
   - Crie, edite ou exclua produtos
   - Gerencie seu catálogo

4. **Testar Registro de Novo Usuário:**
   - Acesse `/register`
   - Crie uma nova conta
   - O usuário será criado como CUSTOMER por padrão

## 📱 Funcionalidades Testáveis

### ✅ Autenticação
- [x] Login com usuários existentes
- [x] Registro de novos usuários
- [x] Logout
- [x] Proteção de rotas
- [x] Redirecionamento baseado em roles

### ✅ Catálogo de Produtos
- [x] Listagem de produtos com paginação
- [x] Filtros por categoria, preço, busca
- [x] Ordenação por diferentes critérios
- [x] Visualização de detalhes do produto
- [x] Sistema de avaliações

### ✅ Carrinho de Compras
- [x] Adicionar produtos ao carrinho
- [x] Remover itens do carrinho
- [x] Limpar carrinho completo
- [x] Persistência no localStorage
- [x] Cálculo de totais

### ✅ Checkout e Pedidos
- [x] Processo de checkout completo
- [x] Cálculo de frete
- [x] Aplicação de cupons de desconto
- [x] Confirmação de pedidos
- [x] Histórico de pedidos
- [x] Detalhes de pedidos individuais

### ✅ Área do Vendedor
- [x] CRUD completo de produtos
- [x] Listagem de produtos do vendedor
- [x] Gerenciamento de categorias
- [x] Controle de estoque

### ✅ Reviews e Avaliações
- [x] Visualizar reviews de produtos
- [x] Adicionar nova review
- [x] Sistema de estrelas (1-5)
- [x] Comentários textuais

## 🔄 Persistência de Dados

Os dados são armazenados em:
- **Autenticação:** localStorage (token JWT)
- **Carrinho:** localStorage (mockCart)
- **Produtos/Usuários/Pedidos:** Memória (reinicia ao recarregar)

## 🚀 Próximos Passos

Para tornar o sistema ainda mais robusto:
1. Implementar persistência real (IndexedDB)
2. Adicionar mais produtos e categorias
3. Implementar sistema de notificações
4. Adicionar funcionalidades de admin
5. Implementar chat de suporte

## 📞 Suporte

Se encontrar algum problema durante os testes:
1. Verifique se está usando as credenciais corretas
2. Limpe o localStorage se necessário
3. Recarregue a página para resetar os dados
4. Verifique o console do navegador para erros