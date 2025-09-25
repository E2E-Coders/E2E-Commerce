import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ShoppingCart, User, LogOut } from 'lucide-react'

function Header() {
  const { user, logout } = useAuth()
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
                {user.role === 'SELLER' && (
                  <Link to="/seller" className="nav-link">Vendedor</Link>
                )}
                <div className="user-info">
                  <User size={20} />
                  <span className="user-name">Olá, {user.name}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-sm btn-outline">
                  <LogOut size={16} />
                </button>
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
