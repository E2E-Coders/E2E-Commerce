import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { usePermissions } from '../hooks/usePermissions'
import { USER_ROLES, PERMISSIONS } from '../constants/userRoles'
import { ShoppingCart, User, LogOut, Settings, Users } from 'lucide-react'

function Header() {
  const { user, logout } = useAuth()
  const { hasPermission, isAdmin, isVendedor } = usePermissions()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            E2E Marketplace
          </Link>
          
          <nav className="nav">
            <Link to="/" className="nav-link">Início</Link>
            
            {user ? (
              <>
                <Link to="/cart" className="nav-link">
                  <ShoppingCart size={20} />
                  Carrinho
                </Link>
                <Link to="/orders" className="nav-link">Pedidos</Link>
                
                {/* Link para Vendedor - apenas para vendedores e admins */}
                {(isVendedor || isAdmin) && (
                  <Link to="/seller" className="nav-link">Vendedor</Link>
                )}
                
                {/* Link para Admin Dashboard - apenas para admins */}
                {isAdmin && (
                  <Link to="/admin" className="nav-link">
                    <Users size={20} />
                    Admin
                  </Link>
                )}
                
                <div className="flex items-center gap-2">
                  <Link to="/profile" className="nav-link">
                    <User size={20} />
                    <span className="text-sm">{user.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="btn btn-sm btn-outline">
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Entrar</Link>
                <Link to="/register" className="btn btn-primary">
                  Cadastrar
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
