// Tipos de usuários do sistema
export const USER_ROLES = {
  ADMIN: 'admin',
  VENDEDOR: 'vendedor', 
  CLIENTE: 'cliente'
};

// Permissões disponíveis no sistema
export const PERMISSIONS = {
  // Permissões de usuário
  VIEW_OWN_PROFILE: 'view_own_profile',
  EDIT_OWN_PROFILE: 'edit_own_profile',
  
  // Permissões de cliente
  BROWSE_PRODUCTS: 'browse_products',
  MAKE_PURCHASE: 'make_purchase',
  VIEW_OWN_ORDERS: 'view_own_orders',
  TRACK_ORDERS: 'track_orders',
  
  // Permissões de vendedor
  VIEW_ALL_ORDERS: 'view_all_orders',
  MANAGE_ORDERS: 'manage_orders',
  CUSTOMER_SUPPORT: 'customer_support',
  
  // Permissões de administrador
  MANAGE_USERS: 'manage_users',
  VIEW_ALL_USERS: 'view_all_users',
  EDIT_ANY_USER: 'edit_any_user',
  DELETE_USERS: 'delete_users',
  MANAGE_PRODUCTS: 'manage_products',
  SYSTEM_SETTINGS: 'system_settings'
};

// Mapeamento de roles para permissões
export const ROLE_PERMISSIONS = {
  [USER_ROLES.CLIENTE]: [
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.BROWSE_PRODUCTS,
    PERMISSIONS.MAKE_PURCHASE,
    PERMISSIONS.VIEW_OWN_ORDERS,
    PERMISSIONS.TRACK_ORDERS
  ],
  
  [USER_ROLES.VENDEDOR]: [
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.CUSTOMER_SUPPORT,
    PERMISSIONS.BROWSE_PRODUCTS
  ],
  
  [USER_ROLES.ADMIN]: [
    // Admin tem todas as permissões
    ...Object.values(PERMISSIONS)
  ]
};

// Labels amigáveis para os tipos de usuário
export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.VENDEDOR]: 'Vendedor',
  [USER_ROLES.CLIENTE]: 'Cliente'
};

// Função para verificar se um usuário tem uma permissão específica
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

// Função para obter todas as permissões de um role
export const getRolePermissions = (userRole) => {
  return ROLE_PERMISSIONS[userRole] || [];
};

// Função para verificar se é admin
export const isAdmin = (userRole) => {
  return userRole === USER_ROLES.ADMIN;
};

// Função para verificar se é vendedor
export const isVendedor = (userRole) => {
  return userRole === USER_ROLES.VENDEDOR;
};

// Função para verificar se é cliente
export const isCliente = (userRole) => {
  return userRole === USER_ROLES.CLIENTE;
};