import { useAuth } from '../contexts/AuthContext';
import { hasPermission, getRolePermissions, isAdmin, isVendedor, isCliente } from '../constants/userRoles';

/**
 * Hook personalizado para gerenciar permissões de usuário
 * @returns {Object} Objeto com funções e dados relacionados às permissões
 */
export const usePermissions = () => {
  const { user } = useAuth();
  
  const userRole = user?.role;
  
  /**
   * Verifica se o usuário atual tem uma permissão específica
   * @param {string} permission - A permissão a ser verificada
   * @returns {boolean} True se o usuário tem a permissão
   */
  const checkPermission = (permission) => {
    if (!userRole) return false;
    return hasPermission(userRole, permission);
  };
  
  /**
   * Verifica se o usuário atual tem múltiplas permissões
   * @param {string[]} permissions - Array de permissões a serem verificadas
   * @param {boolean} requireAll - Se true, requer todas as permissões. Se false, requer pelo menos uma
   * @returns {boolean} True se atende aos critérios de permissão
   */
  const checkMultiplePermissions = (permissions, requireAll = true) => {
    if (!userRole || !Array.isArray(permissions)) return false;
    
    if (requireAll) {
      return permissions.every(permission => hasPermission(userRole, permission));
    } else {
      return permissions.some(permission => hasPermission(userRole, permission));
    }
  };
  
  /**
   * Obtém todas as permissões do usuário atual
   * @returns {string[]} Array com todas as permissões do usuário
   */
  const getUserPermissions = () => {
    if (!userRole) return [];
    return getRolePermissions(userRole);
  };
  
  /**
   * Verifica se o usuário pode editar outro usuário
   * @param {Object} targetUser - O usuário que se deseja editar
   * @returns {boolean} True se pode editar
   */
  const canEditUser = (targetUser) => {
    if (!user || !targetUser) return false;
    
    // Admin pode editar qualquer usuário
    if (isAdmin(userRole)) return true;
    
    // Usuários só podem editar a si mesmos
    return user.id === targetUser.id;
  };
  
  /**
   * Verifica se o usuário pode visualizar dados de outro usuário
   * @param {Object} targetUser - O usuário que se deseja visualizar
   * @returns {boolean} True se pode visualizar
   */
  const canViewUser = (targetUser) => {
    if (!user || !targetUser) return false;
    
    // Admin pode ver qualquer usuário
    if (isAdmin(userRole)) return true;
    
    // Usuários podem ver seus próprios dados
    return user.id === targetUser.id;
  };
  
  /**
   * Verifica se o usuário pode acessar uma rota específica
   * @param {string[]} requiredPermissions - Permissões necessárias para a rota
   * @param {boolean} requireAll - Se requer todas as permissões ou apenas uma
   * @returns {boolean} True se pode acessar a rota
   */
  const canAccessRoute = (requiredPermissions, requireAll = true) => {
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    return checkMultiplePermissions(requiredPermissions, requireAll);
  };
  
  return {
    // Dados do usuário
    user,
    userRole,
    
    // Verificações de role
    isAdmin: isAdmin(userRole),
    isVendedor: isVendedor(userRole),
    isCliente: isCliente(userRole),
    
    // Funções de verificação de permissão
    checkPermission,
    checkMultiplePermissions,
    getUserPermissions,
    
    // Funções específicas de negócio
    canEditUser,
    canViewUser,
    canAccessRoute,
    
    // Estado de autenticação
    isAuthenticated: !!user,
    isLoading: false // Pode ser expandido para incluir estado de loading
  };
};