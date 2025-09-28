import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ShoppingCart, User, LogOut, Search, Moon, Sun } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useState, useEffect } from 'react'

function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '')
  }, [location.search])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const submitSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(location.search)
    if (searchTerm) params.set('q', searchTerm); else params.delete('q')
    navigate({ pathname: '/', search: params.toString() })
  }

  const categories = [
    { id: 'playstation', label: 'PlayStation' },
    { id: 'xbox', label: 'Xbox' },
    { id: 'notebooks', label: 'Notebooks' },
    { id: 'perifericos', label: 'Periféricos' }
  ]

  const goCategory = (cat) => {
    const params = new URLSearchParams(location.search)
    params.set('categorySlug', cat)
    navigate({ pathname: '/', search: params.toString() })
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content gap-4">
          <div className="flex items-center gap-6 w-full">
            <Link to="/" className="logo whitespace-nowrap">E2E Marketplace</Link>
            <form onSubmit={submitSearch} className="flex-1 hidden md:flex">
              <div className="relative w-full">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </form>
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Alternar tema">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
          <nav className="nav mt-2 md:mt-0">
            {categories.map(c => (
              <button key={c.id} onClick={() => goCategory(c.id)} className="nav-link whitespace-nowrap">
                {c.label}
              </button>
            ))}
            {user ? (
              <>
                <Link to="/cart" className="nav-link flex items-center gap-1">
                  <ShoppingCart size={18} />
                  <span>Carrinho</span>
                </Link>
                <Link to="/orders" className="nav-link">Pedidos</Link>
                {user.role === 'SELLER' && (
                  <Link to="/seller" className="nav-link">Vendedor</Link>
                )}
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span className="text-xs md:text-sm max-w-[100px] truncate">{user.name}</span>
                  <button onClick={handleLogout} className="btn btn-sm btn-outline" title="Sair">
                    <LogOut size={14} />
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
        <form onSubmit={submitSearch} className="flex md:hidden mt-3">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header
