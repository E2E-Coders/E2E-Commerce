# Sistema de Perfis e Permissões - E2E Marketplace

## 📋 Visão Geral

O sistema de perfis e permissões foi implementado para controlar o acesso às funcionalidades da aplicação baseado no tipo de usuário. Cada usuário possui um **role** (papel) que determina suas **permissões** específicas.

## 👥 Tipos de Usuários (Roles)

### 🛒 **CLIENTE** (Padrão)
- **Descrição**: Usuário comum que pode navegar e comprar produtos
- **Permissões**:
  - Visualizar produtos
  - Adicionar ao carrinho
  - Fazer pedidos
  - Acompanhar pedidos
  - Editar próprio perfil

### 🏪 **VENDEDOR**
- **Descrição**: Usuário que pode vender produtos e gerenciar vendas
- **Permissões**:
  - Todas as permissões de Cliente
  - Visualizar painel do vendedor
  - Gerenciar produtos próprios
  - Visualizar pedidos de seus produtos
  - Atender clientes

### 👑 **ADMIN**
- **Descrição**: Administrador com acesso total ao sistema
- **Permissões**:
  - Todas as permissões anteriores
  - Gerenciar todos os usuários
  - Acessar dashboard administrativo
  - Editar qualquer perfil de usuário
  - Visualizar relatórios completos

## 🔐 Sistema de Permissões

### Estrutura de Permissões

```javascript
PERMISSIONS = {
  // Permissões de usuário
  USER_VIEW_PROFILE: 'user:view_profile',
  USER_EDIT_OWN_PROFILE: 'user:edit_own_profile',
  USER_EDIT_ANY_PROFILE: 'user:edit_any_profile',
  
  // Permissões de cliente
  CLIENT_BROWSE_PRODUCTS: 'client:browse_products',
  CLIENT_ADD_TO_CART: 'client:add_to_cart',
  CLIENT_MAKE_ORDERS: 'client:make_orders',
  CLIENT_TRACK_ORDERS: 'client:track_orders',
  
  // Permissões de vendedor
  SELLER_VIEW_DASHBOARD: 'seller:view_dashboard',
  SELLER_MANAGE_PRODUCTS: 'seller:manage_products',
  SELLER_VIEW_ORDERS: 'seller:view_orders',
  SELLER_ASSIST_CUSTOMERS: 'seller:assist_customers',
  
  // Permissões de admin
  ADMIN_MANAGE_USERS: 'admin:manage_users',
  ADMIN_VIEW_DASHBOARD: 'admin:view_dashboard',
  ADMIN_VIEW_REPORTS: 'admin:view_reports'
}
```

## 🛡️ Componentes de Proteção

### ProtectedRoute
Componente para proteger rotas baseado em permissões:

```jsx
// Proteger por permissões específicas
<ProtectedRoute requiredPermissions={[PERMISSIONS.ADMIN_MANAGE_USERS]}>
  <AdminDashboard />
</ProtectedRoute>

// Proteger por roles permitidos
<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.VENDEDOR]}>
  <SellerDashboard />
</ProtectedRoute>

// Proteger apenas usuários autenticados
<ProtectedRoute>
  <UserProfile />
</ProtectedRoute>
```

### Hook usePermissions
Hook personalizado para verificar permissões:

```javascript
const { 
  hasPermission, 
  hasAnyPermission, 
  getUserPermissions,
  canEditUser,
  canViewUser,
  canAccessRoute,
  isAdmin,
  isVendedor,
  isCliente 
} = usePermissions();

// Exemplos de uso
if (hasPermission(PERMISSIONS.ADMIN_MANAGE_USERS)) {
  // Mostrar botão de gerenciar usuários
}

if (isAdmin()) {
  // Mostrar menu administrativo
}

if (canEditUser(targetUserId)) {
  // Permitir edição do usuário
}
```

## 🚀 Funcionalidades Implementadas

### 1. **Registro com Seleção de Tipo**
- Usuários podem escolher seu tipo durante o cadastro
- Tipo padrão: CLIENTE
- Interface intuitiva com descrições dos tipos

### 2. **Dashboard Administrativo** (`/admin`)
- **Acesso**: Apenas ADMIN
- **Funcionalidades**:
  - Listar todos os usuários
  - Filtrar por tipo de usuário
  - Buscar usuários por nome/email
  - Editar informações de usuários
  - Excluir usuários
  - Visualizar estatísticas

### 3. **Perfil do Usuário** (`/profile`)
- **Acesso**: Usuários autenticados
- **Funcionalidades**:
  - Visualizar informações pessoais
  - Editar próprios dados
  - Visualizar role e permissões
  - Alterar senha

### 4. **Navegação Inteligente**
- Header atualizado com links baseados em permissões
- Links condicionais:
  - "Vendedor" - apenas para VENDEDOR e ADMIN
  - "Admin" - apenas para ADMIN
  - "Perfil" - todos os usuários autenticados

### 5. **Rotas Protegidas**
- `/admin` - Apenas ADMIN
- `/seller` - VENDEDOR e ADMIN
- `/profile` - Usuários autenticados
- Outras rotas mantêm proteção existente

## 🔧 Como Usar

### 1. **Verificar Permissões em Componentes**

```jsx
import { usePermissions } from '../hooks/usePermissions';
import { PERMISSIONS } from '../constants/userRoles';

function MyComponent() {
  const { hasPermission, isAdmin } = usePermissions();
  
  return (
    <div>
      {hasPermission(PERMISSIONS.SELLER_VIEW_DASHBOARD) && (
        <button>Acessar Painel Vendedor</button>
      )}
      
      {isAdmin() && (
        <button>Gerenciar Usuários</button>
      )}
    </div>
  );
}
```

### 2. **Proteger Rotas**

```jsx
import ProtectedRoute from './components/ProtectedRoute';
import { USER_ROLES, PERMISSIONS } from './constants/userRoles';

// No App.jsx
<Route path="/admin" element={
  <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

### 3. **Verificar Permissões no Backend**
O sistema frontend está preparado para integrar com um backend que valide as permissões. As permissões são enviadas no token JWT e podem ser verificadas nas APIs.

## 🧪 Testes

### Cenários de Teste Recomendados:

1. **Registro de Usuários**
   - ✅ Registrar como Cliente (padrão)
   - ✅ Registrar como Vendedor
   - ✅ Registrar como Admin

2. **Navegação por Tipo**
   - ✅ Cliente: acesso a perfil, carrinho, pedidos
   - ✅ Vendedor: acesso adicional ao painel vendedor
   - ✅ Admin: acesso a todas as áreas + dashboard admin

3. **Proteção de Rotas**
   - ✅ Tentar acessar `/admin` sem ser admin
   - ✅ Tentar acessar `/seller` sem ser vendedor/admin
   - ✅ Acessar `/profile` autenticado

4. **Edição de Perfis**
   - ✅ Usuário comum editando próprio perfil
   - ✅ Admin editando perfil de outros usuários
   - ✅ Tentativa de edição não autorizada

## 🔄 Próximos Passos

1. **Integração com Backend**
   - Implementar validação de permissões nas APIs
   - Sincronizar roles entre frontend e backend

2. **Funcionalidades Avançadas**
   - Histórico de ações por usuário
   - Logs de acesso e modificações
   - Notificações baseadas em role

3. **Melhorias de UX**
   - Tooltips explicativos sobre permissões
   - Feedback visual para ações restritas
   - Onboarding por tipo de usuário

## 📚 Arquivos Principais

- `src/constants/userRoles.js` - Definições de roles e permissões
- `src/hooks/usePermissions.js` - Hook para verificação de permissões
- `src/components/ProtectedRoute.jsx` - Componente de proteção de rotas
- `src/contexts/AuthContext.jsx` - Contexto de autenticação com roles
- `src/pages/AdminDashboard.jsx` - Dashboard administrativo
- `src/pages/UserProfile.jsx` - Página de perfil do usuário
- `src/components/Header.jsx` - Navegação com links condicionais

---

**🎯 Sistema implementado com sucesso!** Todas as funcionalidades de perfis e permissões estão operacionais e prontas para uso.