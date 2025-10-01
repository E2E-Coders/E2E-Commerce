// Tipos de usuários do sistema
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  SELLER: 'SELLER', 
  CUSTOMER: 'CUSTOMER'
};

// Permissões disponíveis no sistema
export const PERMISSIONS = {
  // Permissões de usuário
  VIEW_OWN_PROFILE: 'view_own_profile',
  EDIT_OWN_PROFILE: 'edit_own_profile',
  
  // Permissões de cliente
  VIEW_PRODUCTS: 'view_products',
  ADD_TO_CART: 'add_to_cart',
  PLACE_ORDER: 'place_order',
  VIEW_OWN_ORDERS: 'view_own_orders',
  
  // Permissões de vendedor
  MANAGE_OWN_PRODUCTS: 'manage_own_products',
  VIEW_OWN_SALES: 'view_own_sales',
  MANAGE_INVENTORY: 'manage_inventory',
  
  // Permissões de administrador
  MANAGE_ALL_USERS: 'manage_all_users',
  MANAGE_ALL_PRODUCTS: 'manage_all_products',
  VIEW_ALL_ORDERS: 'view_all_orders',
  MANAGE_CATEGORIES: 'manage_categories',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SYSTEM: 'manage_system'
};

// Mapeamento de roles para suas permissões
const customerPermissions = [
  PERMISSIONS.VIEW_OWN_PROFILE,
  PERMISSIONS.EDIT_OWN_PROFILE,
  PERMISSIONS.VIEW_PRODUCTS,
  PERMISSIONS.ADD_TO_CART,
  PERMISSIONS.PLACE_ORDER,
  PERMISSIONS.VIEW_OWN_ORDERS
]

const sellerPermissions = [
  ...customerPermissions,
  PERMISSIONS.MANAGE_OWN_PRODUCTS,
  PERMISSIONS.VIEW_OWN_SALES,
  PERMISSIONS.MANAGE_INVENTORY
]

const adminPermissions = [
  ...sellerPermissions,
  PERMISSIONS.MANAGE_ALL_USERS,
  PERMISSIONS.MANAGE_ALL_PRODUCTS,
  PERMISSIONS.VIEW_ALL_ORDERS,
  PERMISSIONS.MANAGE_CATEGORIES,
  PERMISSIONS.VIEW_ANALYTICS,
  PERMISSIONS.SYSTEM_SETTINGS
]

export const ROLE_PERMISSIONS = {
  [USER_ROLES.CUSTOMER]: customerPermissions,
  [USER_ROLES.SELLER]: sellerPermissions,
  [USER_ROLES.ADMIN]: adminPermissions
};

// Função para obter permissões de um role
export function getRolePermissions(role) {
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS[USER_ROLES.CUSTOMER];
}

// Função para verificar se um usuário tem uma permissão específica
export function hasPermission(user, permission) {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
}

// Função para verificar se um usuário tem pelo menos uma das permissões
export function hasAnyPermission(user, permissions) {
  if (!user || !user.permissions || !Array.isArray(permissions)) return false;
  return permissions.some(permission => user.permissions.includes(permission));
}

// Função para verificar se um usuário tem todas as permissões
export function hasAllPermissions(user, permissions) {
  if (!user || !user.permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => user.permissions.includes(permission));
}