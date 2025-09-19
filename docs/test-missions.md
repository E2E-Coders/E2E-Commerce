# Test Missions - E2E Marketplace Lite

Este documento descreve as missões de teste para validação completa do E2E Marketplace Lite.

## 🎯 Objetivo

Validar todas as funcionalidades do marketplace através de testes automatizados e manuais, garantindo qualidade, performance, segurança e usabilidade.

## 📋 Missões de Teste

### 🔐 1. Testes de Autenticação (AUTH)

#### 1.1 Registro de Usuário
- [ ] **AUTH-001**: Registrar usuário com dados válidos
- [ ] **AUTH-002**: Validar senha forte (mín. 8 chars, letra + número)
- [ ] **AUTH-003**: Rejeitar email duplicado
- [ ] **AUTH-004**: Validar formato de email
- [ ] **AUTH-005**: Testar campos obrigatórios

#### 1.2 Login de Usuário
- [ ] **AUTH-006**: Login com credenciais válidas
- [ ] **AUTH-007**: Rejeitar credenciais inválidas
- [ ] **AUTH-008**: Verificar geração de JWT token
- [ ] **AUTH-009**: Testar expiração de token (24h)
- [ ] **AUTH-010**: Validar roles (ADMIN, SELLER, BUYER)

#### 1.3 Autorização
- [ ] **AUTH-011**: Acessar rotas protegidas sem token
- [ ] **AUTH-012**: Acessar rotas de vendedor como comprador
- [ ] **AUTH-013**: Verificar middleware JWT
- [ ] **AUTH-014**: Testar logout e limpeza de token

### 🛍️ 2. Testes de Catálogo (CATALOG)

#### 2.1 Listagem de Produtos
- [ ] **CATALOG-001**: Listar produtos com paginação
- [ ] **CATALOG-002**: Busca por texto (título/descrição)
- [ ] **CATALOG-003**: Filtro por categoria
- [ ] **CATALOG-004**: Filtro por faixa de preço
- [ ] **CATALOG-005**: Ordenação por preço (asc/desc)
- [ ] **CATALOG-006**: Ordenação por nome (asc/desc)
- [ ] **CATALOG-007**: Ordenação por data (asc/desc)

#### 2.2 Detalhes do Produto
- [ ] **CATALOG-008**: Visualizar produto existente
- [ ] **CATALOG-009**: Erro 404 para produto inexistente
- [ ] **CATALOG-010**: Exibir informações completas
- [ ] **CATALOG-011**: Mostrar reviews e rating
- [ ] **CATALOG-012**: Exibir estoque disponível

#### 2.3 Categorias
- [ ] **CATALOG-013**: Listar todas as categorias
- [ ] **CATALOG-014**: Filtrar produtos por categoria
- [ ] **CATALOG-015**: Validar slug de categoria

### 🛒 3. Testes de Carrinho (CART)

#### 3.1 Gerenciamento de Itens
- [ ] **CART-001**: Adicionar produto ao carrinho
- [ ] **CART-002**: Adicionar produto já existente (somar quantidade)
- [ ] **CART-003**: Remover item do carrinho
- [ ] **CART-004**: Limpar carrinho completamente
- [ ] **CART-005**: Verificar carrinho vazio

#### 3.2 Validações
- [ ] **CART-006**: Não permitir quantidade > estoque
- [ ] **CART-007**: Validar quantidade mínima (1)
- [ ] **CART-008**: Recalcular totais automaticamente
- [ ] **CART-009**: Persistir carrinho entre sessões

### 💳 4. Testes de Checkout (CHECKOUT)

#### 4.1 Cálculo de Frete
- [ ] **CHECKOUT-001**: Calcular frete por CEP (zona 0-1: $5)
- [ ] **CHECKOUT-002**: Calcular frete por CEP (zona 2-3: $10)
- [ ] **CHECKOUT-003**: Calcular frete por CEP (zona 4-9: $15)
- [ ] **CHECKOUT-004**: Validar CEP inválido

#### 4.2 Cupons de Desconto
- [ ] **CHECKOUT-005**: Aplicar cupom SAVE10 (10% off, max $10)
- [ ] **CHECKOUT-006**: Aplicar cupom SAVE20 (20% off, max $20)
- [ ] **CHECKOUT-007**: Aplicar cupom FREE ($5 off)
- [ ] **CHECKOUT-008**: Rejeitar cupom inválido
- [ ] **CHECKOUT-009**: Calcular desconto corretamente

#### 4.3 Confirmação de Pedido
- [ ] **CHECKOUT-010**: Validar endereço obrigatório
- [ ] **CHECKOUT-011**: Criar pedido com sucesso
- [ ] **CHECKOUT-012**: Limpar carrinho após pedido
- [ ] **CHECKOUT-013**: Calcular totais finais
- [ ] **CHECKOUT-014**: Validar carrinho vazio

### 📦 5. Testes de Pedidos (ORDERS)

#### 5.1 Listagem de Pedidos
- [ ] **ORDERS-001**: Listar pedidos do usuário
- [ ] **ORDERS-002**: Paginação de pedidos
- [ ] **ORDERS-003**: Visualizar apenas próprios pedidos

#### 5.2 Detalhes do Pedido
- [ ] **ORDERS-004**: Visualizar detalhes do pedido
- [ ] **ORDERS-005**: Ver itens do pedido
- [ ] **ORDERS-006**: Ver status do pedido
- [ ] **ORDERS-007**: Ver endereço de entrega
- [ ] **ORDERS-008**: Não permitir ver pedidos de outros usuários

#### 5.3 Status do Pedido
- [ ] **ORDERS-009**: Status inicial PENDING
- [ ] **ORDERS-010**: Transições de status válidas
- [ ] **ORDERS-011**: Histórico de atualizações

### ⭐ 6. Testes de Reviews (REVIEWS)

#### 6.1 Criação de Reviews
- [ ] **REVIEWS-001**: Criar review válido (1-5 estrelas)
- [ ] **REVIEWS-002**: Permitir apenas um review por produto
- [ ] **REVIEWS-003**: Validar rating obrigatório
- [ ] **REVIEWS-004**: Permitir comentário opcional
- [ ] **REVIEWS-005**: Apenas compradores podem avaliar

#### 6.2 Visualização de Reviews
- [ ] **REVIEWS-006**: Listar reviews do produto
- [ ] **REVIEWS-007**: Ordenar por data (mais recente)
- [ ] **REVIEWS-008**: Calcular rating médio
- [ ] **REVIEWS-009**: Exibir contagem de reviews

### 🏪 7. Testes de Vendedor (SELLER)

#### 7.1 CRUD de Produtos
- [ ] **SELLER-001**: Listar produtos do vendedor
- [ ] **SELLER-002**: Criar novo produto
- [ ] **SELLER-003**: Atualizar produto existente
- [ ] **SELLER-004**: Deletar produto
- [ ] **SELLER-005**: Apenas dono pode editar

#### 7.2 Validações de Produto
- [ ] **SELLER-006**: Título obrigatório
- [ ] **SELLER-007**: Categoria obrigatória
- [ ] **SELLER-008**: Preço > 0
- [ ] **SELLER-009**: Estoque >= 0
- [ ] **SELLER-010**: Apenas vendedores podem criar produtos

### 🔒 8. Testes de Segurança (SECURITY)

#### 8.1 Autenticação e Autorização
- [ ] **SEC-001**: Rotas públicas acessíveis sem token
- [ ] **SEC-002**: Rotas protegidas requerem token
- [ ] **SEC-003**: Token inválido rejeitado
- [ ] **SEC-004**: Token expirado rejeitado
- [ ] **SEC-005**: Roles aplicados corretamente

#### 8.2 Validação de Dados
- [ ] **SEC-006**: SQL Injection prevention
- [ ] **SEC-007**: XSS protection
- [ ] **SEC-008**: CSRF protection
- [ ] **SEC-009**: Input sanitization
- [ ] **SEC-010**: Rate limiting básico

#### 8.3 Senhas
- [ ] **SEC-011**: Senhas hasheadas (BCrypt)
- [ ] **SEC-012**: Critérios de senha forte
- [ ] **SEC-013**: Não expor senhas em logs

### 🚀 9. Testes de Performance (PERF)

#### 9.1 Tempo de Resposta
- [ ] **PERF-001**: API response < 200ms
- [ ] **PERF-002**: Lista de produtos < 500ms
- [ ] **PERF-003**: Busca com filtros < 300ms
- [ ] **PERF-004**: Login < 100ms
- [ ] **PERF-005**: Checkout < 1000ms

#### 9.2 Carga
- [ ] **PERF-006**: Suportar 100 usuários simultâneos
- [ ] **PERF-007**: Suportar 1000 requests/minuto
- [ ] **PERF-008**: Memory usage < 512MB
- [ ] **PERF-009**: CPU usage < 80%

#### 9.3 Banco de Dados
- [ ] **PERF-010**: Queries otimizadas
- [ ] **PERF-011**: Índices apropriados
- [ ] **PERF-012**: Connection pooling
- [ ] **PERF-013**: N+1 queries evitadas

### 🎨 10. Testes de Interface (UI)

#### 10.1 Usabilidade
- [ ] **UI-001**: Navegação intuitiva
- [ ] **UI-002**: Formulários responsivos
- [ ] **UI-003**: Feedback visual adequado
- [ ] **UI-004**: Loading states
- [ ] **UI-005**: Error handling user-friendly

#### 10.2 Responsividade
- [ ] **UI-006**: Mobile (320px+)
- [ ] **UI-007**: Tablet (768px+)
- [ ] **UI-008**: Desktop (1024px+)
- [ ] **UI-009**: Layout adaptativo
- [ ] **UI-010**: Touch-friendly em mobile

#### 10.3 Acessibilidade
- [ ] **UI-011**: Labels acessíveis
- [ ] **UI-012**: Focus states visíveis
- [ ] **UI-013**: Contraste adequado
- [ ] **UI-014**: Navegação por teclado
- [ ] **UI-015**: Screen reader friendly

### 🤖 11. Testes de Integração (INT)

#### 11.1 Fluxo Completo
- [ ] **INT-001**: Registro → Login → Comprar → Pedido
- [ ] **INT-002**: Vendedor → Criar produto → Vender
- [ ] **INT-003**: Comprador → Review → Rating médio
- [ ] **INT-004**: Carrinho → Checkout → Limpeza
- [ ] **INT-005**: Filtros → Busca → Detalhes → Comprar

#### 11.2 APIs
- [ ] **INT-006**: Frontend ↔ Backend communication
- [ ] **INT-007**: Error handling consistente
- [ ] **INT-008**: Data synchronization
- [ ] **INT-009**: Token refresh flow
- [ ] **INT-010**: Offline/online handling

### 🔧 12. Testes de Configuração (CONFIG)

#### 12.1 Environment
- [ ] **CONFIG-001**: Development environment
- [ ] **CONFIG-002**: Production environment
- [ ] **CONFIG-003**: Environment variables
- [ ] **CONFIG-004**: Database connections
- [ ] **CONFIG-005**: External services

#### 12.2 Docker
- [ ] **CONFIG-006**: Docker Compose setup
- [ ] **CONFIG-007**: Container networking
- [ ] **CONFIG-008**: Volume persistence
- [ ] **CONFIG-009**: Health checks
- [ ] **CONFIG-010**: Logs aggregation

## 🎯 Critérios de Aceitação

### ✅ Funcionalidade
- [ ] Todos os endpoints funcionam conforme especificado
- [ ] Validações de negócio implementadas
- [ ] Fluxos completos funcionais
- [ ] Error handling adequado

### ✅ Qualidade
- [ ] Código limpo e documentado
- [ ] Testes unitários > 80% coverage
- [ ] Performance dentro dos limites
- [ ] Segurança validada

### ✅ Usabilidade
- [ ] Interface intuitiva
- [ ] Responsivo em todos os dispositivos
- [ ] Acessível para usuários com deficiência
- [ ] Feedback adequado para ações

### ✅ Operacionalidade
- [ ] Deploy automatizado
- [ ] Monitoramento configurado
- [ ] Logs estruturados
- [ ] Backup e recovery

## 🚀 Execução dos Testes

### Ambiente de Teste
```bash
# Subir ambiente completo
docker-compose up -d

# Verificar saúde dos serviços
curl http://localhost:8080/api/public/ping
curl http://localhost:3000
```

### Dados de Teste
- **Admin**: admin@marketplace.com / password123
- **Vendedor**: seller1@marketplace.com / password123
- **Comprador**: buyer1@marketplace.com / password123

### Ferramentas Recomendadas
- **API Testing**: Postman, Insomnia, curl
- **Performance**: JMeter, Artillery, k6
- **Security**: OWASP ZAP, Burp Suite
- **UI Testing**: Playwright, Cypress, Selenium
- **Load Testing**: Artillery, k6, JMeter

## 📊 Relatórios

### Métricas de Qualidade
- Taxa de sucesso dos testes: > 95%
- Tempo médio de resposta: < 300ms
- Cobertura de testes: > 80%
- Bugs críticos: 0
- Bugs major: < 5

### Documentação
- [ ] Relatório de execução
- [ ] Bugs encontrados e corrigidos
- [ ] Recomendações de melhoria
- [ ] Métricas de performance
- [ ] Checklist de segurança
