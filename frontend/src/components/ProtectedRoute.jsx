import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';

/**
 * Componente para proteger rotas baseado em permissões
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos a serem renderizados se autorizado
 * @param {string[]} props.requiredPermissions - Array de permissões necessárias
 * @param {boolean} props.requireAll - Se true, requer todas as permissões. Se false, requer pelo menos uma
 * @param {string[]} props.allowedRoles - Array de roles permitidos (alternativa às permissões)
 * @param {string} props.redirectTo - Rota para redirecionamento se não autorizado
 * @param {React.ReactNode} props.fallback - Componente a ser renderizado se não autorizado
 * @param {string} props.requiredRole - Role específico necessário (compatibilidade com versão anterior)
 * @returns {React.ReactNode} Componente autorizado ou redirecionamento
 */
const ProtectedRoute = ({ 
  children, 
  requiredPermissions = [], 
  requireAll = true,
  allowedRoles = [],
  redirectTo = '/login',
  fallback = null,
  requiredRole = null // Mantido para compatibilidade
}) => {
  const { 
    isAuthenticated, 
    userRole, 
    isAdmin,
    checkMultiplePermissions 
  } = usePermissions();
  
  const location = useLocation();
  
  // Se não está autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  // Compatibilidade com a versão anterior (requiredRole)
  if (requiredRole) {
    if (userRole !== requiredRole && !isAdmin) {
      return <Navigate to="/" replace />;
    }
    return children;
  }
  
  // Verifica se o role está na lista de roles permitidos
  const hasAllowedRole = allowedRoles.length === 0 || allowedRoles.includes(userRole);
  
  // Verifica se tem as permissões necessárias
  const hasRequiredPermissions = requiredPermissions.length === 0 || 
    checkMultiplePermissions(requiredPermissions, requireAll);
  
  // Se não tem role permitido ou permissões necessárias
  if (!hasAllowedRole || !hasRequiredPermissions) {
    // Se há um fallback, renderiza ele
    if (fallback) {
      return fallback;
    }
    
    // Caso contrário, redireciona para uma página de acesso negado ou dashboard
    const unauthorizedRedirect = userRole ? '/unauthorized' : redirectTo;
    return <Navigate to={unauthorizedRedirect} replace />;
  }
  
  // Se passou em todas as verificações, renderiza os filhos
  return children;
};

/**
 * Componente para mostrar conteúdo apenas para roles específicos
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo a ser renderizado se autorizado
 * @param {string[]} props.allowedRoles - Array de roles permitidos
 * @param {React.ReactNode} props.fallback - Conteúdo alternativo se não autorizado
 * @returns {React.ReactNode} Conteúdo autorizado ou fallback
 */
export const RoleBasedComponent = ({ children, allowedRoles = [], fallback = null }) => {
  const { userRole, isAuthenticated } = usePermissions();
  
  if (!isAuthenticated) {
    return fallback;
  }
  
  const hasAllowedRole = allowedRoles.length === 0 || allowedRoles.includes(userRole);
  
  return hasAllowedRole ? children : fallback;
};

/**
 * Componente para mostrar conteúdo apenas para usuários com permissões específicas
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo a ser renderizado se autorizado
 * @param {string[]} props.requiredPermissions - Array de permissões necessárias
 * @param {boolean} props.requireAll - Se requer todas as permissões ou apenas uma
 * @param {React.ReactNode} props.fallback - Conteúdo alternativo se não autorizado
 * @returns {React.ReactNode} Conteúdo autorizado ou fallback
 */
export const PermissionBasedComponent = ({ 
  children, 
  requiredPermissions = [], 
  requireAll = true,
  fallback = null 
}) => {
  const { checkMultiplePermissions, isAuthenticated } = usePermissions();
  
  if (!isAuthenticated) {
    return fallback;
  }
  
  const hasPermissions = requiredPermissions.length === 0 || 
    checkMultiplePermissions(requiredPermissions, requireAll);
  
  return hasPermissions ? children : fallback;
};

/**
 * HOC para proteger componentes baseado em permissões
 * @param {React.Component} Component - Componente a ser protegido
 * @param {Object} options - Opções de proteção
 * @returns {React.Component} Componente protegido
 */
export const withPermissions = (Component, options = {}) => {
  const {
    requiredPermissions = [],
    allowedRoles = [],
    requireAll = true,
    redirectTo = '/unauthorized',
    fallback = <div>Acesso negado</div>
  } = options;
  
  return function ProtectedComponent(props) {
    return (
      <ProtectedRoute
        requiredPermissions={requiredPermissions}
        allowedRoles={allowedRoles}
        requireAll={requireAll}
        redirectTo={redirectTo}
        fallback={fallback}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

export default ProtectedRoute;
